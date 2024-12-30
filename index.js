let express = require("express");
const Joi = require("joi");
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Salom");
});

const books = [
  { id: 1, name: "edewedwedwedewdwe" },
  { id: 2, name: "oq soyloq" },
  { id: 3, name: "oqish" },
];

app.get("/api/books", (req, res) => {
  res.send(books);
});

app.post("/api/books", (req, res) => {
  const bookSchedule = Joi.object({
    name: Joi.string().required().min(3),
  });

  const { error } = bookSchedule.validate(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const newBook = {
    id: books.length + 1,
    name: req.body.name,
  };

  books.push(newBook);
  res.send(newBook);
});

app.get("/api/books/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));

  if (!book) {
    return res.status(404).send("Bu kitob topilmadi!!!");
  }
  res.send(book);
});

app.put("/api/books/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) {
    return res.status(404).send("this id's book is not found!");
  }

  const bookSchedule = Joi.object({
    name: Joi.string().required().min(3),
  });

  const { error } = bookSchedule.validate(req.body);
  if (error) {
    return res.status(404).send(error.details[0].message);
  }

  book.name = req.body.name;
  res.send(book);
});

app.delete("/api/books/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) {
    return res.status(404).send("bu id ga mos kitob topilmdi!!!");
  }

  const bookIndex = books.indexOf(book);
  books.splice(bookIndex, 1);

  return res.send(book);
});

const port = process.env.PORT || 5173;

app.listen(port, () => {
  console.log(` ${port} - chi portni eshitishni boshladm...`);
});
