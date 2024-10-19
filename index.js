const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const methodOverride = require("method-override");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [
  {
    id: uuidv4(),
    username: "ayush__ptdr__04",
    src: "/images/E278E41A-3ACE-4BA6-BEDA-F2EBC1DDE10F_1_201_a.jpeg",
    caption: "Collect moments, not things.",
  },
  //   {
  //     id: uuidv4(),
  //     username: "ptdr_mohit_007",
  //     src: "/Users/aayushpatidar/Pictures/Photos Library.photoslibrary/resources/renders/3/38901D8D-3D3F-4674-BE4A-3B25A0B7B225_1_201_a.jpeg",
  //     caption: "Collect moments, not things.",
  //   },
  //   {
  //     id: uuidv4(),
  //     username: "rohan_ptdr_",
  //     src: "/Users/aayushpatidar/Pictures/Photos Library.photoslibrary/resources/renders/3/38901D8D-3D3F-4674-BE4A-3B25A0B7B225_1_201_a.jpeg",
  //     caption: "Collect moments, not things.",
  //   },
  {
    id: uuidv4(),
    username: "_sumit_0707",
    src: "/images/CB4E5D89-1F8D-490E-A62F-F57A5CA22343_1_201_a.jpeg",
    caption: "just call me the Iron Kohli! ",
  },
  {
    id: uuidv4(),
    username: "amitpatidar587",
    src: "/images/BD8B384A-F5A4-4E5A-A574-86FF3F170D3D_1_105_c.jpeg",
    caption: "Feeling on top of the world!",
  },
  //   {
  //     id: uuidv4(),
  //     username: "art_by_ritik06",
  //     src: "/Users/aayushpatidar/Pictures/Photos Library.photoslibrary/resources/renders/3/38901D8D-3D3F-4674-BE4A-3B25A0B7B225_1_201_a.jpeg",
  //     caption: "Collect moments, not things.",
  //   },
];

app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/posts", (req, res) => {
  let { username, caption, src } = req.body;
  let id = uuidv4();
  posts.push({ id, username, src, caption });
  res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("show.ejs", { post });
});

app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let newCaption = req.body.caption;
  let post = posts.find((p) => id === p.id);
  post.caption = newCaption;
  console.log("caption updated");
  res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("edit.ejs", { post });
});

app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;
  posts = posts.filter((p) => id !== p.id);
  res.redirect("/posts");
});

app.listen(port, () => {
  console.log("Listning to the port of 8080");
});
