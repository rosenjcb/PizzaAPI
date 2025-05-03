"use strict";

const router = require("express").Router();

const pizza = require("../controllers/pizza");
const { isAdmin } = require("../middlewares/permissions");

const upload = require("../middlewares/upload");
const Pizza = require("../models/pizza");

router
  .route("/search")
  .get(async (req, res) => {
    try {
      const pizzas = await Pizza.find({});
      const validPizzas = pizzas
        .filter((pizza) => {
          for(let pizzaTopping of pizza.toppingIds) {
            if (req.query.toppingsId.includes(pizzaTopping)) {
              return pizza;
            }
          }
        })
        .filter((pizza) => {
          if (pizza.price <= req.query.maxPrice) {
            return pizza;
          }
        })
      res.json(validPizzas);
    } catch (error) {
      res.status(500).json(error);
    }
  });

router
  .route("/")
  .get(pizza.list)
  .post(isAdmin, upload.array("images"), pizza.create);

router
  .route("/:id")
  .get(pizza.read)
  .put(isAdmin, upload.array("images"), pizza.update)
  .patch(isAdmin, upload.array("images"), pizza.update)
  .delete(isAdmin, pizza.delete);

module.exports = router;
