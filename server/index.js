const express = require('express')
const dovenv = require('dotenv')
const cors = require('cors')
const connectMongo = require('./connection')
const authRouter = require('./routes/auth.router')
const cookieParser = require('cookie-parser');


dovenv.config()
const PORT = process.env.PORT || 3000
const app = express()


app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173', // Allow frontend URL
    credentials: true // Allow cookies to be sent
}));
app.use(cookieParser());

// app.use('/', staticRouter)
app.use('/api/auth/', authRouter)


connectMongo('mongodb://localhost:27017/Taskk')

app.listen(PORT, (err) => {
    if (err) console.log(err);
    else console.log(`Server running : http://localhost:${PORT}`);
})