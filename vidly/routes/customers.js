const mongoose = require("mongoose");
const express = require("express");
const { Customer, validate } = require("../models/customer");

const router = express.Router();

router.use(express.json());

module.exports = function(req, res, next) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    res.status(404).send("Invalid ID...");
  next();
};

router.get("/", async (req, res) => {
  const customer = await Customer.find().sort("name");
  res.send(customer);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) res.status(400).send(error.details[0].message);

  let customer = new Customer({
    name: req.body.name,
    isGold: req.body.isGold,
    phone: req.body.phone
  });

  customer = await customer.save();
  res.send(customer);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) res.status(400).send(error.details[0].message);

  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    {
      name: "IamTestPut",
      isGold: false,
      phone: "4839203943"
    },
    { new: true }
  );
  if (!customer) res.status(404).send("Customer not found...");

  res.send(customer);
});

router.delete("/:id", async (req, res) => {
  const customer = await Customer.findByIdAndDelete(req.params.id);
  if (!customer) res.status(404).send("Customer not found...");

  res.send(customer);
});

router.get("/:id", async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer) res.status(404).send("Customer not found...");

  res.send(customer);
});

module.exports = router;
