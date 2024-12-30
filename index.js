let express = require("express");
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
  res.send(["abadiyot", "oq soyloq", "oqish"]);
});

app.post("api/books", (req, res) => {
  const newBook = {
    id: books.length + 1,
    name: req.body.name,
  };

  books.push(newBook);

  if (!req.body.name) {
    return res.status(400);
  } else {
    res.send(newBook);
  }
});

app.get("/api/books/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));

  if (!book) {
    return res.status(404).send("Bu kitob topilmadi!!!");
  }
  res.send(book);
});

app.get("/api/articles/:year/:month", (req, res) => {
  res.send(req.query);
});

const port = process.env.PORT || 5173;

app.listen(port, () => {
  console.log(` ${port} - chi portni eshitishni boshladm...`);
});
