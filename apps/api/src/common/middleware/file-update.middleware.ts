import multer from "multer";
import * as path from "path";

export function FileUploadMiddleware({
  fields = [{ name: "file", maxCount: 1 }],
  dest = "uploads",
  sizeLimit = 5,
} = {}) {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/" + dest);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix =
        Date.now() +
        "-" +
        (Math.round(Math.random() * 1e9) + path.extname(file.originalname));
      console.log(file);
      cb(null, file.fieldname + "-" + uniqueSuffix);
    },
  });
  function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif|jfif/;
    // Check ext
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      return cb(null, false);
    }
  }
  const upload = multer({
    limits: { fileSize: 1024 * 1024 * sizeLimit },
    storage: storage,
    fileFilter: function (_req, file, cb) {
      checkFileType(file, cb);
    },
  });
  return upload.fields(fields);
}
