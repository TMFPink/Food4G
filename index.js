const express = require('express');
const app = express();
const cors = require("cors")
const path = require('path');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const db = require("./models");
// Add a route to serve images from /foodpictures
app.use('/foodpicture', express.static(path.join(__dirname, 'public', 'foodpicture')));
const port = process.env.PORT || 3001;

// Swagger setup
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Food API',
            version: '1.0.0',
            description: 'API documentation for the Food application',
        },
        servers: [
            {
                url: 'http://localhost:3001',
            },
        ],
    },
    apis: ['./routes/*.js'], // Path to the API docs
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Your existing routes
const authRouter = require('./routes/authRouter');
app.use("/auth", authRouter);
const userRouter = require('./routes/User');
app.use("/users", userRouter);
const foodDetailRouter = require('./routes/FoodDetail');
app.use("/FoodDetail", foodDetailRouter);
const foodRouter = require('./routes/Food');
app.use("/food", foodRouter);
const postRouter = require("./routes/Posts");
app.use("/posts", postRouter);
const foodTypeRouter = require('./routes/FoodIngre');
app.use("/FoodIngre", foodTypeRouter);
const trackFoodRouter = require('./routes/TrackFood');
app.use("/track-food", trackFoodRouter);
const foodIntakeRouter = require('./routes/FoodIntake');
app.use('/intake', foodIntakeRouter);

// Sync database and start server
db.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log('Server is running on port ' + port);
    });
});

