import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Category = sequelize.define(
    "Category",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        slug: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    }
);

export default Category;
