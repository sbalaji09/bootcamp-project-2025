'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './CommentForm.module.css';

type CommentFormProps = {
    slug: string;
    type: 'blog' | 'portfolio';
    projectTitle?: string;
};

export default function CommentForm({ slug, type, projectTitle }: CommentFormProps) {
    const [user, setUser] = useState('');
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!user.trim() || !comment.trim()) {
            setError('Please fill in both fields');
            return;
        }

        setIsSubmitting(true);

        try {
            const endpoint = type === 'blog'
                ? `/api/Blogs/${slug}`
                : '/api/portfolio/comment';

            const body = type === 'blog'
                ? { user, comment }
                : { user, comment, projectTitle };

            const res = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Failed to post comment');
            }

            // Clear form
            setUser('');
            setComment('');

            // Refresh the page to show the new comment
            router.refresh();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to post comment');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form className={styles.commentForm} onSubmit={handleSubmit}>
            <h3 className={styles.formTitle}>Leave a Comment</h3>

            {error && <p className={styles.error}>{error}</p>}

            <div className={styles.formGroup}>
                <label htmlFor="user" className={styles.label}>Name</label>
                <input
                    type="text"
                    id="user"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    className={styles.input}
                    placeholder="Your name"
                    disabled={isSubmitting}
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="comment" className={styles.label}>Comment</label>
                <textarea
                    id="comment"
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
    );
}
