import Article from "../models/article.model";
import formidable from "formidable";
import { exiftool } from "exiftool-vendored";
import mongoose from "mongoose";
import Purchase from "../models/purchase.model";
const create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "file could not be uploaded",
      });
    }

    if (fields.category) fields.category = JSON.parse(fields.category);
    const article = new Article(fields);

    article.createdBy = req.body.authId;
    article.owner = req.body.authId;
    if (files.art_file) {
      const metaData = await exiftool.read(files.art_file.path);
      let type =
        metaData.Make != undefined || metaData.Model != undefined
          ? "photograph"
          : metaData.FileTypeExtension.toLowerCase();
      article.fileType = type;
    }
    article.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      res.status(200).json({
        message: "Successfully created!",
        id: result._id,
      });
    });
  });
};

const update = async (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "file could not be uploaded",
      });
    }

    if (fields.category) fields.category = JSON.parse(fields.category);
    const article = await Article.findById(req.params.id);

    if (files.art_file) {
      const metaData = await exiftool.read(files.art_file.path);
      let type =
        metaData.Make != undefined || metaData.Model != undefined
          ? "photograph"
          : metaData.FileTypeExtension.toLowerCase();

      article.fileType = type;
    }
    article.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      res.status(200).json({
        message: "Successfully created!",
        id: result._id,
      });
    });
  });
};

const updatePrice = (req, res) => {
  Article.findByIdAndUpdate(req.params.id, { price: req.body.price }).exec(
    (err, result) => {
      if (!err) {
        res.status(200).json({
          message: "Successfully created!",
        });
      }
    }
  );
};
const list = (req, res) => {
  console.log('list functions')
  Article.find({ isMinted: true }).exec((err, articles) => {
    if (err) {
      return res.status(400).json({ err });
    }
    res.json(articles);
  });
};
const sortByPrice = (req, res) => {
  const sortId = req.params.sortId;
  if (sortId == 0) {
    Article.find({ isMinted: true })
      .sort({ created: -1 })
      .exec((err, articles) => {
        if (err) {
          return res.status(400).json({ err });
        }
        res.json(articles);
      });
  } else if (sortId == 1) {
    Article.find({ isMinted: true })
      .sort({ price: 1 })
      .exec((err, articles) => {
        if (err) {
          return res.status(400).json({ err });
        }
        res.json(articles);
      });
  } else {
    Article.find({ isMinted: true })
      .sort({ price: -1 })
      .exec((err, articles) => {
        if (err) {
          return res.status(400).json({ err });
        }
        res.json(articles);
      });
  }
};

const sortByCollection = (req, res) => {
  let key = req.params.seachkey;
  Article.find({
    isMinted: true,
    collectionType: { $regex: key, $options: "i" },
  }).exec((err, articles) => {
    if (err) {
      return res.status(400).json({ err });
    }
    res.json(articles);
  });
};

const filterByPrice = (req, res) => {
  Article.find({
    isMinted: true,
    price: { $gt: req.body.fromPrice, $lt: req.body.toPrice },
  }).exec((err, articles) => {
    if (err) {
      return res.status(400).json({ err });
    }
    res.json(articles);
  });
};

const sortByFileType = (req, res) => {
  console.log('sortByFileType')
  const sortId = req.params.sortId;
  if (sortId == 0) {
    Article.find({ isMinted: true }).exec((err, articles) => {
      if (err) {
        return res.status(400).json({ err });
      }
      res.json(articles);
    });
  } else if (sortId == 1) {
    Article.find({
      isMinted: true,
      $or: [
        { artType: { $regex: ".glb", $options: "i" } },
        { artType: { $regex: ".gltf", $options: "i" } },
      ],
    }).exec((err, articles) => {
      if (err) {
        return res.status(400).json({ err });
      }
      res.json(articles);
    });
  } else if (sortId == 2) {
    console.log('picture')
    Article.find({
      isMinted: true,
      $and: [
        {
          $or: [
            { artType: { $regex: ".jpg", $options: "i" } },
            { artType: { $regex: ".png", $options: "i" } },
            { artType: { $regex: ".svg", $options: "i" } },
            { artType: { $regex: ".gif", $options: "i" } },
          ],
        },
        {fileType :{$ne : "photograph"}},
        {preview :"null"}
      ],
    }).exec((err, articles) => {
      console.log('result',articles.length)
      if (err) {
        return res.status(400).json({ err });
      }
      res.json(articles);
    });
  } else if (sortId == 3) {
    Article.find({
      isMinted: true,
      $or: [
        { artType: { $regex: "mp3", $options: "i" } },
        { artType: { $regex: "wav", $options: "i" } },
      ],
    }).exec((err, articles) => {
      if (err) {
        return res.status(400).json({ err });
      }
      res.json(articles);
    });
  } else if (sortId == 4) {
    Article.find({
      isMinted: true,
      $and: [{ fileType: { $in: ["photograph"] } }, { preview:"null"  }],
    }).exec((err, articles) => {
      if (err) {
        return res.status(400).json({ err });
      }
      res.json(articles);
    });
  } else {
    Article.find({
      isMinted: true,
      $or: [
        { artType: { $regex: "mp4", $options: "i" } },
        { artType: { $regex: "webm", $options: "i" } },
      ],
    }).exec((err, articles) => {
      if (err) {
        return res.status(400).json({ err });
      }
      res.json(articles);
    });
  }
};

const sortByCategoryType = (req, res) => {
  const key = req.params.category;
  Article.find({ isMinted: true, category: key }).exec((err, result) => {
    if (err) {
      return res.status(400).json({ err });
    }
    res.json(result);
  });
};

const likeArt = (req, res) => {
  Article.findByIdAndUpdate(
    req.params.id,
    { $push: { favourite: req.body.authId } },
    { new: true }
  ).exec((err, result) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err),
      });
    }
    res.json(result);
  });
};
const unlikeArt = (req, res) => {
  Article.findByIdAndUpdate(
    req.params.id,
    { $pull: { favourite: req.body.authId } },
    { new: true }
  ).exec((err, result) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err),
      });
    }
    res.json(result);
  });
};

const getArticle = (req, res) => {
  console.log('getArticle function')
  Article.findById(req.params.id)
    .populate("createdBy", "id name")
    .exec((err, article) => {
      if (!err) {
        const isOwner =
          (article.owner + "") === req.body.authId.toString();

          console.log(article.owner + "",req.body.authId.toString())
        res.json({ data: article, isOwner });
      }
    });
};

const getArticleById = (req, res) => {
  Article.findById(req.params.id)
    .populate("createdBy", "id name")
    .exec((err, article) => {
      if (!err) {
        res.json({ data: article });
      }
    });
};

const changeOwnerShip = async  (req, res) => {

  try{
    const artId = req.query.artId;
    const from =req.query.userId;
    const to = req.body.authId;
    const newAddress = req.query.ownerAddress;
    const purchase = new Purchase({artId,from,to});
    await purchase.save();

    await Article.findByIdAndUpdate(artId, { owner: to,ownerAddress:newAddress });
    res.json({ message: "successfully minted" });
  }
  catch (err) {
    console.log('changeOwner err', err);
  }
  

};

const mintedList = (req, res) => {
  Article.find({ createdBy: req.body.authId, isMinted: true })
    .populate("createdBy", "name")
    .exec((err, articles) => {
      if (!err) {
        res.json(articles);
      }
    });
};

const createdList = (req, res) => {
  Article.find({ createdBy: req.body.authId }).exec((err, articles) => {
    if (!err) {
      res.json(articles);
    }
  });
};

const ownedList = (req, res) => {
  Article.find({ owner: req.body.authId }).exec((err, articles) => {
    if (!err) {
      res.json(articles);
    }
  });
};
const soldList = (req, res) => {
  Article.find({
    createdBy: req.body.authId,
    isMinted: true,
    owner: { $ne: req.body.authId },
  }).exec((err, articles) => {
    if (!err) {
      res.json(articles);
    }
  });
};

const likeArtList = (req, res) => {
  Article.find({
    favourite: req.body.authId,
  }).exec((err, articles) => {
    if (!err) {
      res.json(articles);
    }
  });
};

const mintArt = async (req, res) => {
  const artId = req.query.artId;
  const ownerAddress = req.query.ownerAddress;
  console.log(ownerAddress);
  await Article.findByIdAndUpdate(artId, { isMinted: true , ownerAddress :ownerAddress});
  res.json({ message: "successfully minted" });
};

const incrementViews = (req, res, next) => {
  Article.updateMany({},{ $inc: { views: 1 } }, { new: true }).exec((err, result) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err),
      });
    }
    next();
  });
};

export default {
  create,
  update,
  updatePrice,
  list,
  sortByPrice,
  sortByCollection,
  filterByPrice,
  sortByFileType,
  sortByCategoryType,
  likeArt,
  getArticleById,
  getArticle,
  changeOwnerShip,
  mintedList,
  createdList,
  ownedList,
  soldList,
  mintArt,
  unlikeArt,
  incrementViews,
  likeArtList
};
