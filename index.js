require("dotenv").config();
const express = require("express");
const cors = require("cors");

const {
  createNewUser,
  createPhoto,
  createTag,
  searchPhotos,
  getSearcHistory,
} = require("./controllers/dataController");
const { searchImages } = require("./controllers/picstoriaController");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/users", createNewUser);
app.get("/api/photos/search", searchImages);
app.post("/api/photos", createPhoto);
app.post("/api/photos/:photoId/tags", createTag);
app.get("/api/photos/tag/search", searchPhotos);
app.get("/api/search-history", getSearcHistory);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});
