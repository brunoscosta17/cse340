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

module.exports = { getAllCategories };
