import { Sequelize } from "sequelize";

process.loadEnvFile(); //Añadir esta linea
const db = new Sequelize(process.env.DATABASE_URL);

export default db

