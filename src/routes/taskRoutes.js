const express = require("express");
const router = express.Router();
const TaskController = require("../controllers/taskController");

router.get("/", TaskController.list);
router.get("/create", TaskController.showCreate);
router.post("/create", TaskController.create);
router.get("/edit/:id", TaskController.showEdit);
router.post("/edit/:id", TaskController.edit);
router.get("/delete/:id", TaskController.delete);

module.exports = router;
