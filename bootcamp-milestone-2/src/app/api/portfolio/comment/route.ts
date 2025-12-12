import { NextRequest, NextResponse } from 'next/server'
import connectDB from "@/database/db"
import Project, { IComment } from "@/database/projectSchema"

// POST - Creates a new comment for the portfolio (first project or general)
export async function POST(req: NextRequest) {
    await connectDB()

    try {
        const body = await req.json()
        const { user, comment, projectTitle } = body

        // Validate required fields
        if (!user || !comment) {
            return NextResponse.json(
                { error: 'User and comment are required' },
                { status: 400 }
            )
        }

        // Find the project - either by title or get the first one
        let project
        if (projectTitle) {
            project = await Project.findOne({ title: projectTitle }).exec()
        }

        // If no specific project found or specified, use the first project
        if (!project) {
            project = await Project.findOne().sort({ order: 1 }).exec()
        }

        if (!project) {
            return NextResponse.json(
                { error: 'No project found to add comment to' },
                { status: 404 }
            )
        }

        // Create the new comment
        const newComment = {
            user: user.trim(),
            comment: comment.trim(),
            time: new Date()
        }

        // Add comment to the project
        project.comments = project.comments || []
        project.comments.push(newComment)
        await project.save()

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

// GET - Retrieves all portfolio comments
export async function GET() {
    await connectDB()

    try {
        // Get all projects with their comments
        const projects = await Project.find().sort({ order: 1 }).exec()

        // Combine all comments from all projects
        const allComments = projects.flatMap(project =>
            (project.comments || []).map((comment: IComment & { toObject?: () => IComment }) => ({
                ...(comment.toObject ? comment.toObject() : comment),
                projectTitle: project.title
            }))
        )

        // Sort by time descending (newest first)
        allComments.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())

        return NextResponse.json(allComments)
    } catch (err) {
        console.error('Error fetching comments:', err)
        return NextResponse.json(
            { error: 'Failed to fetch comments' },
            { status: 500 }
        )
    }
}
