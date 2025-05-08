const pool = require("../config/database");

class Project {
  static async create({ nome, descricao, user_id }) {
    const query = `
      INSERT INTO projects (nome, descricao, user_id)
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    const values = [nome, descricao, user_id];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async findByUserId(user_id) {
    const query = "SELECT * FROM projects WHERE user_id = $1";
    const result = await pool.query(query, [user_id]);
    return result.rows;
  }

  static async findById(id) {
    const query = "SELECT * FROM projects WHERE id = $1";
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async update(id, { nome, descricao }) {
    const query = `
      UPDATE projects
      SET nome = $1, descricao = $2, updated_at = CURRENT_TIMESTAMP
      WHERE id = $3
      RETURNING *
    `;
    const values = [nome, descricao, id];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async delete(id) {
    const query = "DELETE FROM projects WHERE id = $1";
    await pool.query(query, [id]);
  }
}

module.exports = Project;
