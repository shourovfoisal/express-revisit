import express from "express";

export const router = express.Router();

router.get("/", (req, res) => {
  res.json("User List");
});

router.get("/new", (req, res) => {
  res.json("User Create");
});
