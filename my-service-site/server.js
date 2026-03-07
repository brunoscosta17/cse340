import dotenv from "dotenv";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

const renderPage = async (res, viewName, pageTitle) => {
    return res.render(viewName, { title: pageTitle });
};

app.get("/", async (req, res) => {
    await renderPage(res, "index", "Home");
});

app.get("/organizations", async (req, res) => {
    await renderPage(res, "organizations", "Organizations");
});

app.get("/projects", async (req, res) => {
    await renderPage(res, "projects", "Projects");
});

app.get("/categories", async (req, res) => {
    await renderPage(res, "categories", "Categories");
});

app.use(async (req, res) => {
    res.status(404).send("Page not found.");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
