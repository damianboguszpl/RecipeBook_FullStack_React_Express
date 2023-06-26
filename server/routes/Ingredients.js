const express = require('express')
const router = express.Router()
const { Ingredients } = require("../models")
const { validateToken } = require('../middlewares/AuthMiddleware')

router.get("/", async (req, res) => {
    const listOfIngredients = await Ingredients.findAll();
    res.json(Ingredients);
});

router.get("/id/:id", async (req, res) => {
    const id = req.params.id
    const ingredient = await Ingredients.findByPk(id);
    res.json(ingredient);
});

router.delete(`/recipeid/:recipeId`, validateToken, async (req, res) => {
    const recipeId = req.params.recipeId;
    await Ingredients.destroy({
        where: {
            RecipeId: recipeId
        }
    })
    res.json("DELETED SUCCESSFULLY");
})

router.get("/recipeid/:id", async (req, res) => {
    const id = req.params.id
    const listOfIngredients = await Ingredients.findAll({ 
        where: { RecipeId: id }
    });
    res.json(listOfIngredients);
});

router.post("/", validateToken, async (req, res) => {
    const ingredient = req.body;
    await Ingredients.create(ingredient);
    res.json(ingredient);
});


module.exports = router;