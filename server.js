const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

const organizationsModel = require("./src/models/organizations");
const projectsModel = require("./src/models/projects");
const categoriesModel = require("./src/models/categories");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

app.get("/organizations", async (req, res) => {
  try {
    const organizations = await organizationsModel.getAllOrganizations();
    res.render("organizations", {
      title: "Organizations",
      organizations
    });
  } catch (error) {
    console.error("Error loading organizations:", error);
    res.status(500).send("Server Error");
  }
});

app.get("/projects", async (req, res) => {
  try {
    const projects = await projectsModel.getAllProjects();
    res.render("projects", {
      title: "Service Projects",
      projects
    });
  } catch (error) {
    console.error("Error loading projects:", error);
    res.status(500).send("Server Error");
  }
});

app.get("/categories", async (req, res) => {
  try {
    const categories = await categoriesModel.getAllCategories();
    res.render("categories", {
      title: "Service Project Categories",
      categories
    });
  } catch (error) {
    console.error("Error loading categories:", error);
    res.status(500).send("Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
