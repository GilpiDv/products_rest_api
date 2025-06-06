import { Sequelize } from "sequelize-typescript";

process.loadEnvFile(); //Añadir esta linea
const db = new Sequelize(process.env.DATABASE_URL!, {
    models: [__dirname + '/../models/**/*.ts']
});

export default db

