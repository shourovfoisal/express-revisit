import express from "express";
import { router as userRouter } from "./routes/users.js";

const app = express();

// Using this, we can access static html files from the browser
// For example:
// http://localhost:8080/download/download.html
// or
// http://localhost:8080/profile.html
app.use(express.static("public"));

// To access data inside the request.body
app.use(express.urlencoded({ extended: true }));

// To access json data
app.use(express.json());

// Sets up the view engine for dynamic content
app.set("view engine", "ejs");

// Here, logger is a custom function
// Using the following line here will invoke the custom function on all the routes
// app.use(logger);

// using custom (logger) function here will run the function first, and then serve the response
app.get("/", logger, logger, logger, (req, res) => {
  // res.render() renders from the views folder
  res.render("index", { name: "Shourov" });
});

// we can use custom functions in the middlewares too
app.use("/users", logger, userRouter);

// custom function
function logger(req, res, next) {
  console.log(req.originalUrl);
  next();
}

app.listen(8080);
