const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { MulterError } = require("multer");
const multer = require("multer");
const bcrypt = require("bcrypt");
const upload = multer({ dest: "uploads" });
const File = require("./models/File");
const nodemailer = require("nodemailer");
const sendMail = require("./models/SendMail");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.set("view engine", "jsx");
app.engine("jsx", require("express-react-views").createEngine());

//DATABASE CONNECTION
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("MongoDB Connected Successfully!!"))
  .catch((err) => {
    console.error(err);
  });

app.post("/upload", upload.single("file"), async function (req, res) {
  console.log(req.file);
  const fileData = {
    path: req.file.path,
    originalName: req.file.originalname,
    mimetype: req.file.mimetype,
  };
  if (req.body.password != null && req.body.password !== "") {
    fileData.password = await bcrypt.hash(req.body.password, 10);
  }
  const file = await File.create(fileData);
  res.send(file._id);
});

app.get("/upload/:id", async function (req, res) {
  const id = req.params.id;
  res.send({
    fileLink: `http://${req.headers.host}/file/${id}`,
    fileid: id,
  });
});

app.post("/send/:id", sendMail);

app.route("/file/:id").get(handleDownload).post(handleDownload);

async function handleDownload(req, res) {
  const id = req.params.id;
  const file = await File.findById(req.params.id);
  const password=req.body.password??req.query.password;
  // console.log(file);
  if (file.password != null) {
    if (password == null) {
      return res.send({ password: true });
    }
    if (!(await bcrypt.compare(password, file.password))) {
      res.send({ password: "not-correct", passwordCorrect: false });
      return;
    }
  }
  file.downloadCount++;
  await file.save();
  res.header("filename", file.originalName);
  res.header("content-type", file.mimetype);
  res.download(file.path, file.originalName);
  // res.send({ password: false });
}

app.get("/find/:id", async (req, res) => {
  const id = req.params.id;
  const file = await File.findById(id);
  res.json({ filename: file.originalName });
});

//APP STARTING CONNECTION TO PORT 3000
app.listen(3000, function () {
  console.log("Server is running at port 3000..");
});
