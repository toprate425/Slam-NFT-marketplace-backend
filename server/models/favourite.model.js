import mongoose from "mongoose";
const FavouriteSchema = new mongoose.Schema({
  art:  { type: mongoose.Schema.ObjectId, ref: "Article" },
  userId: { type: mongoose.Schema.ObjectId, ref: "User" },
  created: {
    type: Date,
    default: Date.now
  }

});

export default mongoose.model("Favourite", FavouriteSchema);