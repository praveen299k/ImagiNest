const axiosInstance = require("../lib/axios.js");

const searchImages = async (req, res) => {
  try {
    const { query } = req.query;
    const response = await axiosInstance.get(`/search/photos?query=${query}`);
    const photos = response.data.results.map((result) => ({
      imageUrl: result.urls.regular,
      description: result.description,
      altDescription: result.alt_description,
    }));

    res.json({ photos });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error searching images", error: error.message });
  }
};

module.exports = { searchImages };
