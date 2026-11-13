import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import storeRoutes from './routes/store.routes.js';
import { errorHandler } from './middlewares/error.middleware.js';
dotenv.config()
const PORT = process.env.PORT;

const app = express();
app.use(express.json())
app.use(cors())

app.get('/', (req,res) => {
    res.json('servidor corriendo')
})
app.use('/api/store',storeRoutes)
app.use(errorHandler)

app.listen(PORT, async() => {
    console.log(`servidor ejecutandose en http://localhost:${PORT}`)
})