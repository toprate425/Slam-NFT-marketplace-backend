import mongoose from "mongoose";
const ViewSchema = new mongoose.Schema({
  name: String,
});

export default mongoose.model("view", ViewSchema);
