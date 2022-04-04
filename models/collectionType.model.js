import mongoose from "mongoose";
const CollectionTypeSchema = new mongoose.Schema({
  name: String,
});

export default mongoose.model("collectionType", CollectionTypeSchema);
