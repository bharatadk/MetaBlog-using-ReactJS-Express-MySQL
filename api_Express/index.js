import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/post.js";
import { upload } from "./multerConfig.js";

const app = express();
const corsOptions = {
    origin: true, //included origin as true
    credentials: true, //included credentials as true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);
app.use("/uploads", express.static("./public/uploads"));
app.post("/api/uploads", upload.single("file"), function (req, res) {
    const file = req.file;
    res.status(200).json(file.filename);
});

app.listen(5000, () => {
    console.log("blog app listening to port 5000");
});
