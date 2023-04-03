import mongoose from "mongoose";

export interface ResourceDocumnet extends Document {
  title: string;
  description: string;
  thumbnail: string;
  content: string;
  author: string;
  category: string;
}

const ResourceSchema = new mongoose.Schema({
  title: String,
  description: String,
  thumbnail: String,
  content: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
});

export default mongoose.model("Resource", ResourceSchema);
