import express from "express";
import cors from "cors";
import { db } from "./database/db.js";
import {userRouter} from "./routes/index.js";
import { productRouter } from "./routes/index.js";
import { cartRouter } from "./routes/index.js";
import { authRouter } from "./routes/index.js";
import dotenv from "dotenv";
import { authenticateToken } from "./middleware/token-middleware.js";




dotenv.config();

const app = express();


const port = process.env.PORT || 5000;

app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}));
app.use(express.json());


app.use((req, res, next) => {
  const publicRoutes = [
    '/api/auth/create', 
    '/api/auth/login',   
    '/api/auth/init',   
  ];

  if (publicRoutes.includes(req.path)) {
    return next(); 
  }

  
  authenticateToken(req, res, next);
});

app.use("/api/user",userRouter);
app.use("/api/auth",authRouter);
app.use("/api/product",productRouter);
app.use("/api/cart", cartRouter);


app.listen(port, () =>{
  console.log(`Project running on port ${port}`);
  db();
});
