import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Product = sequelize.define(

    "Product",
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        tags: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        status: {
            type: DataTypes.ENUM('pending', 'approved', 'rejected'), 
            defaultValue: 'pending',
        },
        video_url: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    }

);

export default Product;