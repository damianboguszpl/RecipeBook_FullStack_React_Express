const express = require('express')
const router = express.Router()
const { Recipes, Likes } = require("../models")

const { validateToken } = require("../middlewares/AuthMiddleware");
const { response } = require('express');

router.get("/", validateToken, async (req, res) => {
    const listOfRecipes = await Recipes.findAll({ include: [Likes] });

    const likedRecipes = await Likes.findAll({ where: { UserId: req.user.id } })

    res.json({ listOfRecipes: listOfRecipes, likedRecipes: likedRecipes });
});

router.get("/id/:id", async (req, res) => {
    const id = req.params.id
    const recipe = await Recipes.findByPk(id);
    res.json(recipe);
});

router.get("/userid/:id", async (req, res) => {
    const id = req.params.id
    const listOfRecipes = await Recipes.findAll({ 
        where: { UserId: id }, 
        include: [Likes] 
    });
    res.json(listOfRecipes);
});

router.post("/", validateToken, async (req, res) => {
    const recipe = req.body;
    recipe.username = req.user.username
    recipe.UserId = req.user.id
    console.log("in post: ")

    Recipes.create(recipe)
        .then((event) => {
            response.data = event
            response.id = event.id
            res.send(response);
        })
        .catch((err) => {
            response.msg = err;
            response.added = 0;
            res.send(response);
        });

});


router.delete(`/:recipeId`, validateToken, async (req, res) => {
    const recipeId = req.params.recipeId;
    await Recipes.destroy({
        where: {
            id: recipeId
        }
    })
    res.json("DELETED SUCCESSFULLY");
})

router.put(`/editrecipe/:recipeId`, validateToken, async (req, res) => {
    const recipeId = req.params.recipeId;
    
    const updated = await Recipes.update(
        { 
            name: req.body.name,
            recipe_category_id: req.body.recipe_category_id,
            recipe_description: req.body.recipe_description,
            prepare_time: req.body.prepare_time,
            cook_time: req.body.cook_time,
            rating: req.body.rating,
            publishing_status: req.body.publishing_status,
            visibility: req.body.visibility, 
            marked: req.body.marked
        }, 
        {
        where: {
            id: recipeId
        }
        });

    res.json("UPDATED SUCCESSFULLY");
})

module.exports = router