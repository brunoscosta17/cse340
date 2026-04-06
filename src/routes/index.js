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

// New category
router.get("/new-category", categoriesController.showNewCategoryPage);
router.post("/new-category", categoriesController.createCategory);

// Edit category
router.get("/edit-category/:id", categoriesController.showEditCategoryPage);
router.post("/edit-category/:id", categoriesController.updateCategory);

router.get("/projects", projectsController.showProjectsPage);
router.get("/project/:id", projectsController.showProjectDetailsPage);

module.exports = router;
