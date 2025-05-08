const Task = require("../models/task");

class TaskController {
  static async list(req, res) {
    const userId = req.session.userId;
    if (!userId) return res.redirect("/users/login");
    const tasks = await Task.findByUserId(userId);
    res.render("task/list", { tasks });
  }

  static showCreate(req, res) {
    if (!req.session.userId) return res.redirect("/users/login");
    res.render("task/create");
  }

  static async create(req, res) {
    const userId = req.session.userId;
    if (!userId) return res.redirect("/users/login");
    const { titulo, descricao, status, prioridade, data_vencimento } = req.body;
    try {
      await Task.create({
        titulo,
        descricao,
        status,
        prioridade,
        data_vencimento,
        user_id: userId,
      });
      res.redirect("/tasks");
    } catch (err) {
      res.render("task/create", { error: err.message });
    }
  }

  static async showEdit(req, res) {
    if (!req.session.userId) return res.redirect("/users/login");
    const task = await Task.findById(req.params.id);
    res.render("task/edit", { task });
  }

  static async edit(req, res) {
    const { titulo, descricao, status, prioridade, data_vencimento } = req.body;
    try {
      await Task.update(req.params.id, {
        titulo,
        descricao,
        status,
        prioridade,
        data_vencimento,
      });
      res.redirect("/tasks");
    } catch (err) {
      const task = await Task.findById(req.params.id);
      res.render("task/edit", { task, error: err.message });
    }
  }

  static async delete(req, res) {
    await Task.delete(req.params.id);
    res.redirect("/tasks");
  }
}

module.exports = TaskController;
