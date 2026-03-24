const pool = require("../database");

async function getAllCategories() {
  const sql = `
    SELECT category_id, category_name
    FROM categories
    ORDER BY category_name;
  `;
  const result = await pool.query(sql);
  return result.rows;
}

async function getCategoryById(categoryId) {
  const sql = `
    SELECT category_id, category_name
    FROM categories
    WHERE category_id = $1;
  `;
  const result = await pool.query(sql, [categoryId]);
  return result.rows[0];
}

async function getProjectsByCategoryId(categoryId) {
  const sql = `
    SELECT
      p.project_id,
      p.project_title,
      p.project_description,
      p.project_location,
      p.project_date,
      p.organization_id,
      o.organization_name
    FROM project_categories pc
    JOIN projects p
      ON pc.project_id = p.project_id
    JOIN organizations o
      ON p.organization_id = o.organization_id
    WHERE pc.category_id = $1
    ORDER BY p.project_date ASC;
  `;
  const result = await pool.query(sql, [categoryId]);
  return result.rows;
}

module.exports = {
  getAllCategories,
  getCategoryById,
  getProjectsByCategoryId
};
