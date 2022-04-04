import express from "express";
import collectCtrl from "../controllers/collect.controller";
const router = express.Router();

router
  router.route("/:key").get(collectCtrl.getCollections);
export default router;
