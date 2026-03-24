const projectsModel = require("../models/projects");

const NUMBER_OF_UPCOMING_PROJECTS = 5;

async function showProjectsPage(req, res, next) {
    try {
        const projects = await projectsModel.getUpcomingProjects(
            NUMBER_OF_UPCOMING_PROJECTS
        );

        res.render("projects", {
            title: "Upcoming Service Projects",
            projects
        });
    } catch (error) {
        next(error);
    }
}

async function showProjectDetailsPage(req, res, next) {
    try {
        const projectId = req.params.id;

        const project = await projectsModel.getProjectDetails(projectId);

        if (!project) {
            return res.status(404).render("404", {
                title: "404 Not Found",
                message: "Project not found."
            });
        }

        const categories = await projectsModel.getCategoriesByProjectId(projectId);

        res.render("project", {
            title: project.project_title,
            project,
            categories
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    showProjectsPage,
    showProjectDetailsPage
};
