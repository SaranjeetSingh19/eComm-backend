import express from "express";
import multer from "multer";
import path from "path";
 


const app = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    //Store in this location
    cb(null, path.join("./uploads"));
  },
  filename: (req, file, cb) => {
    // with the random number+fileName
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
      res.status(400).send({ message: err.message });
    } else if (req.file) {
      res.status(200).send({
        message: "Image uploaded successfully",
        image: `/${req.file.path}`,
      });
    } else {
      res.status(400).send({ message: "No image file provided" });
    }
  });
});



export default app;
