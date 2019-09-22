const sharp_1 = require('sharp');
const sharp_2 = require('sharp');
const sharp_3 = require('sharp');
const sharp_0 = require('sharp');
const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');
const fs = require('fs');

const assetFolder = '../Assets/Assets_Input/';
const outputFolder = '../Assets/Assets_Output/';
const brandedInputFolder = '../Assets/Branded_Input/';
const brandedOutputFolder_Twitter = '../Assets/Branded_Output/Twitter/';
const brandedOutputFolder_Facebook = '../Assets/Branded_Output/Facebook/';
const brandedOutputFolder_Instagram = '../Assets/Branded_Output/Instagram/';
const brandedOutputFolder_Covers= '../Assets/Branded_Output/Covers/';
const qrFolder = '../Assets/QRs/';
const tempFolder = '../Assets/tmp/';
 
const isDone = false;
const overlayState = 0;
const member = [];


class ImageWorker  {

  constructor() {}

 async  readFolder() {
  fs.readdir(assetFolder, (err, files) => {
    files.forEach(file => {
     console.table(file)    
    });
});
}

// Loads Folder contents and sharpens all
async  sharpenSet() {
 fs.readdir(assetFolder, (err, files) => {
  files.forEach(file => {
    this.sharpenImage(assetFolder + file, outputFolder,file);
  });
});

}

// loads folder contents and overlays all with image asset
// write tools to render to appropriate social media image sizes
async  overlaySet() {
  try {
  await this.resizeImage();
  await  fs.readdir(brandedInputFolder, (err, files) => {
   files.forEach((file,i) => {
    console.log(file, i);
    this.overlayImage_Twitter(brandedInputFolder + file, file, i);
    this.overlayImage_Covers(brandedInputFolder + file, file, i);
    this.overlayImage_Facebook(brandedInputFolder + file, file, i);
    this.overlayImage_Instagram(brandedInputFolder + file, file, i);
    });
     }); 

    } catch (err) {
      console.log(err);
    }
   }



   
    readdirAsync(path) {
    return new Promise(function (resolve, reject) {
      fs.readdir(path, function (error, result) {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

// resizes image
async resizeImage() {
  const qr = sharp_0(qrFolder + 'qr.png')
   await qr.resize(600, 600, {
       kernel: sharp_0.kernel.cubic
     }).max()
     .toFile(tempFolder + 'tmp.jpg')
     .then((x) =>{
         console.log('resized');
      }).catch((err) => {
         console.log(err);
     });

}


// overlays image with QR
// Saves to Temp Folder
// Sharpens Image
// Save to Output folder
// { center: 0,
//   centre: 0,
//   north: 1,
//   east: 2,
//   south: 3,
//   west: 4,
//   northeast: 5,
//   southeast: 6,
//   southwest: 7,
//   northwest: 8 }
 async overlayImage_Twitter(file, filename, i) {
    const img = sharp_1(file);
   await img
   .overlayWith(tempFolder + 'tmp.jpg', { gravity: sharp_1.gravity.southeast } ).jpeg().toFile(tempFolder + i + 'output.jpg')
   .then((output) => {
    member.push(i);
        console.log('overlayed for Twitter');
       sharpenImage_(img, tempFolder + i + 'output.jpg', brandedOutputFolder_Twitter, 'final'+ i + '.jpg');
        }).
        catch((error) => {
         console.log(error);
        });
        
  }  



  async overlayImage_Facebook(file, filename, i) {
    const img = sharp_2(file);
    await img
   .overlayWith(tempFolder + 'tmp.jpg', { gravity: sharp_2.gravity.south } ).jpeg().toFile(tempFolder + i + 'output.jpg')
   .then((output) => {
        console.log('overlayed for Facebook');
        sharpenImage_(img, tempFolder + i + 'output.jpg', brandedOutputFolder_Facebook, 'final'+ i + '.jpg');
        }).
        catch((error) => {
         console.log(error);
        });     
  }  



  async overlayImage_Instagram(file, filename, i) {
  const img = sharp_3(file);
   await img
   .overlayWith(tempFolder + 'tmp.jpg', { gravity: sharp_3.gravity.south } ).jpeg().toFile(tempFolder + i + 'output.jpg')
   .then((output) => {
        console.log('overlayed for Instagram');
        sharpenImage_(img, tempFolder + i + 'output.jpg', brandedOutputFolder_Instagram, 'final'+ i + '.jpg');
        }).
        catch((error) => {
         console.log(error);
        });       
  }  



  // Renders Branded Images for NewsPapers,Page Covers, Billboards. Headers
  async overlayImage_Covers(file, filename, i) {
    const img = sharp_0(file);
   await img
   .overlayWith(tempFolder + 'tmp.jpg', { gravity: sharp_0.gravity.centre } ).jpeg().toFile(tempFolder + i + 'output.jpg')
   .then((output) => {
        console.log('overlayed for Covers');
        sharpenImage_(img,tempFolder + i + 'output.jpg', brandedOutputFolder_Covers, 'final'+ i + '.jpg');
        }).
        catch((error) => {
         console.log(error);
        });
        
  }  




// Sharpens Image @input, output dir, outputfilename
async sharpenImage(file, dir, filename) {
 const img = sharp_0(file);
await img.sharpen(1.8, 1.8, 0.9).jpeg().toFile(dir + filename ).then((output) => {
console.log(filename + ' sharpened');
 }).
 catch((error) => {
  console.log(error);
 });
}



// Sharpens Image @input, output dir, outputfilename for parallel
async sharpenImage_(sharpImage, file, dir, filename) {
  const img = sharpImage;
 await img.sharpen(1.1, 1.1, 1.1).jpeg().toFile(dir + filename ).then((output) => {
 console.log(filename + ' sharpened');
  }).
  catch((error) => {
   console.log(error);
  });
 }



blobToFile(theBlob, fileName) {
  var b = theBlob;
  //A Blob() is almost a File() - it's just missing the two properties below which we will add
  b.lastModifiedDate = new Date();
  b.name = fileName;

  //Cast to a File() type
  return theBlob;
}


// returns file metadata ; file.ext
async getMetadata(file) {
    const img = sharp_0(file);
    await img.metadata()
    .then(function(metadata) {
    console.log(metadata.exif);
    })
    .then(function(data) {
      // data contains a WebP image half the width and height of the original JPEG
    });
}



}


const ii = new ImageWorker()
 ii.sharpenSet();