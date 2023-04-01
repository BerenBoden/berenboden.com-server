import mongoose from "mongoose";

const CertificationSchema = new mongoose.Schema({
  name: String,
  description: String,
  link: String,
  imgLink: String,
});

export default mongoose.model("Certification", CertificationSchema);
