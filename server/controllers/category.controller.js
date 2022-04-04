import Category from "../models/category.model";
import formidable from "formidable";

const getCategoryList = (req, res) => {
  Category.find({})
    .select("name")
    .exec((err, data) => {
      if (err) {
        // return res.status(400).json({ err });
        res.json({data :["Untitled Collection #174941512"]})
      }
      res.json(data);
    });
};

const addCategory = (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "file could not be uploaded",
      });
    }
    if (fields.category) fields.category = JSON.parse(fields.category);

    const list = fields.category;
    Category.find({}).select("name").exec( (err, result) => {
        let searchList = result.map((item) => item.name);
        list.forEach(item =>{
          if(!searchList.includes(item)){
            const category =  new Category();
            category.name =  item;
            category.save((err,result) =>{
            })
          }
        })
      });
  });
  next();
};
export default { getCategoryList, addCategory };
