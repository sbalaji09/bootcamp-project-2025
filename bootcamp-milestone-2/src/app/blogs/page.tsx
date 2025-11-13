import BlogPreview from '@/components/blogPreview';
import blogs from '@/app/blogData';
import connectDB from '@/database/db';
import Blog from '@/database/blogSchema';

async function getBlogs(){
	await connectDB() // function from db.ts before

	try {
			// query for all blogs and sort by date
	    const blogs = await Blog.find().sort({ date: -1 }).orFail()
			// send a response as the blogs as the message
	    return blogs
	} catch (err) {
	    return null
	}
}

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
