module.exports = (sequelize, DataTypes) => {
    const FoodType = sequelize.define("FoodType", {
        TypeName: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: false // Exclude timestamps
    });

    FoodType.associate = (models) => {
        FoodType.hasMany(models.Food, {
            foreignKey: 'FoodTypeID'
        });
    };

    return FoodType;
};

