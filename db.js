const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");

mongoose.connect(process.env.CONNECTION_STRING, { useNewUrlParser: true });

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Post = mongoose.model("post", postSchema);

module.exports = { Post };
