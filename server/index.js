import express from "express";
import sequelize from "./config/database.js";
import User from "./models/User.js";
import Category from "./models/Category.js";
import Product from "./models/Product.js";
import userRoutes from "./routes/userRoutes.js";
const app = express();
app.use(express.json());
const port = 3000;

sequelize.authenticate()
    .then(() => console.log('Database connected perfectly.'))
    .catch(err => console.error('Database connection failed:', err))


sequelize.sync({ alter: true })
    .then(() => {
        console.log('Database synced successfully,');
    })
    .catch((err) => {
        console.error('Error syncing database:', err);
    });

app.get('/', (req, res) => {
    res.send("Sending succeeded");
});

app.get('/api/status', (req, res) => {
    res.json({status: "healthy", message: "Healthy"});
})

app.use('/api/users', userRoutes);


app.listen(port, () => {
    console.log(`Velomarket listening on port ${port}`);
});

// User --> Product relationship
User.hasMany(Product, { foreignkey: "user_id", onDelete: "CASCADE" });
Product.belongsTo(User, { foreignkey: "user_id" });

// Category --> Product relationship 
Category.hasMany(Product, { foreignkey: "category_id", onDelete: "CASCADE"});
Product.belongsTo(Category, { foreignkey: "category_id" });

