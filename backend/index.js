import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import { userRouter } from "./routes/userRoutes.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";
import { connectDB } from "./config/connect.js";
import cors from "cors";
import { postRouter } from "./routes/postRoutes.js";

dotenv.config();
const app = express();
app.use(cors());

connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users/", userRouter);
app.use("/api/posts/", postRouter);

app.use(errorHandler);

app.listen(process.env.PORT, () =>
  console.log(`Server started on port:${process.env.PORT.america}`)
);
