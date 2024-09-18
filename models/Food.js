module.exports = (sequelize, DataTypes) => {
    const Food = sequelize.define("Food", {
        FoodName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Calories: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        Protein: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        Fat: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        Carb: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        Instruction: {
            type: DataTypes.STRING,
            allowNull: true
        },
        
        Image: {
            type: DataTypes.BLOB, // Column to store the image data
            allowNull: true
        },
        
    }, {
        timestamps: false // Exclude timestamps
    });

    Food.associate = (models) => {
        Food.hasMany(models.FoodIngredients, {
            foreignKey: 'FoodID'
        });
    };
    Food.associate = (models) => {
        Food.belongsTo(models.FoodType, {
            foreignKey: 'FoodTypeID'
        });
    }

    
    return Food;
};