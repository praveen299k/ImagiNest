const axiosInstance = require("../lib/axios.js");
const { searchImages } = require("../controllers/picstoriaController");

jest.mock("../lib/axios.js", () => {
  return {
    get: jest.fn(),
  };
});

describe("picstoria controller functions tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should fetch images by query", async () => {
    const mockResponse = {
      results: {
        photos: [
          {
            imageUrl: "https://images.unsplash.com/photo1",
            description: null,
            altDescription: "orange flowers",
          },
          {
            imageUrl: "https://images.unsplash.com/photo2",
            description: "Finding my roots",
            altDescription: "sun light passing through green leafed tree",
          },
        ],
      },
    };

    axiosInstance.get.mockResolvedValue(mockResponse);

    const req = { query: { query: "nature" } };
    const res = { json: jest.fn(), status: jest.fn(() => res) };

    const answer = await searchImages(req, res);

    expect(axiosInstance.get).toHaveBeenCalledWith(
      "/search/photos?query=nature"
    );

    expect(res.json).toHaveBeenCalledWith(mockResponse.photos);
  });
});
