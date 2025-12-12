import mongoose, { Schema } from "mongoose";

// TypeScript type for Comment
export type IComment = {
  user: string;
  comment: string;
  time: Date;
};

// TypeScript type for Project
export type IProject = {
  title: string;
  description: string;
  tags: string[];
  githubUrl: string;
  image?: string;
  order?: number;
  comments?: IComment[];
};

// Mongoose schema
const projectSchema = new Schema<IProject>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  tags: { type: [String], required: true },
  githubUrl: { type: String, required: true },
  image: { type: String },
  order: { type: Number, default: 0 },
  comments: [
    {
      user: { type: String, required: true },
      comment: { type: String, required: true },
      time: { type: Date, required: true, default: Date.now },
    },
  ],
});

// Create or use existing model
const Project = mongoose.models.Project || mongoose.model<IProject>("Project", projectSchema);

export default Project;
