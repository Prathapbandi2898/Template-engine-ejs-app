import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import {
  createProduct,
  readProducts,
  readProductById,
  updateProductForm,
  updateProduct,
  deleteProduct,
  createProductForm,
} from "./controllers/productController.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const mongoUri = process.env.MONGO_URI || process.env.MONGO_FULL_URI;
if (mongoUri) {
  try {
    await connectDB(mongoUri, process.env.DB_NAME || "library_db");
  } catch (err) {
    console.error("MongoDB connection initialization failed:", err.message);
  }
}

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 9500;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

//CRUD operations for products
// Route to render the product form for adding a new product
app.get("/product-form", createProductForm);
// Route to handle adding a new product
app.post("/add-product", createProduct);

// Route to display all products
app.get("/", readProducts);
// Route to display a single product
app.get("/product/:id", readProductById);

// Route to render the product form for editing an existing product
app.get("/product-form/:id", updateProductForm);
// Route to handle updating an existing product
app.post("/add-product/:id", updateProduct);

// Route to handle deleting a product
app.get("/delete-product/:id", deleteProduct);

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
}

export default app;
