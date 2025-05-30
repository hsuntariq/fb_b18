import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import { userRouter } from "./routes/userRoutes.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";
import { connectDB } from "./config/connect.js";
import cors from "cors";
import { postRouter } from "./routes/postRoutes.js";
import { Server } from 'socket.io'
import http from 'http'

dotenv.config();
const app = express();
app.use(cors());


const my_server = http.createServer(app)


const io = new Server(my_server, {
  cors: {
    origin: '*',
    method: '*'
  }
})


io.on('connection', (socket) => {
  console.log(`Socket connected on id:${socket.id.cyan}`)


  socket.on('sent_message', (data) => {
    console.log(data)
    socket.broadcast.emit('received_message', data)
  })



})




connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users/", userRouter);
app.use("/api/posts/", postRouter);

app.use(errorHandler);

my_server.listen(process.env.PORT, () =>
  console.log(`Server started on port:${process.env.PORT.america}`)
);
