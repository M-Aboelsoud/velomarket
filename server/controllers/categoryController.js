import Category  from '../models/Category.js';


// Fetch all categories from the database and return them as a JSON response
 export async function getAllCategories(req, res) {
    try {
        const categories = await Category.findAll();
        return res.status(201).json(categories);

    } catch (error) {
        res.status(500).json({ error: error.message});
    }
};

// Create a new category in the database based on the request body and return the created category as a JSON response
export async function createCategory(req, res) {
    try {
        const { name, description, slug } = req.body;
        const category = await Category.create({
            name, 
            description, 
            slug,
        });
        return res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }
};