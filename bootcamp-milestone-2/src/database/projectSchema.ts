import mongoose, { Schema } from "mongoose";

// TypeScript type for Project
export type IProject = {
  title: string;
  description: string;
  tags: string[];
  githubUrl: string;
  image?: string;
  order?: number;
};

// Mongoose schema
const projectSchema = new Schema<IProject>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  tags: { type: [String], required: true },
  githubUrl: { type: String, required: true },
  image: { type: String },
  order: { type: Number, default: 0 },
});

// Create or use existing model
const Project = mongoose.models.Project || mongoose.model<IProject>("Project", projectSchema);

export default Project;
