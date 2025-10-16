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
  res.status(200).send("<h1>BLOG API</h1>");
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

app.listen(PORT, () => {
  console.log("API RUNNING", PORT);
});
