import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function createUser(req, res) {

    try {
    // Extract user data from request
    const {first_name, last_name, email, password} = req.body;

    // Password hashing logic 
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert new data into database
    const user = await User.create({
        first_name,
        last_name,
        email,
        password: hashedPassword,
    });

    res.status(201).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: " Failed to create user"});
    }
};

export async function loginUser(req, res) {
  const {email, password: plainTextPassword} = req.body;
  try {
    // Assign the user's email to the user const
    const user = await User.findOne({where: {email} });

    // if the user does not exist
    if (!user) {
        return res.status(401).json({
            status: "failed",
            message: "Invalid email or password. Please try again.",
        });
    }
    // if user exists 
    // validate password
    const isPasswordValid = await bcrypt.compare(plainTextPassword, user.password);

    // if not valid, return unauthorised response
    if (!isPasswordValid) {
        return res.status(401).json({
            stats: "failed",
            message: "Invalid email or password. Please try again.",
        });
    }
    // return user info except password
    const { password, ...user_data} = user.toJSON();

    // Generate JWT token
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res.status(200).json({
        status: "success",
        data: {
            user: user_data,
            token: token,
        },
        message: "You have successfully logged in.",
    })
  }
  catch (err) {
    console.error(err);
    res.status(500).json({
        status: "error",
        message: "Internal server error",
    });

  } 
};
