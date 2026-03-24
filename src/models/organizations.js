const pool = require("../database");

async function getAllOrganizations() {
  const sql = `
    SELECT organization_id, organization_name, organization_description, organization_image
    FROM organizations
    ORDER BY organization_name;
  `;

  const result = await pool.query(sql);
  return result.rows;
}

async function getOrganizationById(organizationId) {
  const sql = `
    SELECT
      organization_id,
      organization_name,
      organization_description,
      organization_image
    FROM organizations
    WHERE organization_id = $1;
  `;

  const result = await pool.query(sql, [organizationId]);
  return result.rows[0];
}

async function getProjectsByOrganizationId(organizationId) {
  const sql = `
    SELECT
      project_id,
      project_title,
      project_description,
      project_location,
      project_date,
      organization_id
    FROM projects
    WHERE organization_id = $1
    ORDER BY project_date ASC;
  `;

  const result = await pool.query(sql, [organizationId]);
  return result.rows;
}

module.exports = {
  getAllOrganizations,
  getOrganizationById,
  getProjectsByOrganizationId
};
