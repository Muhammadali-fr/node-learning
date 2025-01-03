let express = require("express");
const Joi = require("joi");
const router = express.Router();

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

router.get("/", (req, res) => {
  res.send(catigoriesArr);
});

router.get("/:name", (req, res) => {
  const category = catigoriesArr.find(
    (categor) => categor.name.toLowerCase() === req.params.name.toLowerCase()
  );

  if (!category) {
    return res.status(404).send("category not found.");
  }

  res.status(200).send(category);
});

router.put("/:name", (req, res) => {
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

router.post("/", (req, res) => {
  categorySchedule = Joi.object({
    name: Joi.string().required().min(3),
  });

  const { error } = categorySchedule.validate(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const newCategory = {
    id: catigoriesArr.length + 1,
    name: req.body.name,
  };

  catigoriesArr.push(newCategory);
  res.send(newCategory);
});

router.delete("/:id", (req, res) => {
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

module.exports = router;
