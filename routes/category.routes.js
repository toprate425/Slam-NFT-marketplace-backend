import express from "express";
import categoryCtrl from "../controllers/category.controller";
const router = express.Router();

router
  router.route("").post(categoryCtrl.getCategoryList);
export default router;
