import BlogPreview from '@/components/blogPreview';
import connectDB from '@/database/db';
import Blog from '@/database/blogSchema';

async function getBlogs(){
	try {
		await connectDB() // function from db.ts before
		// query for all blogs and sort by date
	    const blogs = await Blog.find().sort({ date: -1 }).orFail()
		// Convert Mongoose documents to plain objects
		return blogs.map(blog => blog.toObject())
	} catch (err) {
		console.error('Error fetching blogs:', err)
	    return null
	}
}

export default async function Blogs() {
  const blogs = await getBlogs();

  // Handle the case where no blogs are found or an error occurred
  if (!blogs || blogs.length === 0) {
    return (
      <div className="blog-container">
        <h1 style={{fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem', textAlign: 'center'}}>Blog Posts</h1>
        <p style={{textAlign: 'center', fontSize: '1.2rem', color: '#666'}}>No blogs found.</p>
      </div>
    );
  }

  return (
    <div className="blog-container">
      <h1 style={{fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem', textAlign: 'center'}}>Blog Posts</h1>
      {blogs.map((blog, index) => (
        <BlogPreview key={index} {...blog} />
      ))}
    </div>
  );
}
