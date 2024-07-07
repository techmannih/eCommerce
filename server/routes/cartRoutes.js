const { Router } = require("express");
const {
  createOrUpdateCart,
  getAllCart,
  clearAllCart,
  removeItemInCart,
  DecreaseItem,
} = require("../controller/cartController");

const router = Router();

router.route("/cart/create").post(createOrUpdateCart);
router.route("/cart/create/decrease").put(DecreaseItem);
router.route("/cart/:userId").get(getAllCart);
router.route("/cart/delete").delete(clearAllCart);
router.route("/cart/remove").delete(removeItemInCart);

module.exports = router;
