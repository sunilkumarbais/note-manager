import express from "express"
import { createNote, getAllNote, getSingleNote, updateNote, deleteNote } from "../controller/noteController.js";
import { protect } from "../middlewares/authMiddleware.js";
import multer from "multer";

const upload = multer({
  storage: multer.memoryStorage(),
});

const router = express.Router();

router.post("/", protect, upload.single("image"),  createNote);
router.get("/", getAllNote);
router.get("/:id", getSingleNote)
router.patch("/:id", protect, upload.single("image"), updateNote);
router.delete("/:id", protect, deleteNote);

export default router;