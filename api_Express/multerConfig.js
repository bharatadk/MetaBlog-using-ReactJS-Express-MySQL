import multer from "multer";

// img storage confing
const imgconfig = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./public/uploads");
    },
    filename: (req, file, callback) => {
        callback(null, `image-${Date.now()}.${file.originalname}`);
    },
});

// img filter
const isImage = (req, file, callback) => {
    if (file.mimetype.startsWith("image")) {
        callback(null, true);
    } else {
        callback(null, Error("only image is allowd"));
    }
};

let upload = multer({
    storage: imgconfig,
    fileFilter: isImage,
});

export { upload };
