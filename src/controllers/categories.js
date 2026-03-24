const categoriesModel = require("../models/categories");

async function showCategoriesPage(req, res, next) {
    try {
        const categories = await categoriesModel.getAllCategories();

        res.render("categories", {
            title: "Service Project Categories",
            categories
        });
    } catch (error) {
        next(error);
    }
}

async function showCategoryDetailsPage(req, res, next) {
    try {
        const categoryId = req.params.id;

        const category = await categoriesModel.getCategoryById(categoryId);

        if (!category) {
            return res.status(404).render("404", {
                title: "404 Not Found",
                message: "Category not found."
            });
        }

        const projects = await categoriesModel.getProjectsByCategoryId(categoryId);

        res.render("category", {
            title: category.category_name,
            category,
            projects
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    showCategoriesPage,
    showCategoryDetailsPage
};
