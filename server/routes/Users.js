const express = require('express')
const router = express.Router()
const { Users } = require("../models")
const bcrypt = require("bcrypt")
const { validateToken} = require("../middlewares/AuthMiddleware")
const {sign} = require('jsonwebtoken')

router.post("/", async (req, res) => {
    const {username, password} = req.body;
    bcrypt.hash(password,10).then((hash) => {
        Users.create({
            username:username,
            password:hash
        })
    })
    res.json("success");
});

router.post("/login",async(req,res) => {
    const {username, password} = req.body;

    const user = await Users.findOne({where: {username: username}});

    if(!user) {
        res.json({error: "Nie istnieje użytkownik o podanej nazwie!"});
    }
    else {
        bcrypt.compare(password, user.password).then((match) => {
            if(!match) {
                res.json({error:"Niepoprawne hasło!"});
            }
            else {
                const accessToken = sign({username: user.username, id: user.id}, "34qwereawdq4we3w3eqf7y6uhesecerttoken");
                res.json({token: accessToken, username: username, id: user.id});
            }
    
        });
    }
    
});

router.get("/auth",validateToken, (req, res) => {
    res.json(req.user)
    // console.log("asdas")
})

router.get("/info/:id", async (req, res) => {
    const id=req.params.id
    const info = await Users.findByPk(id, {
        attributes: {exclude: ['password']}
    });
    
    res.json(info)
});

router.get("/username/:username", async (req, res) => {
    const username = req.params.username
    const user = await Users.findOne({where: {username: username}});
    res.json(user);
});


module.exports = router