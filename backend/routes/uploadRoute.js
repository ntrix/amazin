import multer from "multer";
import express from "express";
import { isAuth } from "../utils.js";
import cloudinary from "cloudinary";

const uploadRoute = express.Router();

// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, "/images/uploads/");
//   },
//   filename(req, file, cb) {
//     cb(null, `${Date.now()}.jpg`);
//   },
// });

// const upload = multer({ storage });

// uploadRoute.post(
//   "/",
//   isAuth,
//   upload.single("image"),
//   (req, res, (err) => res.status(504).send({ message: err })) => {
//     res.send(`/${req.file.path}`);
//   }
// );
const upload = multer({ dest: "-tmp/uploads/" });

uploadRoute.post("/", isAuth, upload.single("image"), (req, res) => {
  cloudinary.config({
    cloud_name: process.env.CD_NAME,
    api_key: process.env.CD_API_KEY,
    api_secret: process.env.CD_API_SECRET,
  });

  const image = req.file;
  console.log({ image });
  (async () => {
    if (image && image.path)
      await cloudinary.v2.uploader.upload(
        image.path,
        { folder: "amazin" },
        (error, data) => {
          if (error) return res.status(401).send({ message: error });
          res.send(data.url);
        }
      );
    else res.status(404).send({ message: "No Image has been sent" });
  })();
});

export default uploadRoute;

/*
router.put('/:id/profile',
    userController.putUserUpdate,
);

exports.putUserUpdate = function (req, res, next) {
    const { first_name, last_name, cover_photo, avatar, bio } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.errors);
    }

    (async () => {
        const updatedUser = {
            first_name,
            last_name,
            bio,
        };
        if (cover_photo) await cloudinary.uploader.upload(cover_photo, {}, (err, data) => updatedUser.cover_photo = data.url);
        if (avatar) await cloudinary.uploader.upload(avatar, {}, (err, data) => updatedUser.avatar = data.url);
        User.findByIdAndUpdate(req.params.id, updatedUser, { new: true })
        .then( _ => res.status(200).json({ message: 'Your profile has been updated' }) )
        .catch( err => { res.status(200).json({ message: 'no profile update' }); next(err)} );
    }) ();
};

*/
