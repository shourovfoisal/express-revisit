import express from "express";

export const router = express.Router();

router.get("/", (req, res) => {
  res.json("User List");
});

router.post("/", (req, res) => {
  res.json("New User");
});

router.get("/sortedByAge", (req, res) => {
  res.send("User sorted by age");
});

router
  .route("/:id")
  .get((req, res) => {
    res.json(req.user);
  })
  .put((req, res) => {
    res.json({ userIdToUpdate: parseInt(req.params.id) });
  })
  .delete((req, res) => {
    res.json({ userIdToDelete: parseInt(req.params.id) });
  });

const users = [{ name: "Alex" }, { name: "Bob" }, { name: "Tim" }];

router.param("id", (req, res, next, value, name) => {
  req.user = users[value % 3];
  next();
});
