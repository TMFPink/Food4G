module.exports = (sequelize, DataTypes) => {
    const FoodIngredients = sequelize.define("FoodIngredients", {
        FoodID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Ingredient: {
            type: DataTypes.STRING,
            allowNull: false
        },
        IngreAmount: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: false // Exclude timestamps
    });
    FoodIngredients.associate = (models) => {
        FoodIngredients.belongsTo(models.Food, {
            foreignKey: 'FoodID'
        });
    };
    
    return FoodIngredients;
};
