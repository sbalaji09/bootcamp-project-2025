
import { NextRequest, NextResponse } from 'next/server'
import connectDB from "@/database/db"
import Blog from "@/database/blogSchema"

/* IParams is a TypeScript type definition that describes the structure of the second
   argument that Next.js passes to our API route handler.

   Without IParams:
   - TypeScript wouldn't know what properties the second argument contains
   - We'd lose autocomplete and type checking
   - Typos like { slug } vs { slg } wouldn't be caught until runtime

   With IParams:
   - TypeScript knows the second argument has a "params" object
   - TypeScript knows "params" contains a "slug" property that's a string
   - We get autocomplete when typing { params } and { slug }
   - TypeScript catches errors if we try to access non-existent properties

   Note: IParams doesn't control what Next.js creates - it just tells TypeScript
   what to expect. The actual object structure is determined by our file path:
   /api/blog/[slug]/route.ts creates { params: { slug: "actual-slug-value" } }
*/
type IParams = {
		params: Promise<{
			slug: string
		}>
}

/*
	The function below and the functions you create inside route.ts files are called
	"API route handlers"

	Next.js automatically passes two arguments to API route handlers:
		1. First argument: NextRequest - The incoming HTTP request object
		2. Second argument: NextJS Object - Contains route information and other metadata
				There is ALWAYS a "params" object here but the object within is based on our
				api path naming which in this case is "slug"
	We need to include req, even though we don't use it here, so that we can access
	the second argument

	In Next.js 15+, params is now a Promise that needs to be awaited
*/
export async function GET(req: NextRequest, { params }: IParams) {
		// If { params } looks confusing, check the note below this code block

    await connectDB() // function from db.ts before
		const { slug } = await params // await the params promise and destructure

	   try {
	        // Try to find blog by exact slug match first
	        let blog = await Blog.findOne({ slug }).exec()

	        // If not found, try to find by slug containing the search term
	        // This handles cases where slug is "src/blog-posts/blog-post1.html" but we search for "blog-post1"
	        if (!blog) {
	            blog = await Blog.findOne({ slug: { $regex: slug, $options: 'i' } }).exec()
	        }

	        if (!blog) {
	            return NextResponse.json('Blog not found.', { status: 404 })
	        }

	        return NextResponse.json(blog)
	    } catch (err) {
	        return NextResponse.json('Blog not found.', { status: 404 })
	    }
}

// POST - Creates a new comment for a blog post
export async function POST(req: NextRequest, { params }: IParams) {
    await connectDB()
    const { slug } = await params

    try {
        const body = await req.json()
        const { user, comment } = body

        // Validate required fields
        if (!user || !comment) {
            return NextResponse.json(
                { error: 'User and comment are required' },
                { status: 400 }
            )
        }

        // Find the blog by slug
        let blog = await Blog.findOne({ slug }).exec()
        if (!blog) {
            blog = await Blog.findOne({ slug: { $regex: slug, $options: 'i' } }).exec()
        }

        if (!blog) {
            return NextResponse.json(
                { error: 'Blog not found' },
                { status: 404 }
            )
        }

        // Create the new comment
        const newComment = {
            user: user.trim(),
            comment: comment.trim(),
            time: new Date()
        }

        // Add comment to the blog
        blog.comments = blog.comments || []
        blog.comments.push(newComment)
        await blog.save()

        return NextResponse.json(
            { message: 'Comment added successfully', comment: newComment },
            { status: 201 }
        )
    } catch (err) {
        console.error('Error adding comment:', err)
        return NextResponse.json(
            { error: 'Failed to add comment' },
            { status: 500 }
        )
    }
}
