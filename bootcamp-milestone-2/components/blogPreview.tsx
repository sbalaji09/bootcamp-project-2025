import React from 'react';
import type { Blog } from "@/app/blogData";
import style from './blogPreview.module.css';
import Image from 'next/image';

export default function BlogPreview(props: Blog) {
  return (
    <div className={style.blogPost}>
      <div className={style.blogHeader}>
        <h2 className={style.blogTitle}>{props.title}</h2>
        <div className={style.blogMeta}>
          <span>{props.date}</span>
          <span> • </span>
          <span>{props.readTime}</span>
        </div>
      </div>
      <div className={style.blogImageContainer}>
        <Image
          src={props.image}
          alt={props.imageAlt}
          width={800}
          height={400}
          className={style.blogImage}
          style={{ objectPosition: props.imagePosition }}
        />
      </div>
      <p className={style.blogContent}>{props.description}</p>
      <div className={style.blogTags}>
        {props.tags.map((tag, index) => (
          <span key={index} className={style.blogTag}>#{tag}</span>
        ))}
      </div>
    </div>
  );
}
