import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js';
import userRoutes from './routes/userRoute.js'
import  taskJobRoute  from './routes/taskJobRoute.js'
dotenv.config();
const app = express();
const allowedOrigins = ["http://localhost:5000" ,"http://localhost:5173", 'http://192.168.0.108:5000', "http://192.168.0.108:5173"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);


app.use(express.json());
const port = process.env.PORT || 4000

connectDB()
app.use("/api", userRoutes);
app.use("/api", taskJobRoute)

app.get("/", (req, res) => {
  res.send("Backend running 🚀");
  console.log("backend is working perfectly")
});

app.listen(port, () => {
  console.log("Server running on port 5000");
});