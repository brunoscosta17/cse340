const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

const routes = require("./src/routes");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.use("/", routes);

app.use((req, res) => {
  res.status(404).render("404", {
    title: "404 Not Found",
    message: "Sorry, the page you requested could not be found."
  });
});

app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).render("500", {
    title: "500 Server Error",
    message: "Something went wrong on the server."
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
