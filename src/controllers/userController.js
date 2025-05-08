const User = require("../models/user");
const bcrypt = require("bcrypt");

class UserController {
  static showRegister(req, res) {
    res.render("user/register");
  }

  static async register(req, res) {
    const { nome, email, senha } = req.body;
    try {
      const user = await User.create({ nome, email, senha });
      req.session.userId = user.id;
      res.redirect("/tasks");
    } catch (err) {
      res.render("user/register", {
        error: err.message,
      });
    }
  }

  static showLogin(req, res) {
    res.render("user/login");
  }

  static async login(req, res) {
    const { email, senha } = req.body;
    try {
      const user = await User.findByEmail(email);
      if (user && (await bcrypt.compare(senha, user.senha))) {
        req.session.userId = user.id;
        res.redirect("/tasks");
      } else {
        res.render("user/login", { error: "Email ou senha inválidos" });
      }
    } catch (err) {
      res.render("user/login", { error: err.message });
    }
  }

  static logout(req, res) {
    req.session.destroy();
    res.redirect("/users/login");
  }
}

module.exports = UserController;
