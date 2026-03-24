const express = require("express");
const router = express.Router();

const organizationsController = require("../controllers/organizations");
const categoriesController = require("../controllers/categories");
const projectsController = require("../controllers/projects");

router.get("/", (req, res) => {
    res.render("index", { title: "Home" });
});

router.get("/organizations", organizationsController.showOrganizationsPage);
router.get("/organization/:id", organizationsController.showOrganizationDetailsPage);

router.get("/categories", categoriesController.showCategoriesPage);
router.get("/category/:id", categoriesController.showCategoryDetailsPage);

router.get("/projects", projectsController.showProjectsPage);
router.get("/project/:id", projectsController.showProjectDetailsPage);

module.exports = router;
