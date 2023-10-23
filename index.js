const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'aws-0-sa-east-1.pooler.supabase.com',
  database: 'postgres',
  password: 'AyrtonSenna@2003',
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
  const { nome, email, telefone, cursos, formacao, endereco, outrosContatos } = request.body;

  pool.query('INSERT INTO curriculo (nome, email, telefone, cursos, formacao, endereco, outrosContatos) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [nome, email, telefone, cursos, formacao, endereco, outrosContatos], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(201).send(`User added with ID: ${results.rows[0].id}`);
  });
};

const updateCurriculo = (request, response) => {
  const id = parseInt(request.params.id);
  const { nome, email, telefone, cursos, formacao, endereco, outrosContatos } = request.body;

  pool.query(
    'UPDATE curriculo SET nome = $1, email = $2, telefone = $3, cursos = $4, formacao = $5, endereco = $6, outrosContatos = $7 WHERE id = $8',
    [nome, email, telefone, cursos, formacao, endereco, outrosContatos, id],
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