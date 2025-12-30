import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import userRoutes from './routes/userRoute.js';
import taskJobRoute from './routes/taskJobRoute.js';

dotenv.config();
const app = express();
import cors from 'cors';

app.use(
  cors({
    origin: (origin, callback) => {
      // origin undefined ho sakta hai (Postman / curl / local files)
      if (!origin) {
        callback(null, true); // allow
      } else {
        // only allow specific frontend origins
        const allowedOrigins = [
          "https://ke-backend.vercel.app",
          "http://localhost:3000"
        ];
        if (allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          console.log("Blocked CORS:", origin);
          callback(new Error("Not allowed by CORS"));
        }
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"]
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
