module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
        Name:{
            type: DataTypes.STRING,
            allowNULL: false
        },
        Phone:{
            type: DataTypes.STRING,
            allowNULL: false
        },
        Mail:{
            type: DataTypes.STRING,
            allowNULL: false
        },
        DOB:{
            type: DataTypes.DATE,
            allowNULL: true
        },
        Aim:{
            type: DataTypes.STRING,
            allowNULL: true
        },
        Weight:{
            type: DataTypes.FLOAT,
            allowNULL: true
        },
        Height:{
            type: DataTypes.FLOAT,
            allowNULL: true
        },
        Password:{
            type: DataTypes.STRING,
            allowNULL: false
        },
    },{
        timestamps: false
    })
    return Users;
    
}
