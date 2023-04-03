import mongoose from "mongoose";

export interface TagDocumnet extends Document {
  name: string;
  description: string;
  category: string;
}

const TagSchema = new mongoose.Schema({
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  name: String,
  description: String,
});

export default mongoose.model("Tag", TagSchema);
