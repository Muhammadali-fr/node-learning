let express = require("express");
const Joi = require("joi");
const logger = require("./middleware/logger");
const auth = require("./auth");
const helmet = require("helmet");
const morgan = require("morgan");
const categories = require("./routes/books");
const home = require("./routes/home");
// const config = require("config");
const app = express();
app.set("view engine", "pug");

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  console.log("logger isglayapti!");
}

// console.log(config.get("name"));
// console.log(config.get("mailserver.hostname"));
// console.log(config.get("mailserver.password"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(logger);
app.use(auth);
app.use(helmet());
app.use("/api/categories/", categories);
app.use("/", home);
console.log(process.env.NODE_ENV);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  return console.log(` ${port} shu portni ishlatyapman.`);
});
