
const multer = require('multer');
const fs = require('fs');

const handleImages = function(req, file, cb) {
  
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|jfif|JFIF)$/)) {
    req.fileValidationError = 'Only image files are allowed!';
    return cb(new Error(req.fileValidationError), false);
  }
  cb(null, true);
};

const storage = multer.diskStorage({
  destination : function(req, file, callback){
    callback(null, './src/public/images');
  },

  filename : function (req, file, callback){
    var chars = 'FHaiweuSRIUNOiubiHJDHOIESsrioiBIESUR93847bwnsbwsrb8347w8bw848nwbywdmsriub9u4rgiUNOS9EY7RBUGNoug98rgubsrgbuy9r8bgisgjn44872987394nfshbu87S384TUNFFBNinanUEPLLQ4628VN4739FNebDJ298erERJK349DJHERHV4692MkjsmowdvbueirSYQOWLS47879PASX43wZ93478BweVCXQ698HOIWE394349798HYS789272TWYQ6FaeHdsg39820FK0294MF468YTGSHFWY8usfhbhu4tfu87t297qbngvjQ8B7YB8AIGsehgwssngbwnBSRBGasbgnw74bgq847284D99HDP599shd7NBCDP48781123FIOPWURHND49734WE7DFSH664903398REKJRE093409FEJRE90847287tbgw4tgw4EVJKS33';

    let imageName = '';
    for(var i = 30; i > 0; --i){
      imageName += chars[Math.floor(Math.random() * (chars.length))];
    }

    callback(null, imageName+'.jpeg');
  },
});

const uploadImage = multer({
  storage : storage, fileFilter: handleImages,
  limits : { fieldSize: 1024 * 1024 * 2, },
});
module.exports = uploadImage;