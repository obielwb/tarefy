const Project = require("../models/project");

class ProjectController {
  static async list(req, res) {
    const userId = req.session.userId;
    if (!userId) return res.redirect("/users/login");
    const projects = await Project.findByUserId(userId);
    res.render("project/list", { projects });
  }

  static showCreate(req, res) {
    if (!req.session.userId) return res.redirect("/users/login");
    res.render("project/create");
  }

  static async create(req, res) {
    const userId = req.session.userId;
    if (!userId) return res.redirect("/users/login");
    const { nome, descricao } = req.body;
    try {
      await Project.create({ nome, descricao, user_id: userId });
      res.redirect("/projects");
    } catch (err) {
      res.render("project/create", { error: err.message });
    }
  }

  static async showEdit(req, res) {
    if (!req.session.userId) return res.redirect("/users/login");
    const project = await Project.findById(req.params.id);
    res.render("project/edit", { project });
  }

  static async edit(req, res) {
    const { nome, descricao } = req.body;
    try {
      await Project.update(req.params.id, { nome, descricao });
      res.redirect("/projects");
    } catch (err) {
      const project = await Project.findById(req.params.id);
      res.render("project/edit", { project, error: err.message });
    }
  }

  static async delete(req, res) {
    await Project.delete(req.params.id);
    res.redirect("/projects");
  }
}

module.exports = ProjectController;
