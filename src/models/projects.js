const pool = require("../database");

async function getAllProjects() {
  const sql = `
    SELECT
      p.project_id,
      p.project_title,
      p.project_description,
      p.project_location,
      p.project_date,
      p.organization_id,
      o.organization_name
    FROM projects p
    JOIN organizations o
      ON p.organization_id = o.organization_id
    ORDER BY p.project_date;
  `;

  const result = await pool.query(sql);
  return result.rows;
}

async function getUpcomingProjects(numberOfProjects) {
  const sql = `
    SELECT
      p.project_id,
      p.project_title,
      p.project_description,
      p.project_location,
      p.project_date,
      p.organization_id,
      o.organization_name
    FROM projects p
    JOIN organizations o
      ON p.organization_id = o.organization_id
    WHERE p.project_date >= CURRENT_DATE
    ORDER BY p.project_date ASC
    LIMIT $1;
  `;

  const result = await pool.query(sql, [numberOfProjects]);
  return result.rows;
}

async function getProjectDetails(projectId) {
  const sql = `
    SELECT
      p.project_id,
      p.project_title,
      p.project_description,
      p.project_location,
      p.project_date,
      p.organization_id,
      o.organization_name
    FROM projects p
    JOIN organizations o
      ON p.organization_id = o.organization_id
    WHERE p.project_id = $1;
  `;

  const result = await pool.query(sql, [projectId]);
  return result.rows[0];
}

async function getCategoriesByProjectId(projectId) {
  const sql = `
    SELECT
      c.category_id,
      c.category_name
    FROM project_categories pc
    JOIN categories c
      ON pc.category_id = c.category_id
    WHERE pc.project_id = $1
    ORDER BY c.category_name;
  `;

  const result = await pool.query(sql, [projectId]);
  return result.rows;
}

module.exports = {
  getAllProjects,
  getUpcomingProjects,
  getProjectDetails,
  getCategoriesByProjectId
};
