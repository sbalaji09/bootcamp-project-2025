// db.ts
import mongoose from "mongoose";

let connection: typeof mongoose;

/**
 * Makes a connection to a MongoDB database. If a connection already exists, does nothing
 * Call this function at the start of api routes and data fetches
 * @returns {Promise<typeof mongoose>}
 */
const connectDB = async () => {
  if (!connection) {
    const url = process.env.MONGO_URI;
    if (!url) {
      throw new Error("MONGO_URI environment variable is not set");
    }
    connection = await mongoose.connect(url);
    return connection;
  }
};

export default connectDB;