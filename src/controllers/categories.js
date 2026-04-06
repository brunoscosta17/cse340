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

        res.render("category-details", {
            title: category.category_name,
            category,
            projects
        });
    } catch (error) {
        next(error);
    }
}

function showNewCategoryPage(req, res) {
    res.render("category-form", {
        title: "Add New Category",
        formTitle: "Add New Category",
        action: "/new-category",
        category: {
            category_name: ""
        },
        errors: []
    });
}

async function createCategory(req, res, next) {
    try {
        const { category_name } = req.body;
        const errors = validateCategory(category_name);

        if (errors.length > 0) {
            return res.status(400).render("category-form", {
                title: "Add New Category",
                formTitle: "Add New Category",
                action: "/new-category",
                category: {
                    category_name
                },
                errors
            });
        }

        const newCategory = await categoriesModel.createCategory(category_name.trim());

        if (!newCategory) {
            return res.status(500).render("category-form", {
                title: "Add New Category",
                formTitle: "Add New Category",
                action: "/new-category",
                category: {
                    category_name
                },
                errors: [{ msg: "Unable to create category." }]
            });
        }

        req.flash("success", "Category created successfully.");
        res.redirect("/categories");
    } catch (error) {
        next(error);
    }
}

async function showEditCategoryPage(req, res, next) {
    try {
        const categoryId = req.params.id;
        const category = await categoriesModel.getCategoryById(categoryId);

        if (!category) {
            return res.status(404).render("404", {
                title: "404 Not Found",
                message: "Category not found."
            });
        }

        res.render("category-form", {
            title: "Edit Category",
            formTitle: "Edit Category",
            action: `/edit-category/${category.category_id}`,
            category,
            errors: []
        });
    } catch (error) {
        next(error);
    }
}

async function updateCategory(req, res, next) {
    try {
        const categoryId = req.params.id;
        const { category_name } = req.body;
        const errors = validateCategory(category_name);

        if (errors.length > 0) {
            return res.status(400).render("category-form", {
                title: "Edit Category",
                formTitle: "Edit Category",
                action: `/edit-category/${categoryId}`,
                category: {
                    category_id: categoryId,
                    category_name
                },
                errors
            });
        }

        const updatedCategory = await categoriesModel.editCategory(
            categoryId,
            category_name.trim()
        );

        if (!updatedCategory) {
            return res.status(500).render("category-form", {
                title: "Edit Category",
                formTitle: "Edit Category",
                action: `/edit-category/${categoryId}`,
                category: {
                    category_id: categoryId,
                    category_name
                },
                errors: [{ msg: "Unable to update category." }]
            });
        }

        req.flash("success", "Category updated successfully.");
        res.redirect("/categories");
    } catch (error) {
        next(error);
    }
}

function validateCategory(categoryName) {
    const errors = [];

    if (!categoryName || categoryName.trim() === "") {
        errors.push({ msg: "Category name is required." });
        return errors;
    }

    if (categoryName.trim().length < 3) {
        errors.push({ msg: "Category name must be at least 3 characters long." });
    }

    if (categoryName.trim().length > 100) {
        errors.push({ msg: "Category name must not exceed 100 characters." });
    }

    return errors;
}

module.exports = {
    showCategoriesPage,
    showCategoryDetailsPage,
    showNewCategoryPage,
    createCategory,
    showEditCategoryPage,
    updateCategory
};
