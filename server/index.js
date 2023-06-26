const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

const db = require('./models')

//Routers
const recipesRouter = require('./routes/Recipes');
app.use("/recipes", recipesRouter);
const categoriesRouter = require('./routes/Categories');
app.use("/categories", categoriesRouter);
const commentsRouter = require('./routes/Comments');
app.use("/comments", commentsRouter);
const usersRouter = require('./routes/Users');
app.use("/auth", usersRouter);
const likesRouter = require('./routes/Likes');
app.use("/likes", likesRouter);
const ingredientsRouter = require('./routes/Ingredients');
app.use("/ingredients", ingredientsRouter);

db.sequelize.sync().then( () => {
    app.listen(3001,() => {
        console.log("Server is running on port 3001");
    });
});




