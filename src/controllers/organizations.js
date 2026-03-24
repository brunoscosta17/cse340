const organizationsModel = require("../models/organizations");

async function showOrganizationsPage(req, res, next) {
    try {
        const organizations = await organizationsModel.getAllOrganizations();

        res.render("organizations", {
            title: "Partner Organizations",
            organizations
        });
    } catch (error) {
        next(error);
    }
}

async function showOrganizationDetailsPage(req, res, next) {
    try {
        const organizationId = req.params.id;

        const organization = await organizationsModel.getOrganizationById(organizationId);

        if (!organization) {
            return res.status(404).render("404", {
                title: "404 Not Found",
                message: "Organization not found."
            });
        }

        const projects = await organizationsModel.getProjectsByOrganizationId(organizationId);

        res.render("organization", {
            title: organization.organization_name,
            organization,
            projects
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    showOrganizationsPage,
    showOrganizationDetailsPage
};
