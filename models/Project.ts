import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  title: String,
  description: String,
});

export default mongoose.model("Project", ProjectSchema);
