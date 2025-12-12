import Comment from '@/components/comment';
import CommentForm from '@/components/CommentForm';
import Image from 'next/image';
import styles from './blog.module.css';
import connectDB from '@/database/db';
import BlogModel from '@/database/blogSchema';

type Props = {
  params: Promise<{ slug: string }>
}

async function getBlog(slug: string) {
	try {
		await connectDB();

		// Try to find blog by exact slug match first
		let blog = await BlogModel.findOne({ slug }).exec();

		// If not found, try regex search
		if (!blog) {
			blog = await BlogModel.findOne({ slug: { $regex: slug, $options: 'i' } }).exec();
		}

		if (!blog) {
			return null;
		}

		// Convert to plain object for serialization
		return blog.toObject();
	} catch (err: unknown) {
		console.log(`error: ${err}`);
		return null;
	}
}

export default async function Blog({ params }: Props) {
  const { slug } = await params;
	const blog = await getBlog(slug);

	// Handle blog not found
	if (!blog) {
		return (
			<div className={styles.blogContainer}>
				<h1>Blog Not Found</h1>
				<p>Sorry, the blog post you're looking for doesn't exist.</p>
			</div>
		);
	}

	// Fix image path: convert "src/..." to "/..." for Next.js public folder
	const imageSrc = blog.image?.startsWith('src/')
		? blog.image.replace('src/', '/')
		: (blog.image || '/placeholder.jpg');

	// Ensure we always have valid alt text
	const altText = (blog.imageAlt && blog.imageAlt.trim()) || blog.title || 'Blog image';

  return (
    <div className={styles.blogContainer}>
			<article className={styles.blogArticle}>
				<header className={styles.blogHeader}>
					<h1 className={styles.blogTitle}>{blog.title}</h1>
					<div className={styles.blogMeta}>
						<span>{blog.date}</span>
						<span> • </span>
						<span>{blog.readTime}</span>
					</div>
					{blog.tags && blog.tags.length > 0 && (
						<div className={styles.blogTags}>
							{blog.tags.map((tag: string, index: number) => (
								<span key={index} className={styles.blogTag}>#{tag}</span>
							))}
						</div>
					)}
				</header>

				{imageSrc && (
					<div className={styles.blogImageContainer}>
						<Image
							src={imageSrc}
							alt={altText}
							width={1200}
							height={600}
							className={styles.blogImage}
							style={{ objectPosition: blog.imagePosition || 'center' }}
						/>
					</div>
				)}

				<div className={styles.blogContent}>
					<p>{blog.description}</p>
					{blog.content && <div dangerouslySetInnerHTML={{ __html: blog.content }} />}
				</div>

				{/* Comments Section */}
				<section className={styles.commentsSection}>
					<h2 className={styles.commentsTitle}>Comments ({blog.comments?.length || 0})</h2>
					{blog.comments && blog.comments.length > 0 ? (
						<div className={styles.commentsList}>
							{blog.comments.map((comment: any, index: number) => (
								<Comment key={index} comment={comment} />
							))}
						</div>
					) : (
						<p className={styles.noComments}>No comments yet. Be the first to comment!</p>
					)}

					{/* Comment Form */}
					<CommentForm slug={slug} type="blog" />
				</section>
			</article>
    </div>
  );
}
