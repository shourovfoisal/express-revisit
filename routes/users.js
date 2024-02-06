import express from "express";

export const router = express.Router();

router.get("/", (req, res) => {
  // We can access query parameters from the req object
  // For example http://localhost:8080/users?name=Bob
  if (req.query?.name) {
    const user = users.find((u) => u.name === req.query?.name);
    if (user) {
      res.json(user);
    } else {
      res.send("No user by this name found!");
    }
  } else {
    res.json(users);
  }
});

router.post("/", (req, res) => {
  // Allow if user doesn't already exist
  if (users.findIndex((user) => user?.name === req.body.name) === -1) {
    users.push({ name: req.body.name });
    res.redirect(`/users/${users.length - 1}`); // res.redirect redirects the user to another route
  } else {
    res.render("users/new", { name: req.body.name, error: true });
  }
});

router.get("/form", (req, res) => {
  // ejs render
  res.render("users/new", { name: "Alex" });
});

// Route grouping
router
  .route("/:id")
  .get((req, res) => {
    res.json({ mode: "get", user: req.user });
  })
  .put((req, res) => {
    res.json({ mode: "update", user: req.user });
  })
  .delete((req, res) => {
    res.json({ mode: "delete", user: req.user });
  });

const users = [{ name: "Alex" }, { name: "Bob" }, { name: "Tim" }];

// This param middleware helps us detect the parameters before we reach the get/post/put/delete handlers
router.param("id", (req, res, next, value, name) => {
  req.user = users[value % 3];
  next();
});
