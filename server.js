'use strict';

var express = require('express');
var cors = require('cors');
// require and use "multer"...
const multer = require('multer');
const bodyParser= require('body-parser')


var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));     
    
app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'views') 
    }, 
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })

var upload = multer({ storage: storage })
                                 

app.post('/api/fileanalyse', upload.single('upfile'), (req, res, next) => {
    const file = req.file
    if (!file) {
      const error = new Error('Please upload a file')
      error.httpStatusCode = 400
      return next(error)
    }
      res.json({name: file.originalname, size: file.size})
    
  })
 

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});   
