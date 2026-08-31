import Product from '../models/Product.js';


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
