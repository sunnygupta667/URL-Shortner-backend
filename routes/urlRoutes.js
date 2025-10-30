import express from "express";
import auth from "../middlewares/auth.js";
import {
  createShortUrl,
  getMyUrls,
  deleteUrl,
  redirectToOriginalUrl,
} from "../controllers/urlController.js";

const router = express.Router();

// Protected routes
router.post("/shorten", auth, createShortUrl);
router.get("/my-urls", auth, getMyUrls);
router.delete("/:id", auth, deleteUrl);

// Public route for redirection
router.get("/:shortId", redirectToOriginalUrl);

export default router;
