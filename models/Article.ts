import mongoose from "mongoose";

const ArticleSchema = new mongoose.Schema({
  title: String,
  description: String,
  content: String,
});

export default mongoose.model("Article", ArticleSchema);
