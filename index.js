const express = require('express');
const app = express();
const cors = require("cors")
const path = require('path');
// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Add a route to serve images from /foodpictures
app.use('/foodpicture', express.static(path.join(__dirname, 'public', 'foodpicture')));

app.use(express.json())
app.use(cors())
const db = require("./models");

const port = process.env.PORT || 3001;

//Router
const authRouter = require('./routes/authRouter');
app.use("/auth", authRouter);
const userRouter = require('./routes/User');
app.use("/users", userRouter);
const foodDetailRouter = require('./routes/FoodDetail');
app.use("/FoodDetail", foodDetailRouter);
const foodRouter = require('./routes/Food');
app.use("/Food", foodRouter);
const postRouter = require("./routes/Posts");
app.use("/posts", postRouter);
const foodTypeRouter = require('./routes/FoodIngre');
app.use("/FoodIngre", foodTypeRouter);
const trackFoodRouter = require('./routes/TrackFood');
app.use("/track-food", trackFoodRouter)
const foodIntakeRouter = require('./routes/FoodIntake')
app.use('/intake', foodIntakeRouter)

db.sequelize.sync().then(() => {
    app.listen(port, () => {
    console.log('Hello') 
})

})

