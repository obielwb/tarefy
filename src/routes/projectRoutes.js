const express = require("express");
const router = express.Router();
const ProjectController = require("../controllers/projectController");

router.get("/", ProjectController.list);
router.get("/tasks/:id", ProjectController.showTasks); // Nova rota
router.get("/create", ProjectController.showCreate);
router.post("/create", ProjectController.create);
router.get("/edit/:id", ProjectController.showEdit);
router.post("/edit/:id", ProjectController.edit);
router.get("/delete/:id", ProjectController.delete);

module.exports = router;
