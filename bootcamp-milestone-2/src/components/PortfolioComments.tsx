'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Comment from './comment';
import styles from './PortfolioComments.module.css';

type IComment = {
    user: string;
    comment: string;
    time: Date;
    projectTitle?: string;
};

export default function PortfolioComments() {
    const [comments, setComments] = useState<IComment[]>([]);
    const [user, setUser] = useState('');
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const router = useRouter();

    // Fetch comments on mount
    useEffect(() => {
        fetchComments();
    }, []);

    const fetchComments = async () => {
        try {
            const res = await fetch('/api/portfolio/comment');
            if (res.ok) {
                const data = await res.json();
                setComments(data);
            }
        } catch (err) {
            console.error('Failed to fetch comments:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!user.trim() || !comment.trim()) {
            setError('Please fill in both fields');
            return;
        }

        setIsSubmitting(true);

        try {
            const res = await fetch('/api/portfolio/comment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user, comment }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Failed to post comment');
            }

            // Clear form
            setUser('');
            setComment('');

            // Refresh comments
            await fetchComments();

            // Also refresh the page to ensure server state is updated
            router.refresh();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to post comment');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="comments" className={styles.commentsSection}>
            <h2>Portfolio Comments</h2>

            <div className={styles.commentsContainer}>
                {isLoading ? (
                    <p className={styles.loadingText}>Loading comments...</p>
                ) : comments.length > 0 ? (
                    <div className={styles.commentsList}>
                        {comments.map((c, index) => (
                            <Comment key={index} comment={c} />
                        ))}
                    </div>
                ) : (
                    <p className={styles.noComments}>No comments yet. Be the first to leave feedback!</p>
                )}

                <form className={styles.commentForm} onSubmit={handleSubmit}>
                    <h3 className={styles.formTitle}>Leave a Comment</h3>

                    {error && <p className={styles.error}>{error}</p>}

                    <div className={styles.formGroup}>
                        <label htmlFor="portfolio-user" className={styles.label}>Name</label>
                        <input
                            type="text"
                            id="portfolio-user"
                            value={user}
                            onChange={(e) => setUser(e.target.value)}
                            className={styles.input}
                            placeholder="Your name"
                            disabled={isSubmitting}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="portfolio-comment" className={styles.label}>Comment</label>
                        <textarea
                            id="portfolio-comment"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className={styles.textarea}
                            placeholder="Write your comment..."
                            rows={4}
                            disabled={isSubmitting}
                        />
                    </div>

                    <button
                        type="submit"
                        className={styles.submitButton}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Posting...' : 'Post Comment'}
                    </button>
                </form>
            </div>
        </section>
    );
}
