let express = require("express");
const router = express.Router();
const { Category, ValidateCategory } = require("../models/book");

router.get("/", async (req, res) => {
  const categoryies = await Category.find().sort("name");
  res.send(categoryies);
});

router.get("/:id", async (req, res) => {
  let category = await Category.findById(req.params.id);
  if (!category) {
    return res.status(404).send("bu aydi bilan kiob topilmadi");
  }

  res.send(category);
});

router.put("/:id", async (req, res) => {
  const { error } = ValidateCategory(req.body);
  if (error) {
    return res.send("Update vaqtida xaotolik:", error.details[0].message);
  }

  let category = await Category.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );

  if (!category) {
    return res.send("Update vaqtida Id ga mos book topilmadi");
  }

  res.send(category);
});

router.post("/", async (req, res) => {
  const { error } = ValidateCategory(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let category = new Category({
    name: req.body.name,
  });

  category = await category.save();

  res.status(200).send(category);
});

router.delete("/:id", async (req, res) => {
  const category = await Category.findByIdAndRemove(req.params.id);
  if (!category) {
    return res.status(404).send("Delete vaqtida bunga mos id topilmadi");
  }

  res.send(category);
});

module.exports = router;
