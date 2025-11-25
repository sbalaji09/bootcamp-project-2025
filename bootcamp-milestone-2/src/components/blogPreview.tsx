import React from 'react';
import type { Blog } from "@/app/blogData";
import style from './blogPreview.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function BlogPreview(props: Blog) {
  // Fix image path: convert "src/..." to "/..." for Next.js public folder
  const imageSrc = props.image?.startsWith('src/')
    ? props.image.replace('src/', '/')
    : (props.image || '/placeholder.jpg');

  // Ensure we always have valid alt text
  const altText = (props.imageAlt && props.imageAlt.trim()) || props.title || 'Blog image';

  // Extract slug from the full path (e.g., "src/blog-posts/blog-post1.html" -> "blog-post1")
  const slugMatch = props.slug.match(/blog-post\d+/);
  const slug = slugMatch ? slugMatch[0] : props.slug;

  return (
    <Link href={`/blog/${slug}`} className={style.blogPostLink}>
      <div className={style.blogPost}>
      <div className={style.blogHeader}>
        <h2 className={style.blogTitle}>{props.title}</h2>
        <div className={style.blogMeta}>
          <span>{props.date}</span>
          <span> • </span>
          <span>{props.readTime}</span>
        </div>
      </div>
      {imageSrc && (
        <div className={style.blogImageContainer}>
          <Image
            src={imageSrc}
            alt={altText}
            width={800}
            height={400}
            className={style.blogImage}
            style={{ objectPosition: props.imagePosition || 'center' }}
          />
        </div>
      )}
      <p className={style.blogContent}>{props.description}</p>
      <div className={style.blogTags}>
        {props.tags?.map((tag, index) => (
          <span key={index} className={style.blogTag}>#{tag}</span>
        ))}
      </div>
      </div>
    </Link>
  );
}
