import BlogPreview from '@/components/blogPreview';
import blogs from '@/app/blogData';

export default function Blogs() {
  return (
    <div className="blog-container">
      <h1 style={{fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem', textAlign: 'center'}}>Blog Posts</h1>
      {blogs.map((blog, index) => (
        <BlogPreview key={index} {...blog} />
      ))}
    </div>
  );
}
