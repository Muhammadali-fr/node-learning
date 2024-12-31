// let express = require("express");
// const Joi = require("joi");
// const app = express();
// app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("Salom");
// });

// const books = [
//   { id: 1, name: "edewedwedwedewdwe" },
//   { id: 2, name: "oq soyloq" },
//   { id: 3, name: "oqish" },
// ];

// app.get("/api/books", (req, res) => {
//   res.send(books);
// });

// app.post("/api/books", (req, res) => {
//   const bookSchedule = Joi.object({
//     name: Joi.string().required().min(3),
//   });

//   const { error } = bookSchedule.validate(req.body);

//   if (error) {
//     return res.status(400).send(error.details[0].message);
//   }

//   const newBook = {
//     id: books.length + 1,
//     name: req.body.name,
//   };

//   books.push(newBook);
//   res.send(newBook);
// });

// app.get("/api/books/:id", (req, res) => {
//   const book = books.find((b) => b.id === parseInt(req.params.id));

//   if (!book) {
//     return res.status(404).send("Bu kitob topilmadi!!!");
//   }
//   res.send(book);
// });

// app.put("/api/books/:id", (req, res) => {
//   const book = books.find((b) => b.id === parseInt(req.params.id));
//   if (!book) {
//     return res.status(404).send("this id's book is not found!");
//   }

//   const bookSchedule = Joi.object({
//     name: Joi.string().required().min(3),
//   });

//   const { error } = bookSchedule.validate(req.body);
//   if (error) {
//     return res.status(404).send(error.details[0].message);
//   }

//   book.name = req.body.name;
//   res.send(book);
// });

// app.delete("/api/books/:id", (req, res) => {
//   const book = books.find((b) => b.id === parseInt(req.params.id));
//   if (!book) {
//     return res.status(404).send("bu id ga mos kitob topilmdi!!!");
//   }

//   const bookIndex = books.indexOf(book);
//   books.splice(bookIndex, 1);

//   return res.send(book);
// });

// const port = process.env.PORT || 5173;

// app.listen(port, () => {
//   console.log(` ${port} - chi portni eshitishni boshladm...`);
// });

let express = require("express");
const Joi = require("joi");
const logger = require("./logger");
const auth = require("./auth");

const app = express();
app.use(express.json());

app.use(logger);

app.use(auth);

let catigoriesArr = [
  {
    id: 1,
    name: "Web devoloper",
  },
  {
    id: 2,
    name: "Web Design",
  },
  {
    id: 3,
    name: "Front-End",
  },
  {
    id: 4,
    name: "Back-End",
  },
];

app.get("/", (req, res) => {
  res.send("Hell you are in bad area!");
});

app.get("/virtual.com/api/catigories", (req, res) => {
  res.send(catigoriesArr);
});

app.get("/virtual.com/api/catigories/:name", (req, res) => {
  const category = catigoriesArr.find(
    (categor) => categor.name.toLowerCase() === req.params.name.toLowerCase()
  );

  if (!category) {
    return res.status(404).send("category not found.");
  }

  res.status(200).send(category);
});

app.put("/virtual.com/api/catigories/:name", (req, res) => {
  const category = catigoriesArr.find(
    (categor) => categor.name.toLowerCase() === req.params.name.toLowerCase()
  );

  if (!category) {
    return res.status(404).send("category not found while updating.");
  }

  let categorySchedule = Joi.object({
    name: Joi.string().required().min(3),
  });

  let { error } = categorySchedule.validate(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  category.name = req.body.name;
  res.send(category);
});

app.post("/virtual.com/api/catigories", (req, res) => {
  categorySchedule = Joi.object({
    name: Joi.string().required().min(3),
  });

  const { error } = categorySchedule.validate(req.body);

  if (error) {
    res.status(400).send(error.details[0].message);
  }

  const newCategory = {
    id: catigoriesArr.length + 1,
    name: req.body.name,
  };

  catigoriesArr.push(newCategory);
  res.send(newCategory);
});

app.delete("/virtual.com/api/catigories/:id", (req, res) => {
  const category = catigoriesArr.find(
    (categor) => categor.id === parseInt(req.params.id)
  );

  if (!category) {
    return res.status(404).send("category not found while updating.");
  }

  const categoryIndex = catigoriesArr.indexOf(category);
  catigoriesArr.splice(categoryIndex, 1);

  res.send(category);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  return console.log(` ${port} shu portni ishlatyapman.`);
});
