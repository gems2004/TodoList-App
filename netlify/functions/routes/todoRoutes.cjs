const express = require("express");
const {
  getAllTodos,
  addNewTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoController.cjs");
const { verifyJWT } = require("../middleware/verifyJWT.cjs");
const router = express.Router();

router.use(verifyJWT);

router
  .route("/")
  .get(getAllTodos)
  .post(addNewTodo)
  .patch(updateTodo)
  .delete(deleteTodo);

module.exports = router;
