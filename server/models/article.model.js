import mongoose from "mongoose";
const ArticleSchema = new mongoose.Schema({
  assets: String,
  preview: String,
  name: String,
  externalLink: String,
  description: String,
  hash: String,
  isFree: {type: Boolean,default:false},
  chainType: {type:String,default:'ETH'},
  price: Number,
  fileType: String,
  collectionType: String,
  img: String,
  artType: String,
  previewType: String,
  priceType: {type:String,default:'ETH'},
  views: {type: Number, default: 0},
  favourite : {
    type : 'array', 
    items : {
      type : mongoose.Schema.ObjectId, 
      ref : "User"
    }, 
    uniqueItems : true
  },
  category: [String],
  createdBy: { type: mongoose.Schema.ObjectId, ref: "User" },
  owner: { type: mongoose.Schema.ObjectId, ref: "User" },
  ownerAddress :{type : String,default :'0x0000000000000000000000000000000000000000'},
  created: {
    type: Date,
    default: Date.now,
  },
  updated: {
    type: Date,
  },
  isMinted : {type : Boolean,default: true},
});

export default mongoose.model("Article", ArticleSchema);
