module.exports = (sequelize, DataTypes) => {
    const TrackedFood = sequelize.define("TrackedFood", {
        UserID: {
            type: DataTypes.INTEGER,
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
        DateTracked: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    }, {
        timestamps: false // Exclude timestamps
    });

    TrackedFood.associate = (models) => {
        TrackedFood.belongsTo(models.Food, {
            foreignKey: 'FoodID'
        });
    };

    return TrackedFood;
};