
module.exports = (sequelize, DataTypes) => {
    const FoodIntake = sequelize.define("FoodIntake", {
        userId:{
            type: DataTypes.STRING,
            allowNULL: false
        },
        Calories:{
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
        
    }, {
        timestamps: false 
    });

    return FoodIntake;
};

