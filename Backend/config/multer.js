const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Store file in memory until explicitly saved
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only JPG, PNG allowed."));
  }
};

const upload = multer({ storage, fileFilter });

// Save file to disk manually
const saveFileToDisk = (file) => {
  const uploadPath = "uploads/";
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }

  const filename = `proof-${Date.now()}${path.extname(file.originalname)}`;
  const fullPath = path.join(uploadPath, filename);

  fs.writeFileSync(fullPath, file.buffer);
  return `/uploads/${filename}`;
};

module.exports = { upload, saveFileToDisk };
