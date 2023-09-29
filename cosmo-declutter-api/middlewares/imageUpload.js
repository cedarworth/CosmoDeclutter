const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage').GridFsStorage;

const storage = new GridFsStorage({
    url: process.env.ATLAS_URI,
    file: (req, file) => {
      return {
        filename: 'file_' + Date.now()
      };
    }
  });

const upload = multer({ storage });

// const app = express();

// app.post('/upload', upload.single('image'), (req, res) => {
  // req.file contains information about the uploaded file
  // req.body contains information about text fields

//   console.log(req.file);
//   console.log(req.body);

  // You can now store this information in your MongoDB database

//   res.send('File uploaded successfully');
// });

module.exports = upload;
