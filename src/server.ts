import express from 'express'
import colors from 'colors'
import router from './router';
import db from './config/db';

// Connect do database
const connectDB = async () => {
    try {
        await db.authenticate()
        db.sync()
        // console.log(colors.magenta("Successfully connected to DB !!!"))
    } catch (error) {
        console.log(error)
        console.log(colors.red.bold("There was an error when connecting to DB"))
    }
}

connectDB()

const server = express();

// Read form data
server.use(express.json())

server.use('/api/products', router)

server.get('/api', (req, res) => {
    res.json({msg: "Desde API"})
})

export default server