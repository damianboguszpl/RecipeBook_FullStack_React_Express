module.exports = (sequelize, DataTypes) => {
    const Ingredients = sequelize.define("Ingredients", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }

    })


    return Ingredients
}