import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import userRoutes from './routes/userRoute.js';
import taskJobRoute from './routes/taskJobRoute.js';

dotenv.config();
const app = express();

const allowedOrigin = "https://ke-backend.vercel.app";

app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

// Body parser
app.use(express.json());

// Connect to database
connectDB();

// Routes
app.use("/api", userRoutes);
app.use("/api", taskJobRoute);

// Test route
app.get("/", (req, res) => {
  res.send("Backend running 🚀");
  console.log("Backend is working perfectly");
});

// Port
const port = process.env.PORT || 5000; // default 5000 if PORT not set

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
