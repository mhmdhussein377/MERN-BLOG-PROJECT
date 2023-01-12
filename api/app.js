const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const AuthRoutes = require("./routes/auth");
const UserRoutes = require("./routes/Users");
const PostRoutes = require("./routes/Posts");
const CategoryRoutes = require("./routes/Categories");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/images", express.static(path.join(__dirname, "/images")));
dotenv.config();
mongoose.set("strictQuery", true);


// app.use(express.json());
// app.use(helmet());
// app.use(morgan("common"));
// app.use(cors());

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(console.log("Connected to MongoDB"))
    .catch((error) => console.log(error));

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null, "images")
    },filename:(req,file,cb) => {
        cb(null, req.body.name);
    }
});

const upload = multer({storage: storage});
app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
});


app.use("/api/auth", AuthRoutes);
app.use("/api/users", UserRoutes);
app.use("/api/posts", PostRoutes);
app.use("/api/categories", CategoryRoutes);

app.listen(5000, () => {
    console.log("Backend is running");
});