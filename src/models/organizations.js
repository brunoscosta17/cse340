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

module.exports = { getAllOrganizations };
