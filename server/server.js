import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from "@clerk/express";
import clerkwebhooks from "./controllers/clerkWebhooks.js";

dotenv.config();
connectDB(); // Connect to MongoDB

const app = express();
app.use(cors()); // Enable Cross-Origin Resource Sharing
// Middleware
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

// Routes
app.use("/api/clerk", clerkwebhooks);

app.get("/", (req, res) => res.send("API is working"));

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
