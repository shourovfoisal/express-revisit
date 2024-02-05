import express from "express";
import { router as userRouter } from "./routes/users.js";

const app = express();

app.listen(3000);

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", { name: "Shourov" });
});

app.use("/users", userRouter);
