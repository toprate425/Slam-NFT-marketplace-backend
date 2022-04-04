import Purchase from "../models/purchase.model";
const PurchaseArt = (req, res, next) => {
  const purchase = new Purchase();
  purchase.art = req.query.artId;
  purchase.from = req.query.userId;
  purchase.to = req.body.authId;

  purchase.save((err, data) => {
    if (!err) {
      // res.status(200).json({
      //   message: "Successfully minted!",
      // });
      next();
    }
  });
};
export default { PurchaseArt };
