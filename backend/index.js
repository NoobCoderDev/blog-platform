import express from 'express';
import dbConnection from './DB/dbConnection.js';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';

import userRouter from './Routes/user.router.js';

dotenv.config();
const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

const DATABASE_URL = process.env.DB_URL;

// Database Connection
dbConnection(DATABASE_URL);

app.use('/user',userRouter);

app.listen(port,(req,res)=>{
    console.log(`Server started on http://localhost:${port}`);
})