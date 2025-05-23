const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectMongo = require('./connection');
const authRouter = require('./routes/auth.router');
const staticRouter = require('./routes/static.router');
const userRouter = require('./routes/user.router');
const cookieParser = require('cookie-parser');
const path = require('path');
const taskRouter = require('./routes/task.router')

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({
    origin: true,
    credentials: true
}));

app.use(cookieParser());

app.use('/', staticRouter);
app.use('/user', userRouter);
app.use('/api/auth/', authRouter);
app.use("/api/tasks/", taskRouter);


(async()=>{
    await connectMongo(process.env.MONGODB_URI);
})();

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
