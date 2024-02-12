import express, { Application, Request, Response } from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import authRouter from "./modules/auth/auth.router";
import messageRouter from "./modules/message/message.router";
import userRouter from "./modules/user/user.router";
import connectToDB from "./DB/connection";
import { globalErrorHandling } from "./utils/errorHandling";


import { app, server } from "./socket/socket";
dotenv.config();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api/message", messageRouter);
app.use("/api/user", userRouter);


app.use(globalErrorHandling);
connectToDB()

server.listen(port, () => console.log(`app is listening on ${port}`));
