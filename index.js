let express = require("express");
const app = express();
app.get("/", (req, res) => {
  res.send("Salom");
});

app.get("/api/books", (req, res) => {
  res.send(["abadiyot", "oq soyloq", "oqish"]);
});

app.get('/api/books/:id' , (req, res) => {
  res.send(req.params.id)
})

app.get('/api/articles/:year/:month' , (req, res) => {
  res.send(req.query)
})

const port = process.env.PORT || 5173

app.listen(port, () => {
  console.log(` ${port} - chi portni eshitishni boshladm...`);
});
