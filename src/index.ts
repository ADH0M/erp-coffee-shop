import express, { type Request, type Response } from "express";
import { pool } from "./utils/db.js";
import cors from "cors";
import morgan from "morgan";
import { errorHandler } from "./middleware/errorHandler.js";
import producerRoute from "./routes/producers.route.js";
import retailProductRoute from "./routes/retailProduct.route.js";
import beverages from "./routes/beverages.route.js";
import orders from "./routes/order.route.js";
import orderItems from "./routes/orderItems.route.js";

const app = express();
const PORT = 3001;

app.use(
  cors({
    origin: "http://localhost:3000",
  }),
);

app.use(morgan("dev"));
app.set("trust proxy", true);
app.use(express.json());

app.get("/", async (_req: Request, res: Response) => {
  const result = await pool.query("SELECT * from hossam.orders");

  res.status(200).json({
    message: result.rows,
  });
});

// --------------- routes -----------------------------
app.use("/producer", producerRoute);
app.use("/retailProduct", retailProductRoute);
app.use("/beverages", beverages);
app.use("/orders", orders);
app.use("/orderItems", orderItems);

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
