import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { logger } from "./middlewares/logger";
import wishlistRouter from "./routers/WishlistRouter";
import productRouter from "./routers/ProductRouter";
import userRouter from "./routers/userRouter";
import orderRouter from "./routers/OrderRouter";
import promotionRouter from "./routers/promotionRouter";
import path from "path";
import promotionProductsRouter from "./routers/promotionProductsRouter";
import categoryRouter from "./routers/categoryRouter";
import contactRoutes from "./routers/contactRoutes";
import cartRouter from "./routers/CartRouter";


const app = express();

app.use(function (req: express.Request, res: express.Response, next: express.NextFunction) {
	const allowedOrigins = [
		"http://localhost:8080",
		"http://127.0.0.1:8080",
		"http://localhost:5500",
		"http://127.0.0.1:5500",
	];
	const origin = req.headers.origin;
	if (origin && allowedOrigins.includes(origin)) {
		res.setHeader("Access-Control-Allow-Origin", origin);
	}

	res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type, content-type, X-Requested-With");
	res.setHeader("Access-Control-Allow-Credentials", "true");

	if (req.method === "OPTIONS") {
		return res.sendStatus(200);
	}
	next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

// Routers
app.use("/api/user", userRouter);
app.use("/api/products", productRouter);
app.use("/api/wishlist", wishlistRouter);
app.use("/api/orders", orderRouter);
app.use("/api/promotion", promotionRouter);
app.use("/api/promotion-products", promotionProductsRouter);
app.use("/api/orders", orderRouter);
app.use("/api/contact", contactRoutes);
app.use("/api/categories", categoryRouter);
app.use("/api/cart", cartRouter);


// simple route
app.get("/", (req, res) => {
	res.status(200).json({ Reply: "Hello world!" });
});

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Simple test route
app.get("/", (req, res) => {
	res.status(200).json({ message: "Server is running!" });
});

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
