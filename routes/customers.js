let express = require("express");
const router = express.Router();
const { Customer, ValidateCustomer } = require("../models/customer");

router.get("/", async (req, res) => {
  const customer = await Customer.find().sort("name");
  res.send(customer);
});

router.post("/", async (req, res) => {
  const { error } = ValidateCustomer(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let customer = new Customer({
    name: req.body.name,
    isVip: req.body.isVip,
    phone: req.body.phone,
  });

  customer = await customer.save();

  res.status(200).send(customer);
});

router.get("/:id", async (req, res) => {
  let customer = await Customer.findById(req.params.id);
  if (!customer) {
    return res.status(404).send("bu aydi bilan kiob topilmadi");
  }

  res.send(customer);
});

router.put("/:id", async (req, res) => {
  const { error } = ValidateCustomer(req.body);
  if (error) {
    return res.send("Update vaqtida xaotolik:", error.details[0].message);
  }

  let customer = await Customer.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { isVip: req.body.isVip },
    { phone: req.body.phone },
    { new: true }
  );

  if (!customer) {
    return res.send("Update vaqtida Id ga mos book topilmadi");
  }

  res.send(customer);
});

router.delete("/:id", async (req, res) => {
  const customer = await Customer.findByIdAndDelete(req.params.id);
  if (!customer) {
    return res.status(404).send("Delete vaqtida bunga mos id topilmadi");
  }

  res.send(customer);
});

module.exports = router;
