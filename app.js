const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");
const db = require("./db");
const Post = db.Post;
const port = process.env.PORT || 5000;

const homeStartingContent =
  "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent =
  "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent =
  "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  const title = "Daily Journal";

  Post.find({}, (err, docs) => {
    if (!err) {
      console.log(docs);
      res.render("home", {
        homeContent: homeStartingContent,
        posts: docs,
        title: title,
      });
    }
  });
});

app.get("/contact", (req, res) => {
  const title = "contact";
  res.render("contact", { contact: contactContent, title: title });
});

app.get("/about", (req, res) => {
  const title = "about";
  res.render("about", { about: aboutContent, title: title });
});

app.get("/compose", (req, res) => {
  const title = "admin";
  res.render("compose", { title: title });
});

app.post("/compose", (req, res) => {
  const title = req.body.postTitle;
  const content = req.body.postBody;

  const post = new Post({
    title: title,
    content: content,
  });

  post.save((err) => {
    if (!err) {
      res.redirect("/");
    }
  });
});

app.get("/posts/:postId", (req, res) => {
  const requestedPostId = req.params.postId;
  Post.find({ _id: requestedPostId }, (err, posts) => {
    if (!err) {
      posts.forEach((post) => {
        postTitle = post.title;
        content = post.content;

        res.render("post", { title: postTitle, postContent: content });
      });
    }
  });
});

app.listen(port, function () {
  console.log(`Server started on port ${port}`);
});
