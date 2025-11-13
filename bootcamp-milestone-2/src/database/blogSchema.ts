import mongoose, { Schema } from "mongoose";

// TypeScript type based on the existing Blog interface
export type IComment = {
  user: string;
  comment: string;
  time: Date;
};

export type IBlog = {
  title: string;
  image: string;
  imageAlt: string;
  description: string;
  date: Date;
  tags: string[];
  readTime: string;
  slug: string;
  imagePosition: string;
  content?: string;
  comments?: IComment[];
};

// Mongoose schema
const blogSchema = new Schema<IBlog>({
  title: { type: String, required: true },
  image: { type: String, required: true },
  imageAlt: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true, default: Date.now },
  tags: { type: [String], required: true },
  readTime: { type: String, required: true },
  slug: { type: String, required: true },
  imagePosition: { type: String, required: true },
  content: { type: String },
  comments: [
    {
      user: { type: String, required: true },
      comment: { type: String, required: true },
      time: { type: Date, required: true, default: Date.now },
    },
  ],
});

// Create or use existing model
const Blog = mongoose.models.Blog || mongoose.model<IBlog>("Blog", blogSchema);

export default Blog;
