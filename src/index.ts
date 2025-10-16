import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express from "express";
import prisma from "./prisma.ts";
import type{ Application, Request, Response, NextFunction } from "express"

const PORT = process.env.PORT;
//define app server
const app: Application = express();
//define app basic middleware
app.use(cors()); //allow other domain to access
app.use(express.json()); //for receive req body

//define app main router
app.get("/", (req: Request, res: Response) => {
  res.status(200).send("<h1>ORM API</h1>");
});

app.post("/reviews", async (req: Request, res: Response) => {
  try {
    const review = await prisma.review.create({
      data: req.body,
    });
    res.status(200).send({
      message: "Review has been Added",
      result: review,
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => console.info("server is listening on port", PORT));
