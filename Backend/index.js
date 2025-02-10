import express from "express";
import bodyParser from "body-parser";
import { db } from "./database/db.js";
import {userRouter} from "./routes/index.js";
import { productRouter } from "./routes/index.js";
import { cartRouter } from "./routes/index.js";


import dotenv from "dotenv";


dotenv.config();

const app = express();


const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(express.json());


app.listen(port, () =>{
  console.log(`Project running on port ${port}`);
  db();
});
