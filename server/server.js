import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import connectDB from "./mongoDB/connect.js";
import authRouter from "./routes/authRoutes.js";
import categoryRouter from "./routes/categoryRoutes.js";
import productRouter from "./routes/productRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
// import path from "path";
// import { fileURLToPath } from "url";

const app = express();

dotenv.config();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// middleware
app.use(express.json({ limit: "30mb", extended: true }));
// app.use(express.static(path.join(__dirname, "./client/build")));
app.use(cors());

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });

app.use("/user", authRouter);
app.use("/category", categoryRouter);
app.use("/product", productRouter);
app.use("/order", orderRouter);

const PORT = 8080;

app.get("/", (req, res) => {
  res.send("<h1>Welcome to ecommerce app</h1>");
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(PORT, () => {
      console.log(`App is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
