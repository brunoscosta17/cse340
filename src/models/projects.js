const pool = require("../database");

async function getAllProjects() {
  const sql = `
    SELECT
      p.project_id,
      p.project_title,
      p.project_description,
      p.project_location,
      p.project_date,
      o.organization_name
    FROM projects p
    JOIN organizations o
      ON p.organization_id = o.organization_id
    ORDER BY p.project_date;
  `;

  const result = await pool.query(sql);
  return result.rows;
}

module.exports = { getAllProjects };
