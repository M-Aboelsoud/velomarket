import express from "express";
import sequelize from "./config/database.js";
import User from "./models/User.js";
import Category from "./models/Category.js";
import Product from "./models/Product.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";

const app = express();
app.use(express.json());
const port = 3000;


// Authenticate Database
sequelize.authenticate()
    .then(() => console.log('Database connected perfectly.'))
    .catch(err => console.error('Database connection failed:', err))


// User --> Product relationship
User.hasMany(Product, { foreignKey: "user_id", onDelete: "CASCADE" });
Product.belongsTo(User, { foreignKey: "user_id" });

// Category --> Product relationship 
Category.hasMany(Product, { foreignKey: "category_id", onDelete: "CASCADE"});
Product.belongsTo(Category, { foreignKey: "category_id" });

// Sync Database
sequelize.sync({ alter: true })
    .then(() => {
        console.log('Database synced successfully,');
    })
    .catch((err) => {
        console.error('Error syncing database:', err);
    });

// Routes
app.get('/', (req, res) => {
    res.send("Sending succeeded");
});

app.get('/api/status', (req, res) => {
    res.json({status: "healthy", message: "Healthy"});
})

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

// Turn on server
app.listen(port, () => {
    console.log(`Velomarket listening on port ${port}`);
});

