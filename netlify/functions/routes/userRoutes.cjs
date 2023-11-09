const express = require("express");
const {
  getAllUsers,
  addNewUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController.cjs");
const { verifyJWT } = require("../middleware/verifyJWT.cjs");
const router = express.Router();

router.use(verifyJWT);

router
  .route("/")
  .get(getAllUsers)
  .post(addNewUser)
  .patch(updateUser)
  .delete(deleteUser);

module.exports = router;
