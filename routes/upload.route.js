import express from "express";
import multer from "multer";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

const app = express.Router();

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join("./uploads")); // Temporary storage
  },
  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${Date.now()}${extname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const filetypes = /jpe?g|png|webp/;
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

  const extname = path.extname(file.originalname).toLowerCase();
  const mimetype = file.mimetype;

  if (filetypes.test(extname) && mimetypes.test(mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Images only"), false);
  }
};

const upload = multer({ storage, fileFilter });
const uploadSingeImage = upload.single("image");

app.post("/", (req, res) => {
  uploadSingeImage(req, res, (err) => {
    if (err) {
      return res.status(400).send({ message: err.message });
    }

    if (req.file) {
      // Upload to Cloudinary
      cloudinary.uploader.upload(
        req.file.path,
        { folder: "products" },
        (err, result) => {
          if (err) {
            return res.status(400).send({ message: err.message });
          }

          // Send the URL of the uploaded image in the response
          res.status(200).send({
            message: "Image uploaded successfully",
            image: result.secure_url,
          });
        }
      );
    } else {
      res.status(400).send({ message: "No image file provided" });
    }
  });
});

export default app;
