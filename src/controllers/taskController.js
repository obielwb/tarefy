const Task = require("../models/task");
const Project = require("../models/project");

class TaskController {
  static async list(req, res) {
    const userId = req.session.userId;
    if (!userId) return res.redirect("/users/login");
    const tasks = await Task.findByUserId(userId);
    res.render("task/list", { layout: "layouts/main", tasks });
  }

  static async showCreate(req, res) {
    if (!req.session.userId) return res.redirect("/users/login");
    const projects = await Project.findByUserId(req.session.userId);
    res.render("task/create", { layout: "layouts/main", projects });
  }

  static async create(req, res) {
    const userId = req.session.userId;
    if (!userId) return res.redirect("/users/login");
    const {
      titulo,
      descricao,
      status,
      prioridade,
      data_vencimento,
      project_ids,
    } = req.body;
    try {
      await Task.create({
        titulo,
        descricao,
        status,
        prioridade,
        data_vencimento,
        user_id: userId,
        project_ids: project_ids
          ? Array.isArray(project_ids)
            ? project_ids
            : [project_ids]
          : [],
      });
      res.redirect("/tasks");
    } catch (err) {
      const projects = await Project.findByUserId(userId);
      res.render("task/create", {
        layout: "layouts/main",
        projects,
        error: err.message,
      });
    }
  }

  static async showEdit(req, res) {
    if (!req.session.userId) return res.redirect("/users/login");
    const task = await Task.findById(req.params.id);
    const projects = await Project.findByUserId(req.session.userId);
    res.render("task/edit", { layout: "layouts/main", task, projects });
  }

  static async edit(req, res) {
    const {
      titulo,
      descricao,
      status,
      prioridade,
      data_vencimento,
      project_ids,
    } = req.body;
    try {
      await Task.update(req.params.id, {
        titulo,
        descricao,
        status,
        prioridade,
        data_vencimento,
        project_ids: project_ids
          ? Array.isArray(project_ids)
            ? project_ids
            : [project_ids]
          : [],
      });
      res.redirect("/tasks");
    } catch (err) {
      const task = await Task.findById(req.params.id);
      const projects = await Project.findByUserId(req.session.userId);
      res.render("task/edit", {
        layout: "layouts/main",
        task,
        projects,
        error: err.message,
      });
    }
  }

  static async delete(req, res) {
    await Task.delete(req.params.id);
    res.redirect("/tasks");
  }
}

module.exports = TaskController;
