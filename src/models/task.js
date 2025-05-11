const pool = require("../config/database");

class Task {
  static async create({
    titulo,
    descricao,
    status,
    prioridade,
    data_vencimento,
    user_id,
    project_ids = [],
  }) {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      // Inserir a tarefa
      const taskQuery = `
        INSERT INTO tasks (titulo, descricao, status, prioridade, data_vencimento, user_id)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *
      `;
      const taskValues = [
        titulo,
        descricao,
        status,
        prioridade,
        data_vencimento,
        user_id,
      ];
      const taskResult = await client.query(taskQuery, taskValues);
      const task = taskResult.rows[0];

      // Associar projetos à tarefa
      if (project_ids.length > 0) {
        const projectQuery = `
          INSERT INTO task_project (task_id, project_id)
          VALUES ($1, $2)
        `;
        for (const project_id of project_ids) {
          await client.query(projectQuery, [task.id, project_id]);
        }
      }

      await client.query("COMMIT");
      return task;
    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    } finally {
      client.release();
    }
  }

  static async findByUserId(user_id) {
    const query = `
      SELECT t.*, array_agg(tp.project_id) as project_ids
      FROM tasks t
      LEFT JOIN task_project tp ON t.id = tp.task_id
      WHERE t.user_id = $1
      GROUP BY t.id
    `;
    const result = await pool.query(query, [user_id]);
    return result.rows;
  }

  static async findById(id) {
    const query = `
      SELECT t.*, array_agg(tp.project_id) as project_ids
      FROM tasks t
      LEFT JOIN task_project tp ON t.id = tp.task_id
      WHERE t.id = $1
      GROUP BY t.id
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async update(
    id,
    { titulo, descricao, status, prioridade, data_vencimento, project_ids = [] }
  ) {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      // Atualizar a tarefa
      const taskQuery = `
        UPDATE tasks
        SET titulo = $1, descricao = $2, status = $3, prioridade = $4, data_vencimento = $5, updated_at = CURRENT_TIMESTAMP
        WHERE id = $6
        RETURNING *
      `;
      const taskValues = [
        titulo,
        descricao,
        status,
        prioridade,
        data_vencimento,
        id,
      ];
      const taskResult = await client.query(taskQuery, taskValues);
      const task = taskResult.rows[0];

      // Remover associações existentes
      await client.query("DELETE FROM task_project WHERE task_id = $1", [id]);

      // Adicionar novas associações
      if (project_ids.length > 0) {
        const projectQuery = `
          INSERT INTO task_project (task_id, project_id)
          VALUES ($1, $2)
        `;
        for (const project_id of project_ids) {
          await client.query(projectQuery, [id, project_id]);
        }
      }

      await client.query("COMMIT");
      return task;
    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    } finally {
      client.release();
    }
  }

  static async delete(id) {
    // A exclusão de associações é automática devido ao ON DELETE CASCADE
    const query = "DELETE FROM tasks WHERE id = $1";
    await pool.query(query, [id]);
  }

  static async findByProjectId(project_id) {
    const query = `
      SELECT t.*
      FROM tasks t
      JOIN task_project tp ON t.id = tp.task_id
      WHERE tp.project_id = $1
    `;
    const result = await pool.query(query, [project_id]);
    return result.rows;
  }
}

module.exports = Task;
