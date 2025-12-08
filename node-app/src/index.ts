import express from "express";
import cors from "cors";
import convertRoutes from "./routes/convert";
import { connectDB } from "./db";

const app = express();
app.use(cors());
app.use(express.json());

connectDB();


// Routes
app.use("/", convertRoutes);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
