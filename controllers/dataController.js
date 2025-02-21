const {
  user: userModel,
  photo: photoModel,
  tag: tagModel,
  searchHistory: searchHistoryModel,
} = require("../models");
const { Op } = require("@sequelize/core");

const {
  doesUserExist,
  validateUserRequestBody,
  isValidEmail,
  validatePhotoRequestBody,
  validateImageUrl,
  validateTags,
  validateTagRequests,
  validateTagsForCreating,
  validateSearchQueryParams,
} = require("../validations");

// MS1_Assignment_1.2: Making API Calls to create Users
const createNewUser = async (req, res) => {
  const errors = validateUserRequestBody(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  if (await doesUserExist(req.body.email)) {
    return res
      .status(400)
      .json({ error: "User already exist with this email address" });
  }

  if (!isValidEmail(req.body.email)) {
    return res
      .status(400)
      .json({ error: "Please provide valid email address" });
  }
  try {
    const { username, email } = req.body;
    const user = await userModel.create({ username, email });
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
};

// MS1_Assignment_1.4: Saving Photos into Collections
const createPhoto = async (req, res) => {
  let errors = validatePhotoRequestBody(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  if (!validateImageUrl(req.body.imageUrl)) {
    return res.status(400).json({ message: "Invalid image URL" });
  }

  errors = validateTags(req.body.tags);
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    const { imageUrl, description, altDescription, tags, userId } = req.body;
    const photo = await photoModel.create({
      imageUrl,
      description,
      altDescription,
      userId,
    });

    for (const tag of tags) {
      await tagModel.create({
        name: tag,
        photoId: photo.id,
      });
    }

    res.json({
      message: "Photo saved successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating photo", error: error.message });
  }
};

// MS1_Assignment_1.5: Adding Tags for Photos
const createTag = async (req, res) => {
  let errors = validateTagRequests(req);
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }
  errors = await validateTagsForCreating(req.body.tags, req.params.photoId);
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }
  try {
    const photoId = parseInt(req.params.photoId);
    const { tags } = req.body;

    for (const tag of tags) {
      await tagModel.create({
        name: tag,
        photoId,
      });
    }

    res.json({
      message: "Tags added successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating tag", error: error.message });
  }
};

// MS1_Assignment_1.6: Searching Photos by Tags and Sorting by Date Saved
const searchPhotos = async (req, res) => {
  const errors = validateSearchQueryParams(req.query);
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }
  try {
    const { tag, userId } = req.query;
    const sort = req.query.sort || "ASC";
    if (userId) {
      await searchHistoryModel.create({
        query: tag,
        userId,
      });
    }
    const tagsFound = await tagModel.findAll({
      where: { name: tag },
      attributes: ["photoId"],
    });

    if (tagsFound.length === 0) {
      return res.status(404).json({ message: "No photos found for this tag" });
    }
    // console.log(tagsFound);
    const photoIds = [];
    for (let i = 0; i < tagsFound.length; i++) {
      photoIds.push(tagsFound[i].photoId);
    }

    console.log(photoIds);

    const photosData = await photoModel.findAll({
      where: { id: { [Op.in]: photoIds } },
      order: [["dateSaved", sort]],
      include: [{ model: tagModel, attributes: ["name"] }],
      attributes: ["imageUrl", "description", "dateSaved"],
    });

    const photos = photosData.map((photo) => ({
      imageUrl: photo.imageUrl,
      description: photo.description,
      dateSaved: photo.dateSaved,
      tags: photo.tags.map((tag) => tag.name),
    }));

    res.json({ photos });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error searcing photos", error: error.message });
  }
};

const getSearcHistory = async (req, res) => {
  if (!req.query.userId) {
    return res.status(400).json({ error: "provide valid userId" });
  }
  try {
    const { userId } = req.query;
    const searchHistory = await searchHistoryModel.findAll({
      where: { userId },
      attributes: ["query", "timestamp"],
    });
    if (searchHistory.length === 0) {
      return res
        .status(404)
        .json({ message: "no search history found for the user" });
    }

    res.json({ searchHistory });
  } catch (error) {}
};

module.exports = {
  createNewUser,
  createPhoto,
  createTag,
  searchPhotos,
  getSearcHistory,
};
