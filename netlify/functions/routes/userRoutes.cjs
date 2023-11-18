const express = require("express");
const {
  getAllUsers,
  addNewUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController.cjs");
const { verifyJWT } = require("../middleware/verifyJWT.cjs");
const router = express.Router();

router.route("/").post(addNewUser);

router.use(verifyJWT);

router.route("/").get(getAllUsers).patch(updateUser).delete(deleteUser);

module.exports = router;
