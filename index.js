let express = require("express");
let books = require("./routes/books");
let customersRoute = require("./routes/customers");
const mongoose = require("mongoose");
const path = require("path");
const app = express();

mongoose
  .connect("mongodb://localhost/virtualdars")
  .then(() => {
    console.log("mongodbga Ulandi!!!");
  })
  .catch((err) => {
    console.error("Mongodbga Ulanishda Hatolik!!!", err);
  });

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use("/api/books", books);
app.use("/api/customers", customersRoute);

app.get("/", (req, res) => {
  res.render("index");
});

console.log(process.env.NODE_ENV);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  return console.log(` ${port} shu portni ishlatyapman.`);
});
