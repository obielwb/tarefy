const pool = require("../config/database");
const bcrypt = require("bcrypt");

class User {
  static async create({ nome, email, senha }) {
    const hashedPassword = await bcrypt.hash(senha, 10);
    const query = `
      INSERT INTO users (nome, email, senha)
      VALUES ($1, $2, $3)
      RETURNING id, nome, email
    `;
    const values = [nome, email, hashedPassword];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async findByEmail(email) {
    const query = "SELECT * FROM users WHERE email = $1";
    const result = await pool.query(query, [email]);
    return result.rows[0];
  }
}

module.exports = User;
