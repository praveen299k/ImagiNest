const { user: userModel, tag: tagModel } = require("../models");

const doesUserExist = async (email) => {
  const user = await userModel.findOne({ where: { email } });
  if (user) {
    return true;
  }
  return false;
};

const validateUserRequestBody = (body) => {
  const erros = [];
  if (!body.email) {
    erros.push("email is required!");
  }
  if (!body.username) {
    erros.push("username is required!");
  }
  return erros;
};

const isValidEmail = (email) => {
  return (
    typeof email === "string" && email.includes("@") && email.includes(".")
  );
};

const validatePhotoRequestBody = (body) => {
  const erros = [];
  if (!body.imageUrl) {
    erros.push("imageUrl is required!");
  }
  if (!body.description) {
    erros.push("description is required!");
  }
  if (!body.altDescription) {
    erros.push("altDescription is required!");
  }
  if (!body.userId) {
    erros.push("userId is required!");
  }
  return erros;
};

const validateImageUrl = (imageUrl) => {
  return imageUrl.startsWith("https://images.unsplash.com/");
};

const validateTags = (tags) => {
  const errors = [];
  if (tags.length > 5) {
    errors.push("no more than 5 tags should be provided");
  }
  for (let i = 0; i < tags.length; i++) {
    if (tags[i].length > 20) {
      errors.push("Each tag must not exceed 20 characters in length.");
      break;
    }
  }
  return errors;
};

const validateTagRequests = (req) => {
  const errors = [];
  if (!req.params.photoId) {
    errors.push("photoId is required!");
  }
  if (!req.body.tags) {
    errors.push("tags is required!");
  }
  return errors;
};

const validateTagsForCreating = async (tags, photoId) => {
  const errors = [];
  let totalTagsInDb = await tagModel.count({ where: { photoId } });

  if (!Array.isArray(tags) || tags.length === 0) {
    errors.push("tags should be an array and have atleast one tag");
    return errors;
  }
  if (totalTagsInDb + tags.length > 5) {
    errors.push("Each photo can have a maximum of 5 tags");
  }
  for (let i = 0; i < tags.length; i++) {
    if (typeof tags[i] !== "string" || tags[i].length === 0) {
      errors.push("Tags must be non-empty strings.");
      break;
    }
  }
  return errors;
};

const validateSearchQueryParams = (query) => {
  const errors = [];
  const sortOrders = ["ASC", "DESC"];
  if (query.sort && !sortOrders.includes(query.sort)) {
    errors.push(
      "sort query can either be ASC (ascending) or DESC (descending)."
    );
  }
  if (typeof query.tag !== "string" || query.tag.includes(",")) {
    errors.push(
      "Only a single tag is accepted as input query and it should be a string."
    );
  }
  return errors;
};

module.exports = {
  doesUserExist,
  validateUserRequestBody,
  isValidEmail,
  validatePhotoRequestBody,
  validateImageUrl,
  validateTags,
  validateTagsForCreating,
  validateTagRequests,
  validateSearchQueryParams,
};
