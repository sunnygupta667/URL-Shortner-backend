import { nanoid } from "nanoid";
import validator from "validator";
import Url from "../models/Url.js";

// ===============================
// Create Short URL
// ===============================
export const createShortUrl = async (req, res) => {
  try {
    const { originalUrl } = req.body;

    // 1️⃣ Validate input
    if (!originalUrl) {
      return res.status(400).json({
        success: false,
        message: "Please provide a URL to shorten",
      });
    }

    // 2️⃣ Check valid URL format
    if (!validator.isURL(originalUrl, { require_protocol: true })) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid URL with http:// or https://",
      });
    }

    // 3️⃣ Generate unique short ID
    let shortId;
    let isUnique = false;
    let attempts = 0;
    const maxAttempts = 5;

    while (!isUnique && attempts < maxAttempts) {
      shortId = nanoid(8);
      const existing = await Url.findOne({ shortId });
      if (!existing) isUnique = true;
      attempts++;
    }

    if (!isUnique) {
      return res.status(500).json({
        success: false,
        message: "Could not generate unique short ID, please try again",
      });
    }

    // 4️⃣ Save new URL
    const url = new Url({
      originalUrl,
      shortId,
      userId: req.userId,
    });

    await url.save();

    res.status(201).json({
      success: true,
      message: "URL shortened successfully",
      data: {
        id: url._id,
        originalUrl: url.originalUrl,
        shortUrl: `${process.env.BASE_URL}/${url.shortId}`,
        shortId: url.shortId,
        clickCount: url.clickCount,
        createdAt: url.createdAt,
      },
    });
  } catch (error) {
    console.error("Shorten URL error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while creating short URL",
      error: error.message,
    });
  }
};

// ===============================
// Get All URLs for Logged-in User
// ===============================
export const getMyUrls = async (req, res) => {
  try {
    const urls = await Url.find({ userId: req.userId })
      .sort({ createdAt: -1 })
      .select("-__v");

    const totalClicks = urls.reduce((sum, url) => sum + url.clickCount, 0);

    res.json({
      success: true,
      count: urls.length,
      totalClicks,
      data: urls.map((url) => ({
        id: url._id,
        originalUrl: url.originalUrl,
        shortUrl: `${process.env.BASE_URL}/${url.shortId}`,
        shortId: url.shortId,
        clickCount: url.clickCount,
        createdAt: url.createdAt,
      })),
    });
  } catch (error) {
    console.error("Get URLs error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching URLs",
      error: error.message,
    });
  }
};

// ===============================
// Delete a URL
// ===============================
export const deleteUrl = async (req, res) => {
  try {
    const url = await Url.findById(req.params.id);

    if (!url) {
      return res.status(404).json({
        success: false,
        message: "URL not found",
      });
    }

    if (url.userId.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this URL",
      });
    }

    await Url.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "URL deleted successfully",
    });
  } catch (error) {
    console.error("Delete URL error:", error);

    if (error.kind === "ObjectId") {
      return res.status(400).json({
        success: false,
        message: "Invalid URL ID",
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error while deleting URL",
      error: error.message,
    });
  }
};

// ===============================
// Redirect to Original URL
// ===============================
export const redirectToOriginalUrl = async (req, res) => {
  try {
    const url = await Url.findOne({ shortId: req.params.shortId });

    if (!url) {
      return res.status(404).json({
        success: false,
        message: "Short URL not found",
      });
    }

    url.clickCount += 1;
    await url.save();

    res.redirect(url.originalUrl);
  } catch (error) {
    console.error("Redirect error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during redirection",
      error: error.message,
    });
  }
};
