import mongoose from "mongoose";
const PurchaseSchema = new mongoose.Schema({
  art:  { type: mongoose.Schema.ObjectId, ref: "Article" },
  from: { type: mongoose.Schema.ObjectId, ref: "User" },
  to: { type: mongoose.Schema.ObjectId, ref: "User" },
  created: {
    type: Date,
    default: Date.now
  }

});

export default mongoose.model("Purchase", PurchaseSchema);
