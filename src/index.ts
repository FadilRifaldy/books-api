import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express from "express";

import type { Application, Request, Response } from "express";
import prisma from "./prisma.ts";

const PORT = process.env.PORT;

const app: Application = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("<h1>BOOK API</h1>");
});

app.post("/book/create", async (req, res) => {
  try {
    const book = await prisma.book.create({
      data: req.body,
    });

    res.status(201).send({
      message: "Book Has Been Added!",
      book: book,
    });
  } catch (error) {
    console.log(error);
  }
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

//get book with review
app.get("/book/:id", async (req: Request, res: Response) => {
  try {
    const getbook = await prisma.book.findUnique({
      where: { id: parseInt(req.params.id) },
      include: {
        reviews: true,
      },
    });
    res.status(200).send(getbook);
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => console.info("server is listening on port", PORT));
