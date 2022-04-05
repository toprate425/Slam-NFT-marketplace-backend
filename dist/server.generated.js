/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./server/config/config.js":
/*!*********************************!*\
  !*** ./server/config/config.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst config = {\n  env: \"development\" || 0,\n  port: process.env.PORT || 5000,\n  jwtSecret: process.env.JWT_SECRET || \"YOUR_secret_key\",\n  mongoUri: \"mongodb+srv://toprate425:Highlighting1993425@cluster0.8udnj.mongodb.net/nft\" // mongoUri: process.env.MONGODB_URI ||\n  //   process.env.MONGO_HOST ||\n  //   'mongodb://' + (process.env.IP || '127.0.0.1') + ':' +\n  //   (process.env.MONGO_PORT || '27017') +\n  //   '/slam'\n\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (config);\n\n//# sourceURL=webpack://server/./server/config/config.js?");

/***/ }),

/***/ "./server/controllers/article.controller.js":
/*!**************************************************!*\
  !*** ./server/controllers/article.controller.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _models_article_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/article.model */ \"./server/models/article.model.js\");\n/* harmony import */ var formidable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! formidable */ \"formidable\");\n/* harmony import */ var formidable__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(formidable__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var exiftool_vendored__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! exiftool-vendored */ \"exiftool-vendored\");\n/* harmony import */ var exiftool_vendored__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(exiftool_vendored__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _models_purchase_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../models/purchase.model */ \"./server/models/purchase.model.js\");\n\n\n\n\n\n\nconst create = (req, res) => {\n  let form = new (formidable__WEBPACK_IMPORTED_MODULE_1___default().IncomingForm)();\n  form.keepExtensions = true;\n  form.parse(req, async (err, fields, files) => {\n    if (err) {\n      return res.status(400).json({\n        error: \"file could not be uploaded\"\n      });\n    }\n\n    if (fields.category) fields.category = JSON.parse(fields.category);\n    const article = new _models_article_model__WEBPACK_IMPORTED_MODULE_0__[\"default\"](fields);\n    article.createdBy = req.body.authId;\n    article.owner = req.body.authId;\n\n    if (files.art_file) {\n      const metaData = await exiftool_vendored__WEBPACK_IMPORTED_MODULE_2__.exiftool.read(files.art_file.path);\n      let type = metaData.Make != undefined || metaData.Model != undefined ? \"photograph\" : metaData.FileTypeExtension.toLowerCase();\n      article.fileType = type;\n    }\n\n    article.save((err, result) => {\n      if (err) {\n        return res.status(400).json({\n          error: err\n        });\n      }\n\n      res.status(200).json({\n        message: \"Successfully created!\",\n        id: result._id\n      });\n    });\n  });\n};\n\nconst update = async (req, res) => {\n  let form = new (formidable__WEBPACK_IMPORTED_MODULE_1___default().IncomingForm)();\n  form.keepExtensions = true;\n  form.parse(req, async (err, fields, files) => {\n    if (err) {\n      return res.status(400).json({\n        error: \"file could not be uploaded\"\n      });\n    }\n\n    if (fields.category) fields.category = JSON.parse(fields.category);\n    const article = await _models_article_model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].findById(req.params.id);\n\n    if (files.art_file) {\n      const metaData = await exiftool_vendored__WEBPACK_IMPORTED_MODULE_2__.exiftool.read(files.art_file.path);\n      let type = metaData.Make != undefined || metaData.Model != undefined ? \"photograph\" : metaData.FileTypeExtension.toLowerCase();\n      article.fileType = type;\n    }\n\n    article.save((err, result) => {\n      if (err) {\n        return res.status(400).json({\n          error: err\n        });\n      }\n\n      res.status(200).json({\n        message: \"Successfully created!\",\n        id: result._id\n      });\n    });\n  });\n};\n\nconst updatePrice = (req, res) => {\n  _models_article_model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].findByIdAndUpdate(req.params.id, {\n    price: req.body.price\n  }).exec((err, result) => {\n    if (!err) {\n      res.status(200).json({\n        message: \"Successfully created!\"\n      });\n    }\n  });\n};\n\nconst list = (req, res) => {\n  console.log('list functions');\n  _models_article_model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].find({\n    isMinted: true\n  }).exec((err, articles) => {\n    if (err) {\n      return res.status(400).json({\n        err\n      });\n    }\n\n    res.json(articles);\n  });\n};\n\nconst sortByPrice = (req, res) => {\n  const sortId = req.params.sortId;\n\n  if (sortId == 0) {\n    _models_article_model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].find({\n      isMinted: true\n    }).sort({\n      created: -1\n    }).exec((err, articles) => {\n      if (err) {\n        return res.status(400).json({\n          err\n        });\n      }\n\n      res.json(articles);\n    });\n  } else if (sortId == 1) {\n    _models_article_model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].find({\n      isMinted: true\n    }).sort({\n      price: 1\n    }).exec((err, articles) => {\n      if (err) {\n        return res.status(400).json({\n          err\n        });\n      }\n\n      res.json(articles);\n    });\n  } else {\n    _models_article_model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].find({\n      isMinted: true\n    }).sort({\n      price: -1\n    }).exec((err, articles) => {\n      if (err) {\n        return res.status(400).json({\n          err\n        });\n      }\n\n      res.json(articles);\n    });\n  }\n};\n\nconst sortByCollection = (req, res) => {\n  let key = req.params.seachkey;\n  _models_article_model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].find({\n    isMinted: true,\n    collectionType: {\n      $regex: key,\n      $options: \"i\"\n    }\n  }).exec((err, articles) => {\n    if (err) {\n      return res.status(400).json({\n        err\n      });\n    }\n\n    res.json(articles);\n  });\n};\n\nconst filterByPrice = (req, res) => {\n  _models_article_model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].find({\n    isMinted: true,\n    price: {\n      $gt: req.body.fromPrice,\n      $lt: req.body.toPrice\n    }\n  }).exec((err, articles) => {\n    if (err) {\n      return res.status(400).json({\n        err\n      });\n    }\n\n    res.json(articles);\n  });\n};\n\nconst sortByFileType = (req, res) => {\n  console.log('sortByFileType');\n  const sortId = req.params.sortId;\n\n  if (sortId == 0) {\n    _models_article_model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].find({\n      isMinted: true\n    }).exec((err, articles) => {\n      if (err) {\n        return res.status(400).json({\n          err\n        });\n      }\n\n      res.json(articles);\n    });\n  } else if (sortId == 1) {\n    _models_article_model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].find({\n      isMinted: true,\n      $or: [{\n        artType: {\n          $regex: \".glb\",\n          $options: \"i\"\n        }\n      }, {\n        artType: {\n          $regex: \".gltf\",\n          $options: \"i\"\n        }\n      }]\n    }).exec((err, articles) => {\n      if (err) {\n        return res.status(400).json({\n          err\n        });\n      }\n\n      res.json(articles);\n    });\n  } else if (sortId == 2) {\n    console.log('picture');\n    _models_article_model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].find({\n      isMinted: true,\n      $and: [{\n        $or: [{\n          artType: {\n            $regex: \".jpg\",\n            $options: \"i\"\n          }\n        }, {\n          artType: {\n            $regex: \".png\",\n            $options: \"i\"\n          }\n        }, {\n          artType: {\n            $regex: \".svg\",\n            $options: \"i\"\n          }\n        }, {\n          artType: {\n            $regex: \".gif\",\n            $options: \"i\"\n          }\n        }]\n      }, {\n        fileType: {\n          $ne: \"photograph\"\n        }\n      }, {\n        preview: \"null\"\n      }]\n    }).exec((err, articles) => {\n      console.log('result', articles.length);\n\n      if (err) {\n        return res.status(400).json({\n          err\n        });\n      }\n\n      res.json(articles);\n    });\n  } else if (sortId == 3) {\n    _models_article_model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].find({\n      isMinted: true,\n      $or: [{\n        artType: {\n          $regex: \"mp3\",\n          $options: \"i\"\n        }\n      }, {\n        artType: {\n          $regex: \"wav\",\n          $options: \"i\"\n        }\n      }]\n    }).exec((err, articles) => {\n      if (err) {\n        return res.status(400).json({\n          err\n        });\n      }\n\n      res.json(articles);\n    });\n  } else if (sortId == 4) {\n    _models_article_model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].find({\n      isMinted: true,\n      $and: [{\n        fileType: {\n          $in: [\"photograph\"]\n        }\n      }, {\n        preview: \"null\"\n      }]\n    }).exec((err, articles) => {\n      if (err) {\n        return res.status(400).json({\n          err\n        });\n      }\n\n      res.json(articles);\n    });\n  } else {\n    _models_article_model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].find({\n      isMinted: true,\n      $or: [{\n        artType: {\n          $regex: \"mp4\",\n          $options: \"i\"\n        }\n      }, {\n        artType: {\n          $regex: \"webm\",\n          $options: \"i\"\n        }\n      }]\n    }).exec((err, articles) => {\n      if (err) {\n        return res.status(400).json({\n          err\n        });\n      }\n\n      res.json(articles);\n    });\n  }\n};\n\nconst sortByCategoryType = (req, res) => {\n  const key = req.params.category;\n  _models_article_model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].find({\n    isMinted: true,\n    category: key\n  }).exec((err, result) => {\n    if (err) {\n      return res.status(400).json({\n        err\n      });\n    }\n\n    res.json(result);\n  });\n};\n\nconst likeArt = (req, res) => {\n  _models_article_model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].findByIdAndUpdate(req.params.id, {\n    $push: {\n      favourite: req.body.authId\n    }\n  }, {\n    new: true\n  }).exec((err, result) => {\n    if (err) {\n      return res.status(400).json({\n        error: errorHandler.getErrorMessage(err)\n      });\n    }\n\n    res.json(result);\n  });\n};\n\nconst unlikeArt = (req, res) => {\n  _models_article_model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].findByIdAndUpdate(req.params.id, {\n    $pull: {\n      favourite: req.body.authId\n    }\n  }, {\n    new: true\n  }).exec((err, result) => {\n    if (err) {\n      return res.status(400).json({\n        error: errorHandler.getErrorMessage(err)\n      });\n    }\n\n    res.json(result);\n  });\n};\n\nconst getArticle = (req, res) => {\n  console.log('getArticle function');\n  _models_article_model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].findById(req.params.id).populate(\"createdBy\", \"id name\").exec((err, article) => {\n    if (!err) {\n      const isOwner = article.owner + \"\" === req.body.authId.toString();\n      console.log(article.owner + \"\", req.body.authId.toString());\n      res.json({\n        data: article,\n        isOwner\n      });\n    }\n  });\n};\n\nconst getArticleById = (req, res) => {\n  _models_article_model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].findById(req.params.id).populate(\"createdBy\", \"id name\").exec((err, article) => {\n    if (!err) {\n      res.json({\n        data: article\n      });\n    }\n  });\n};\n\nconst changeOwnerShip = async (req, res) => {\n  try {\n    const artId = req.query.artId;\n    const from = req.query.userId;\n    const to = req.body.authId;\n    const newAddress = req.query.ownerAddress;\n    const purchase = new _models_purchase_model__WEBPACK_IMPORTED_MODULE_4__[\"default\"]({\n      artId,\n      from,\n      to\n    });\n    await purchase.save();\n    await _models_article_model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].findByIdAndUpdate(artId, {\n      owner: to,\n      ownerAddress: newAddress\n    });\n    res.json({\n      message: \"successfully minted\"\n    });\n  } catch (err) {\n    console.log('changeOwner err', err);\n  }\n};\n\nconst mintedList = (req, res) => {\n  _models_article_model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].find({\n    createdBy: req.body.authId,\n    isMinted: true\n  }).populate(\"createdBy\", \"name\").exec((err, articles) => {\n    if (!err) {\n      res.json(articles);\n    }\n  });\n};\n\nconst createdList = (req, res) => {\n  _models_article_model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].find({\n    createdBy: req.body.authId\n  }).exec((err, articles) => {\n    if (!err) {\n      res.json(articles);\n    }\n  });\n};\n\nconst ownedList = (req, res) => {\n  _models_article_model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].find({\n    owner: req.body.authId\n  }).exec((err, articles) => {\n    if (!err) {\n      res.json(articles);\n    }\n  });\n};\n\nconst soldList = (req, res) => {\n  _models_article_model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].find({\n    createdBy: req.body.authId,\n    isMinted: true,\n    owner: {\n      $ne: req.body.authId\n    }\n  }).exec((err, articles) => {\n    if (!err) {\n      res.json(articles);\n    }\n  });\n};\n\nconst likeArtList = (req, res) => {\n  _models_article_model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].find({\n    favourite: req.body.authId\n  }).exec((err, articles) => {\n    if (!err) {\n      res.json(articles);\n    }\n  });\n};\n\nconst mintArt = async (req, res) => {\n  const artId = req.query.artId;\n  const ownerAddress = req.query.ownerAddress;\n  console.log(ownerAddress);\n  await _models_article_model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].findByIdAndUpdate(artId, {\n    isMinted: true,\n    ownerAddress: ownerAddress\n  });\n  res.json({\n    message: \"successfully minted\"\n  });\n};\n\nconst incrementViews = (req, res, next) => {\n  _models_article_model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].updateMany({}, {\n    $inc: {\n      views: 1\n    }\n  }, {\n    new: true\n  }).exec((err, result) => {\n    if (err) {\n      return res.status(400).json({\n        error: errorHandler.getErrorMessage(err)\n      });\n    }\n\n    next();\n  });\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  create,\n  update,\n  updatePrice,\n  list,\n  sortByPrice,\n  sortByCollection,\n  filterByPrice,\n  sortByFileType,\n  sortByCategoryType,\n  likeArt,\n  getArticleById,\n  getArticle,\n  changeOwnerShip,\n  mintedList,\n  createdList,\n  ownedList,\n  soldList,\n  mintArt,\n  unlikeArt,\n  incrementViews,\n  likeArtList\n});\n\n//# sourceURL=webpack://server/./server/controllers/article.controller.js?");

/***/ }),

/***/ "./server/controllers/auth.controller.js":
/*!***********************************************!*\
  !*** ./server/controllers/auth.controller.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _models_user_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/user.model */ \"./server/models/user.model.js\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var express_jwt__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! express-jwt */ \"express-jwt\");\n/* harmony import */ var express_jwt__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(express_jwt__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../config/config */ \"./server/config/config.js\");\n\n\n\n\n\nconst signin = (req, res) => {\n  _models_user_model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].findOne({\n    email: req.body.email\n  }, (err, user) => {\n    if (err || !user) return res.status(\"401\").json({\n      error: \"User not found\"\n    });\n\n    if (!user.authenticate(req.body.password)) {\n      return res.status(\"401\").send({\n        error: \"Email and password don't match.\"\n      });\n    }\n\n    const token = jsonwebtoken__WEBPACK_IMPORTED_MODULE_1___default().sign({\n      _id: user._id\n    }, _config_config__WEBPACK_IMPORTED_MODULE_3__[\"default\"].jwtSecret);\n    res.cookie(\"t\", token, {\n      expire: new Date() + 9999\n    });\n    return res.json({\n      token,\n      user: user.name,\n      id: user._id\n    });\n  });\n};\n\nconst signout = (req, res) => {\n  res.clearCookie(\"t\");\n  return res.status(\"200\").json({\n    message: \"signed out\"\n  });\n};\n\nconst requireSignin = express_jwt__WEBPACK_IMPORTED_MODULE_2___default()({\n  secret: _config_config__WEBPACK_IMPORTED_MODULE_3__[\"default\"].jwtSecret,\n  userProperty: \"auth\",\n  algorithms: [\"HS256\"]\n});\n\nconst hasAuthorization = (req, res, next) => {\n  const authorized = req.profile && req.auth && req.profile._id == req.auth._id;\n\n  if (!authorized) {\n    return res.status(\"403\").json({\n      error: \"User is not authorized\"\n    });\n  }\n\n  next();\n};\n\nconst authenticateToken = (req, res, next) => {\n  const authHeader = req.headers[\"authorization\"];\n  const token = authHeader && authHeader.split(\" \")[1];\n  if (token == null) return res.sendStatus(401);\n\n  const user_id = jsonwebtoken__WEBPACK_IMPORTED_MODULE_1___default().verify(token, _config_config__WEBPACK_IMPORTED_MODULE_3__[\"default\"].jwtSecret)._id;\n\n  _models_user_model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].findById(user_id).exec((err, result) => {\n    if (err) {\n      return res.status(\"403\").json({\n        error: \"User is not authorized\"\n      });\n    }\n\n    req.body.authId = result._id;\n    next();\n  });\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  signin,\n  signout,\n  requireSignin,\n  hasAuthorization,\n  authenticateToken\n});\n\n//# sourceURL=webpack://server/./server/controllers/auth.controller.js?");

/***/ }),

/***/ "./server/controllers/category.controller.js":
/*!***************************************************!*\
  !*** ./server/controllers/category.controller.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _models_category_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/category.model */ \"./server/models/category.model.js\");\n/* harmony import */ var formidable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! formidable */ \"formidable\");\n/* harmony import */ var formidable__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(formidable__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nconst getCategoryList = (req, res) => {\n  _models_category_model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].find({}).select(\"name\").exec((err, data) => {\n    if (err) {\n      // return res.status(400).json({ err });\n      res.json({\n        data: [\"Untitled Collection #174941512\"]\n      });\n    }\n\n    res.json(data);\n  });\n};\n\nconst addCategory = (req, res, next) => {\n  let form = new (formidable__WEBPACK_IMPORTED_MODULE_1___default().IncomingForm)();\n  form.keepExtensions = true;\n  form.parse(req, async (err, fields, files) => {\n    if (err) {\n      return res.status(400).json({\n        error: \"file could not be uploaded\"\n      });\n    }\n\n    if (fields.category) fields.category = JSON.parse(fields.category);\n    const list = fields.category;\n    _models_category_model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].find({}).select(\"name\").exec((err, result) => {\n      let searchList = result.map(item => item.name);\n      list.forEach(item => {\n        if (!searchList.includes(item)) {\n          const category = new _models_category_model__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n          category.name = item;\n          category.save((err, result) => {});\n        }\n      });\n    });\n  });\n  next();\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  getCategoryList,\n  addCategory\n});\n\n//# sourceURL=webpack://server/./server/controllers/category.controller.js?");

/***/ }),

/***/ "./server/controllers/collect.controller.js":
/*!**************************************************!*\
  !*** ./server/controllers/collect.controller.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _models_collectionType_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/collectionType.model */ \"./server/models/collectionType.model.js\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nconst getCollections = (req, res) => {\n  let key = req.params.key;\n  _models_collectionType_model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].find({\n    name: {\n      $regex: key,\n      $options: \"i\"\n    }\n  }).select(\"id name\").exec((err, data) => {\n    if (err) {\n      return res.status(400).json({\n        err\n      });\n    }\n\n    res.json(data);\n  });\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  getCollections\n});\n\n//# sourceURL=webpack://server/./server/controllers/collect.controller.js?");

/***/ }),

/***/ "./server/controllers/user.controller.js":
/*!***********************************************!*\
  !*** ./server/controllers/user.controller.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _models_user_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/user.model */ \"./server/models/user.model.js\");\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ \"lodash\");\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../config/config */ \"./server/config/config.js\");\n\n\n\n\n\nconst create = (req, res, next) => {\n  const user = new _models_user_model__WEBPACK_IMPORTED_MODULE_0__[\"default\"](req.body);\n  user.save((err, result) => {\n    if (err) {\n      return res.status(400).json({\n        error: \"errorHandler.getErrorMessage(err)\"\n      });\n    }\n\n    const user_id = result._id + \"\";\n    const token = jsonwebtoken__WEBPACK_IMPORTED_MODULE_2___default().sign({\n      _id: user_id\n    }, _config_config__WEBPACK_IMPORTED_MODULE_3__[\"default\"].jwtSecret);\n    res.cookie(\"t\", token, {\n      expire: new Date() + 9999\n    });\n    res.status(200).json({\n      token,\n      user: result.name,\n      id: result._id\n    });\n  });\n};\n\nconst userByID = (req, res, next, id) => {\n  _models_user_model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].findById(id).exec((err, user) => {\n    if (err || !user) return res.status(\"400\").json({\n      error: \"User not found\"\n    });\n    req.profile = user;\n    next();\n  });\n};\n\nconst read = (req, res) => {\n  req.profile.hashed_password = undefined;\n  req.profile.salt = undefined;\n  return res.json(req.profile);\n};\n\nconst list = (req, res) => {\n  _models_user_model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].find((err, users) => {\n    if (err) {\n      return res.status(400).json({\n        error: \"errorHandler.getErrorMessage(err)\"\n      });\n    }\n\n    res.json(users);\n  }).select(\"name email updated created\");\n};\n\nconst update = (req, res, next) => {\n  let user = req.profile;\n  user = lodash__WEBPACK_IMPORTED_MODULE_1___default().extend(user, req.body);\n  user.updated = Date.now();\n  user.save(err => {\n    if (err) {\n      return res.status(400).json({\n        error: \"errorHandler.getErrorMessage(err)\"\n      });\n    }\n\n    user.hashed_password = undefined;\n    user.salt = undefined;\n    res.json(user);\n  });\n};\n\nconst remove = (req, res, next) => {\n  let user = req.profile;\n  user.remove((err, deletedUser) => {\n    if (err) {\n      return res.status(400).json({\n        error: \"errorHandler.getErrorMessage(err)\"\n      });\n    }\n\n    deletedUser.hashed_password = undefined;\n    deletedUser.salt = undefined;\n    res.json(deletedUser);\n  });\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  create,\n  userByID,\n  read,\n  list,\n  remove,\n  update\n});\n\n//# sourceURL=webpack://server/./server/controllers/user.controller.js?");

/***/ }),

/***/ "./server/models/article.model.js":
/*!****************************************!*\
  !*** ./server/models/article.model.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst ArticleSchema = new (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema)({\n  assets: String,\n  preview: String,\n  name: String,\n  externalLink: String,\n  description: String,\n  hash: String,\n  isFree: {\n    type: Boolean,\n    default: false\n  },\n  chainType: {\n    type: String,\n    default: 'ETH'\n  },\n  price: Number,\n  fileType: String,\n  collectionType: String,\n  img: String,\n  artType: String,\n  previewType: String,\n  priceType: {\n    type: String,\n    default: 'ETH'\n  },\n  views: {\n    type: Number,\n    default: 0\n  },\n  favourite: {\n    type: 'array',\n    items: {\n      type: (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema.ObjectId),\n      ref: \"User\"\n    },\n    uniqueItems: true\n  },\n  category: [String],\n  createdBy: {\n    type: (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema.ObjectId),\n    ref: \"User\"\n  },\n  owner: {\n    type: (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema.ObjectId),\n    ref: \"User\"\n  },\n  ownerAddress: {\n    type: String,\n    default: '0x0000000000000000000000000000000000000000'\n  },\n  created: {\n    type: Date,\n    default: Date.now\n  },\n  updated: {\n    type: Date\n  },\n  isMinted: {\n    type: Boolean,\n    default: true\n  }\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mongoose__WEBPACK_IMPORTED_MODULE_0___default().model(\"Article\", ArticleSchema));\n\n//# sourceURL=webpack://server/./server/models/article.model.js?");

/***/ }),

/***/ "./server/models/category.model.js":
/*!*****************************************!*\
  !*** ./server/models/category.model.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst CategorySchema = new (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema)({\n  name: String\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mongoose__WEBPACK_IMPORTED_MODULE_0___default().model(\"category\", CategorySchema));\n\n//# sourceURL=webpack://server/./server/models/category.model.js?");

/***/ }),

/***/ "./server/models/collectionType.model.js":
/*!***********************************************!*\
  !*** ./server/models/collectionType.model.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst CollectionTypeSchema = new (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema)({\n  name: String\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mongoose__WEBPACK_IMPORTED_MODULE_0___default().model(\"collectionType\", CollectionTypeSchema));\n\n//# sourceURL=webpack://server/./server/models/collectionType.model.js?");

/***/ }),

/***/ "./server/models/purchase.model.js":
/*!*****************************************!*\
  !*** ./server/models/purchase.model.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst PurchaseSchema = new (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema)({\n  art: {\n    type: (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema.ObjectId),\n    ref: \"Article\"\n  },\n  from: {\n    type: (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema.ObjectId),\n    ref: \"User\"\n  },\n  to: {\n    type: (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema.ObjectId),\n    ref: \"User\"\n  },\n  created: {\n    type: Date,\n    default: Date.now\n  }\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mongoose__WEBPACK_IMPORTED_MODULE_0___default().model(\"Purchase\", PurchaseSchema));\n\n//# sourceURL=webpack://server/./server/models/purchase.model.js?");

/***/ }),

/***/ "./server/models/user.model.js":
/*!*************************************!*\
  !*** ./server/models/user.model.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! crypto */ \"crypto\");\n/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(crypto__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst UserSchema = new (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema)({\n  name: {\n    type: String,\n    trim: true,\n    required: 'Name is required'\n  },\n  surName: {\n    type: String,\n    trim: true,\n    required: 'surName is required'\n  },\n  nickName: {\n    type: String,\n    trim: true,\n    required: 'nick Name is required'\n  },\n  phone: {\n    type: String,\n    trim: true,\n    required: 'phone is required'\n  },\n  email: {\n    type: String,\n    trim: true,\n    unique: 'Email already exists',\n    match: [/.+\\@.+\\..+/, 'Please fill a valid email address'],\n    required: 'Email is required'\n  },\n  hashed_password: {\n    type: String,\n    required: \"Password is required\"\n  },\n  salt: String,\n  updated: Date,\n  created: {\n    type: Date,\n    default: Date.now\n  }\n});\nUserSchema.virtual('password').set(function (password) {\n  this._password = password;\n  this.salt = this.makeSalt();\n  this.hashed_password = this.encryptPassword(password);\n}).get(function () {\n  return this._password;\n});\nUserSchema.path('hashed_password').validate(function (v) {\n  if (this._password && this._password.length < 6) {\n    this.invalidate('password', 'Password must be at least 6 characters.');\n  }\n\n  if (this.isNew && !this._password) {\n    this.invalidate('password', 'Password is required');\n  }\n}, null);\nUserSchema.methods = {\n  authenticate: function (plainText) {\n    return this.encryptPassword(plainText) === this.hashed_password;\n  },\n  encryptPassword: function (password) {\n    if (!password) return '';\n\n    try {\n      return crypto__WEBPACK_IMPORTED_MODULE_1___default().createHmac('sha1', this.salt).update(password).digest('hex');\n    } catch (err) {\n      return '';\n    }\n  },\n  makeSalt: function () {\n    return Math.round(new Date().valueOf() * Math.random()) + '';\n  }\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mongoose__WEBPACK_IMPORTED_MODULE_0___default().model('User', UserSchema));\n\n//# sourceURL=webpack://server/./server/models/user.model.js?");

/***/ }),

/***/ "./server/routes/article.routes.js":
/*!*****************************************!*\
  !*** ./server/routes/article.routes.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _controllers_auth_controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controllers/auth.controller */ \"./server/controllers/auth.controller.js\");\n/* harmony import */ var _controllers_article_controller__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../controllers/article.controller */ \"./server/controllers/article.controller.js\");\n/* harmony import */ var _controllers_category_controller__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../controllers/category.controller */ \"./server/controllers/category.controller.js\");\n\n\n\n\nconst router = express__WEBPACK_IMPORTED_MODULE_0___default().Router();\nrouter.route(\"/new\").post(_controllers_auth_controller__WEBPACK_IMPORTED_MODULE_1__[\"default\"].authenticateToken, _controllers_category_controller__WEBPACK_IMPORTED_MODULE_3__[\"default\"].addCategory, _controllers_article_controller__WEBPACK_IMPORTED_MODULE_2__[\"default\"].create);\nrouter.route('/update/:id').post(_controllers_article_controller__WEBPACK_IMPORTED_MODULE_2__[\"default\"].update);\nrouter.route('/change/price/:id').post(_controllers_article_controller__WEBPACK_IMPORTED_MODULE_2__[\"default\"].updatePrice);\nrouter.route(\"/list\").get(_controllers_article_controller__WEBPACK_IMPORTED_MODULE_2__[\"default\"].incrementViews, _controllers_article_controller__WEBPACK_IMPORTED_MODULE_2__[\"default\"].list);\nrouter.route(\"/buy/:id\").get(_controllers_auth_controller__WEBPACK_IMPORTED_MODULE_1__[\"default\"].authenticateToken, _controllers_article_controller__WEBPACK_IMPORTED_MODULE_2__[\"default\"].getArticle);\nrouter.route('/getById/:id').get(_controllers_article_controller__WEBPACK_IMPORTED_MODULE_2__[\"default\"].getArticleById);\nrouter.route(\"/sort/:sortId\").get(_controllers_article_controller__WEBPACK_IMPORTED_MODULE_2__[\"default\"].sortByPrice);\nrouter.route(\"/sortby/:sortId\").get(_controllers_article_controller__WEBPACK_IMPORTED_MODULE_2__[\"default\"].sortByFileType);\nrouter.route(\"/search/:seachkey\").get(_controllers_article_controller__WEBPACK_IMPORTED_MODULE_2__[\"default\"].sortByCollection);\nrouter.route(\"/filter/byPrice\").post(_controllers_article_controller__WEBPACK_IMPORTED_MODULE_2__[\"default\"].filterByPrice);\nrouter.route('/mint').get(_controllers_article_controller__WEBPACK_IMPORTED_MODULE_2__[\"default\"].mintArt);\nrouter.route(\"/minted\").get(_controllers_auth_controller__WEBPACK_IMPORTED_MODULE_1__[\"default\"].authenticateToken, _controllers_article_controller__WEBPACK_IMPORTED_MODULE_2__[\"default\"].mintedList);\nrouter.route(\"/created\").get(_controllers_auth_controller__WEBPACK_IMPORTED_MODULE_1__[\"default\"].authenticateToken, _controllers_article_controller__WEBPACK_IMPORTED_MODULE_2__[\"default\"].createdList);\nrouter.route(\"/owned\").get(_controllers_auth_controller__WEBPACK_IMPORTED_MODULE_1__[\"default\"].authenticateToken, _controllers_article_controller__WEBPACK_IMPORTED_MODULE_2__[\"default\"].ownedList);\nrouter.route(\"/solded\").get(_controllers_auth_controller__WEBPACK_IMPORTED_MODULE_1__[\"default\"].authenticateToken, _controllers_article_controller__WEBPACK_IMPORTED_MODULE_2__[\"default\"].soldList);\nrouter.route(\"/favourited\").get(_controllers_auth_controller__WEBPACK_IMPORTED_MODULE_1__[\"default\"].authenticateToken, _controllers_article_controller__WEBPACK_IMPORTED_MODULE_2__[\"default\"].likeArtList);\nrouter.route(\"/sort/category/:category\").get(_controllers_article_controller__WEBPACK_IMPORTED_MODULE_2__[\"default\"].sortByCategoryType);\nrouter.route(\"/addFavouriteArt/:id\").get(_controllers_auth_controller__WEBPACK_IMPORTED_MODULE_1__[\"default\"].authenticateToken, _controllers_article_controller__WEBPACK_IMPORTED_MODULE_2__[\"default\"].likeArt);\nrouter.route(\"/removeFavourite/:id\").get(_controllers_auth_controller__WEBPACK_IMPORTED_MODULE_1__[\"default\"].authenticateToken, _controllers_article_controller__WEBPACK_IMPORTED_MODULE_2__[\"default\"].unlikeArt);\nrouter.route('/purchase').get(_controllers_auth_controller__WEBPACK_IMPORTED_MODULE_1__[\"default\"].authenticateToken, _controllers_article_controller__WEBPACK_IMPORTED_MODULE_2__[\"default\"].changeOwnerShip);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (router);\n\n//# sourceURL=webpack://server/./server/routes/article.routes.js?");

/***/ }),

/***/ "./server/routes/auth.routes.js":
/*!**************************************!*\
  !*** ./server/routes/auth.routes.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _controllers_auth_controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controllers/auth.controller */ \"./server/controllers/auth.controller.js\");\n\n\nconst router = express__WEBPACK_IMPORTED_MODULE_0___default().Router();\nrouter.route(\"/auth/signin\").post(_controllers_auth_controller__WEBPACK_IMPORTED_MODULE_1__[\"default\"].signin);\nrouter.route(\"/auth/signout\").get(_controllers_auth_controller__WEBPACK_IMPORTED_MODULE_1__[\"default\"].signout);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (router);\n\n//# sourceURL=webpack://server/./server/routes/auth.routes.js?");

/***/ }),

/***/ "./server/routes/category.routes.js":
/*!******************************************!*\
  !*** ./server/routes/category.routes.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _controllers_category_controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controllers/category.controller */ \"./server/controllers/category.controller.js\");\n\n\nconst router = express__WEBPACK_IMPORTED_MODULE_0___default().Router();\nrouter;\nrouter.route(\"\").post(_controllers_category_controller__WEBPACK_IMPORTED_MODULE_1__[\"default\"].getCategoryList);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (router);\n\n//# sourceURL=webpack://server/./server/routes/category.routes.js?");

/***/ }),

/***/ "./server/routes/collect.routes.js":
/*!*****************************************!*\
  !*** ./server/routes/collect.routes.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _controllers_collect_controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controllers/collect.controller */ \"./server/controllers/collect.controller.js\");\n\n\nconst router = express__WEBPACK_IMPORTED_MODULE_0___default().Router();\nrouter;\nrouter.route(\"/:key\").get(_controllers_collect_controller__WEBPACK_IMPORTED_MODULE_1__[\"default\"].getCollections);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (router);\n\n//# sourceURL=webpack://server/./server/routes/collect.routes.js?");

/***/ }),

/***/ "./server/routes/user.routes.js":
/*!**************************************!*\
  !*** ./server/routes/user.routes.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _controllers_user_controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controllers/user.controller */ \"./server/controllers/user.controller.js\");\n\n\nconst router = express__WEBPACK_IMPORTED_MODULE_0___default().Router();\nrouter.route('').get(_controllers_user_controller__WEBPACK_IMPORTED_MODULE_1__[\"default\"].list).post(_controllers_user_controller__WEBPACK_IMPORTED_MODULE_1__[\"default\"].create);\nrouter.route(\"/:userId\").get(_controllers_user_controller__WEBPACK_IMPORTED_MODULE_1__[\"default\"].read).put(_controllers_user_controller__WEBPACK_IMPORTED_MODULE_1__[\"default\"].update).delete(_controllers_user_controller__WEBPACK_IMPORTED_MODULE_1__[\"default\"].remove);\nrouter.param(\"userId\", _controllers_user_controller__WEBPACK_IMPORTED_MODULE_1__[\"default\"].userByID);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (router);\n\n//# sourceURL=webpack://server/./server/routes/user.routes.js?");

/***/ }),

/***/ "./server/server.js":
/*!**************************!*\
  !*** ./server/server.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! body-parser */ \"body-parser\");\n/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(body_parser__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var cookie_parser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! cookie-parser */ \"cookie-parser\");\n/* harmony import */ var cookie_parser__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(cookie_parser__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var compression__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! compression */ \"compression\");\n/* harmony import */ var compression__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(compression__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! cors */ \"cors\");\n/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(cors__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var helmet__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! helmet */ \"helmet\");\n/* harmony import */ var helmet__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(helmet__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _routes_user_routes__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./routes/user.routes */ \"./server/routes/user.routes.js\");\n/* harmony import */ var _routes_auth_routes__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./routes/auth.routes */ \"./server/routes/auth.routes.js\");\n/* harmony import */ var _routes_article_routes__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./routes/article.routes */ \"./server/routes/article.routes.js\");\n/* harmony import */ var _routes_collect_routes__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./routes/collect.routes */ \"./server/routes/collect.routes.js\");\n/* harmony import */ var _routes_category_routes__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./routes/category.routes */ \"./server/routes/category.routes.js\");\n/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./config/config */ \"./server/config/config.js\");\n\n\n\n\n\n\n // import mongoose from 'mongoose'\n\n\n\n\n\n\n\n\n(__webpack_require__(/*! dotenv */ \"dotenv\").config)();\n\nconst MongoClient = (__webpack_require__(/*! mongodb */ \"mongodb\").MongoClient);\n\nconst CURRENT_WORKING_DIR = process.cwd();\nconst app = express__WEBPACK_IMPORTED_MODULE_0___default()();\nconst mongo = new MongoClient(_config_config__WEBPACK_IMPORTED_MODULE_12__[\"default\"].mongoUri, {\n  useNewUrlParser: true,\n  useUnifiedTopology: true\n});\nmongo.connect(err => {\n  console.log(\"connected for NFT\");\n}); // mongoose.Promise = global.Promise;\n// mongoose\n//   .connect(\n//     config.mongoUri,\n//     {useNewUrlParser: true}\n//   )\n//   .then(() => console.log(\"MongoDB successfully connected\"))\n//   .catch(err => console.log(err));\n\napp.use(body_parser__WEBPACK_IMPORTED_MODULE_2___default().json());\napp.use(body_parser__WEBPACK_IMPORTED_MODULE_2___default().urlencoded({\n  extended: true\n}));\napp.use(cookie_parser__WEBPACK_IMPORTED_MODULE_3___default()());\napp.use(compression__WEBPACK_IMPORTED_MODULE_4___default()());\napp.use(helmet__WEBPACK_IMPORTED_MODULE_6___default()());\napp.use(cors__WEBPACK_IMPORTED_MODULE_5___default()());\napp.use('/dist', express__WEBPACK_IMPORTED_MODULE_0___default()[\"static\"](path__WEBPACK_IMPORTED_MODULE_1___default().join(CURRENT_WORKING_DIR, 'dist')));\napp.use('/api/users', _routes_user_routes__WEBPACK_IMPORTED_MODULE_7__[\"default\"]);\napp.use('/', _routes_auth_routes__WEBPACK_IMPORTED_MODULE_8__[\"default\"]);\napp.use('/api/article', _routes_article_routes__WEBPACK_IMPORTED_MODULE_9__[\"default\"]);\napp.use('/api/collections', _routes_collect_routes__WEBPACK_IMPORTED_MODULE_10__[\"default\"]);\napp.use('/api/category', _routes_category_routes__WEBPACK_IMPORTED_MODULE_11__[\"default\"]);\napp.use((err, req, res, next) => {\n  if (err.name === 'UnauthorizedError') {\n    res.status(401).json({\n      \"error\": err.name + \": \" + err.message\n    });\n  }\n}); // mongoose.connection.on('error', () => {\n//   throw new Error(`unable to connect to database: ${mongoUri}`)\n// })\n\napp.listen(_config_config__WEBPACK_IMPORTED_MODULE_12__[\"default\"].port, err => {\n  if (err) {\n    console.log(err);\n  }\n\n  console.info('Server started on port %s.', _config_config__WEBPACK_IMPORTED_MODULE_12__[\"default\"].port);\n});\n\n//# sourceURL=webpack://server/./server/server.js?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("body-parser");

/***/ }),

/***/ "compression":
/*!******************************!*\
  !*** external "compression" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("compression");

/***/ }),

/***/ "cookie-parser":
/*!********************************!*\
  !*** external "cookie-parser" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("cookie-parser");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("cors");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("dotenv");

/***/ }),

/***/ "exiftool-vendored":
/*!************************************!*\
  !*** external "exiftool-vendored" ***!
  \************************************/
/***/ ((module) => {

module.exports = require("exiftool-vendored");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "express-jwt":
/*!******************************!*\
  !*** external "express-jwt" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("express-jwt");

/***/ }),

/***/ "formidable":
/*!*****************************!*\
  !*** external "formidable" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("formidable");

/***/ }),

/***/ "helmet":
/*!*************************!*\
  !*** external "helmet" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("helmet");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("lodash");

/***/ }),

/***/ "mongodb":
/*!**************************!*\
  !*** external "mongodb" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("mongodb");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./server/server.js");
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;