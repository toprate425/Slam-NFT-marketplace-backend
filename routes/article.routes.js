import express from "express";
import authCtrl from "../controllers/auth.controller";
import articleCtrl from "../controllers/article.controller";
import categoryCtrl from "../controllers/category.controller";
const router = express.Router();
router
  .route("/new")
  .post(
    authCtrl.authenticateToken,
    categoryCtrl.addCategory,
    articleCtrl.create
  );
router.route('/update/:id').post(articleCtrl.update)  
router.route('/change/price/:id').post(articleCtrl.updatePrice)
router.route("/list").get(articleCtrl.incrementViews,articleCtrl.list);
router.route("/buy/:id").get(authCtrl.authenticateToken, articleCtrl.getArticle);
router.route('/getById/:id').get(articleCtrl.getArticleById)
router.route("/sort/:sortId").get(articleCtrl.sortByPrice);
router.route("/sortby/:sortId").get(articleCtrl.sortByFileType);
router.route("/search/:seachkey").get(articleCtrl.sortByCollection);
router.route("/filter/byPrice").post(articleCtrl.filterByPrice);
router.route('/mint').get(articleCtrl.mintArt)
router.route("/minted").get(authCtrl.authenticateToken, articleCtrl.mintedList);
router.route("/created").get(authCtrl.authenticateToken, articleCtrl.createdList);
router.route("/owned").get(authCtrl.authenticateToken, articleCtrl.ownedList);
router.route("/solded").get(authCtrl.authenticateToken, articleCtrl.soldList);
router.route("/favourited").get(authCtrl.authenticateToken, articleCtrl.likeArtList);
router.route("/sort/category/:category").get(articleCtrl.sortByCategoryType);
router.route("/addFavouriteArt/:id").get(authCtrl.authenticateToken, articleCtrl.likeArt);
router.route("/removeFavourite/:id").get(authCtrl.authenticateToken, articleCtrl.unlikeArt);
router.route('/purchase').get(authCtrl.authenticateToken,articleCtrl.changeOwnerShip);
export default router;
