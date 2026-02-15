import Note from "../modules/noteModule.js"
import { uploadFile } from "../services/image.service.js";

// Create New Notes  //
export const createNote = async (req, res) => {
  try {
    const user = req.user;

    let { title, content } = req.body;
    if (!title?.trim() || !content?.trim()) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    let imageUrl = null;
    const file = req.file;
    if (file) {
      imageUrl = await uploadFile(file.buffer.toString("base64"));
    }

    const note = await Note.create({
      title,
      content,
      author: user._id,
      image: imageUrl?.url
    });
    res.status(201).json({ message: "Note Created successfulyy", note });
  } catch (err) {
    res.status(400).json({ message: err?.errors?.content?.message || err?.errors?.title?.message });
  }
};

// Get All Notes //
export const getAllNote = async (req, res) => {
  const notes = await Note.find().sort({ updatedAt: -1 });
  res.status(200).json({ message: "Fetching data successfuly", notes: notes })
};

export const getSingleNote = async (req, res) => {
  const { id } = req.params;
  const note = await Note.findById(id).select("-password -role").populate("author", "userName email -_id");
  if (!note) {
    return res.status(404).json({ message: "Note not found " });
  };

  res.status(200).json({ message: "Fetching note successfully", note })
}

// Update Note //
export const updateNote = async (req, res) => {
  const user = req.user;
  if (user.role !== "admin") {
    return res.status(401).json({ message: "You are not authorized for update note." });
  }

  const { id } = req.params;
  let { title, content } = req.body;
  const file = req.file;
  let imageUrl = null;
  if (file) {
    imageUrl = await uploadFile(file.buffer.toString("base64"));
  }

  if (!title?.trim() || !content?.trim()) {
    return res.status(400).json({ message: "No valid changes provided" });
  };

  const note = await Note.findById(id);
  note.title = title;
  note.content = content;
  note.image = imageUrl?.url || note.image;

  await note.save();

  res.status(200).json({
    message: "Update successfully",
    note
  });
};

// Delete Note //
export const deleteNote = async (req, res) => {
  const user = req.user;
  if (user.role !== "admin") {
    return res.status(401).json({ message: "You are not authorized for delete note." });
  }

  const { id } = req.params;
  const deleteNote = await Note.findByIdAndDelete(id);

  if (!deleteNote) {
    return res.status(404).json({ message: "Note not found" });
  };

  res.status(200).json({ message: "Note deleted successfuly", note: deleteNote });
}