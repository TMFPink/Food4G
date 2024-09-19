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
const userRouter = require('./routes/User');
app.use("/auth", userRouter);
const foodDetailRouter = require('./routes/FoodDetail');
app.use("/FoodDetail", foodDetailRouter);
const foodRouter = require('./routes/Food');
app.use("/Food", foodRouter);
const postRouter = require("./routes/Posts");
app.use("/posts", postRouter);

const foodTypeRouter = require('./routes/FoodIngre');
app.use("/FoodIngre", foodTypeRouter);

db.sequelize.sync().then(() => {
    app.listen(port, () => {
    console.log('Hello') 
})

})

