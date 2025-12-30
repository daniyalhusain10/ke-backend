import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import userRoutes from './routes/userRoute.js';
import taskJobRoute from './routes/taskJobRoute.js';

dotenv.config();
const app = express();

// Allowed origins for production and local dev
const allowedOrigins = [
  "https://ke-backend.vercel.app",
  "http://localhost:3000", // add local frontend if testing
];

// CORS middleware
app.use(
  cors({
    origin: (origin, callback) => {
      // If no origin (like Postman) or origin is allowed
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
