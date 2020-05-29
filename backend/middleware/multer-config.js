const multer = require("multer"); // pour géré les fichiers envoyé a notre API

const MIME_TYPES = {
          "image/jpg": "jpg",
          "image/jpeg": "jpg",
          "image/png": "png",
};

const storage = multer.diskStorage({
          destination: (req, file, callback) => {
                    callback(null, "images"); 
          },
          filename: (req, file, callback) => {
                    const name = file.originalname.split(" ").join("_");
                    const extension = MIME_TYPES[file.mimetype]; // extention c'est simplement le mimetype du l'image
                    callback(null, name + Date.now() + "." + extension);
          },
});

module.exports = multer({ storage: storage }).single("image");
