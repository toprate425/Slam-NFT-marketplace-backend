import express from "express";
import purchaseCtrl from "../controllers/purchase.controller";
import authCtrl from "../controllers/auth.controller";
import articleCtrl from "../controllers/article.controller";
const router = express.Router();

router
  router.route("").get(authCtrl.authenticateToken,purchaseCtrl.PurchaseArt,articleCtrl.changeOwnerShip);
export default router;
