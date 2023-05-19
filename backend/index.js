import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRouters from "./routes/userRouters.js";

const app = express();
app.use(express.json());

dotenv.config();

connectDB();

//Routing

app.use("/api/users", userRouters);

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`servidor corriendo el puerto ${PORT}`);
});
