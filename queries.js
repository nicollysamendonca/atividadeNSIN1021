const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'aws-0-sa-east-1.pooler.supabase.com',
  database: 'postgres',
  password: 'lAyrtonSennaDaSilva@2003',
  port: 6543,
});

const getCurriculo = (request, response) => {
  pool.query('SELECT * FROM curriculo ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const createCurriculo = (request, response) => {
  const { nome, email, contato, formacao, experiencia } = request.body;

  pool.query('INSERT INTO curriculo (nome, email, contato, formacao, experiencia) VALUES ($1, $2, $3, $4, $5,) RETURNING *', [nome, email, contato, formacao, experiencia], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(201).send(`User added with ID: ${results.rows[0].id}`);
  });
};

const updateCurriculo = (request, response) => {
  const id = parseInt(request.params.id);
  const { nome, email, contato, formacao, experiencia } = request.body;

  pool.query(
    'UPDATE curriculo SET nome = $1, email = $2, contato = $3, formacao = $4, experiencia = $5 WHERE id = $6',
    [nome, email, contato, formacao, experiencia, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User modified with ID: ${id}`);
    }
  );
};

const deleteCurriculo = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('DELETE FROM curriculo WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`User deleted with ID: ${id}`);
  });
};

module.exports = {
  getCurriculo,
  createCurriculo,
  updateCurriculo,
  deleteCurriculo,
};
