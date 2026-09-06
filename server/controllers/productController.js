import Product from '../models/Product.js';
import User from '../models/User.js';
import Category from '../models/Category.js';


export async function createProduct (req, res) {
   
    try {

    const {title, description, tags, video_url, category_id} = req.body;

    // Extract the user_id from the authenticated user object
    const user_id = req.user.id;

    // Pass the product data to the product model for creation
    const product = await Product.create({
        title, 
        description, 
        tags,
        video_url,
        category_id,
        user_id, 
    });

    // Success Response
    res.status(201).json(product);
    // Error Response
    } catch (error) {
        console.error(error);
        res.status(500).json( {error: error.message} );
    }

};

export async function getAllProducts (req, res) {
    try {
        const products = await Product.findAll({
            where: {status: 'approved'},
            include: [
                { model: User, attributes: ['id', 'first_name', 'last_name']},
                { model: Category, attributes: ['id', 'name', 'slug' ]}
            ]
        });
        return res.status(200).json(products);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
};

export async function updateProductStatus (req, res) {
    try {
        const { id } = req.params;
        const { status } = req.body;

        // Find the product by ID
        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({ error: "Product not found"});
        }

        // Update product status
        product.status = status;
        await product.save();
        return res.status(200).json({ message: "Product status updated successfully", product});

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
};
}
