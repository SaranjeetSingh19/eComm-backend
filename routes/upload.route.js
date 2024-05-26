import express from "express"
import multer from "multer"
import path from "path"

const app = express.Router()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../uploads'));
    },
    filename: (req, file, cb) => {
        const extname = path.extname(file.originalname);
        cb(null, `${file.fieldname}-${Date.now()}${extname}`);
    }
})

app.post("/", (req, res) => {
    res.send("Tui sadaoo...")
})

export default app