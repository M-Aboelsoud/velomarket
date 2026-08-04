// Load the environemnt & its configuration 
import { configDotenv } from 'dotenv';
import { Sequelize } from 'sequelize';

configDotenv();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD ,{
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
});


export default sequelize;
