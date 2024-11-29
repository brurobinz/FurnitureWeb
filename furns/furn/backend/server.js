import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRouter.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import commentRoutes from "./routes/commentRoute.js";
import helpRouter from "./routes/helpRouter.js";
import saleRouter from "./routes/SaleRoute.js"; 
import rateRouter from "./routes/rateRoute.js";
import "dotenv/config";

// Config application
const app = express();
const port = 4000;

// Middleware
app.use(express.json());
app.use(cors());

// DB connection
connectDB()
    .then(() => {
        console.log("Database connected successfully");
    })
    .catch((error) => {
        console.error("Database connection error:", error);
        process.exit(1);
    });

// API endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads")); 
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/comments", commentRoutes);
app.use("/api/help", helpRouter);
app.use("/api/sale", saleRouter); 
app.use("/api/posts",rateRouter)

// Root endpoint
app.get("/", (req, res) => {
    res.send("API working");
});



// Start the server
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
