import Collect from "../models/collectionType.model";
import mongoose from "mongoose";

const getCollections = (req, res) => {
  
  let key = req.params.key;
  Collect.find({ name: { $regex: key, $options: "i" } })
    .select("id name")
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({ err });
      }
      res.json(data);
    });
};

export default { getCollections };
