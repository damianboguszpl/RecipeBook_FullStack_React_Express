module.exports = (sequelize, DataTypes) => {
    const Recipes = sequelize.define("Recipes", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        recipe_category_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        recipe_description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        prepare_time: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cook_time: {
            type: DataTypes.STRING,
            allowNull: false
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        publishing_status: {
            type: DataTypes.STRING,
            allowNull: false
        },
        visibility: {
            type: DataTypes.STRING,
            allowNull: false
        },
        marked: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }

    });

    Recipes.associate = (models) => {
        Recipes.hasMany(models.Comments, {
            onDelete:"cascade",
        });

        Recipes.hasMany(models.Likes, {
            onDelete:"cascade",
        });

        Recipes.hasMany(models.Ingredients, {
            onDelete:"cascade",
        });
    }

    return Recipes
}