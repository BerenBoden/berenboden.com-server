import mongoose from "mongoose";

export interface CategoryDocumnet extends Document {
  name: string;
  description: string;
}

const CategorySchema = new mongoose.Schema({
  name: String,
  description: String,
});

export default mongoose.model("Category", CategorySchema);
