const pool = require("../config/database");

class Task {
  static async create({
    titulo,
    descricao,
    status,
    prioridade,
    data_vencimento,
    user_id,
  }) {
    const query = `
      INSERT INTO tasks (titulo, descricao, status, prioridade, data_vencimento, user_id)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
    const values = [
      titulo,
      descricao,
      status,
      prioridade,
      data_vencimento,
      user_id,
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async findByUserId(user_id) {
    const query = "SELECT * FROM tasks WHERE user_id = $1";
    const result = await pool.query(query, [user_id]);
    return result.rows;
  }

  static async findById(id) {
    const query = "SELECT * FROM tasks WHERE id = $1";
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async update(
    id,
    { titulo, descricao, status, prioridade, data_vencimento }
  ) {
    const query = `
      UPDATE tasks
      SET titulo = $1, descricao = $2, status = $3, prioridade = $4, data_vencimento = $5, updated_at = CURRENT_TIMESTAMP
      WHERE id = $6
      RETURNING *
    `;
    const values = [titulo, descricao, status, prioridade, data_vencimento, id];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async delete(id) {
    const query = "DELETE FROM tasks WHERE id = $1";
    await pool.query(query, [id]);
  }
}

module.exports = Task;
