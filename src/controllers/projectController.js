const Project = require("../models/project");
const Task = require("../models/task");

class ProjectController {
  static async list(req, res) {
    const userId = req.session.userId;
    if (!userId) return res.redirect("/users/login");
    const projects = await Project.findByUserId(userId);
    res.render("project/list", { layout: "layouts/main", projects });
  }

  static async showTasks(req, res) {
    const userId = req.session.userId;
    if (!userId) return res.redirect("/users/login");
    const project = await Project.findById(req.params.id);
    const tasks = await Task.findByProjectId(req.params.id);
    res.render("project/tasks", { layout: "layouts/main", project, tasks });
  }

  static async showCreate(req, res) {
    if (!req.session.userId) return res.redirect("/users/login");
    res.render("project/create", { layout: "layouts/main" });
  }

  static async create(req, res) {
    const userId = req.session.userId;
    if (!userId) return res.redirect("/users/login");
    const { nome, descricao } = req.body;
    try {
      await Project.create({ nome, descricao, user_id: userId });
      res.redirect("/projects");
    } catch (err) {
      res.render("project/create", {
        layout: "layouts/main",
        error: err.message,
      });
    }
  }

  static async showEdit(req, res) {
    if (!req.session.userId) return res.redirect("/users/login");
    const project = await Project.findById(req.params.id);
    res.render("project/edit", { layout: "layouts/main", project });
  }

  static async edit(req, res) {
    const { nome, descricao } = req.body;
    try {
      await Project.update(req.params.id, { nome, descricao });
      res.redirect("/projects");
    } catch (err) {
      const project = await Project.findById(req.params.id);
      res.render("project/edit", {
        layout: "layouts/main",
        project,
        error: err.message,
      });
    }
  }

  static async delete(req, res) {
    await Project.delete(req.params.id);
    res.redirect("/projects");
  }
}

module.exports = ProjectController;
