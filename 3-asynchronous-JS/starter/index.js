const fs = require("fs");
const { resolve } = require("path");
const superagent = require("superagent");

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, "utf8", (err, data) => {
      if (err) reject("I could not find that file 😣");
      resolve(data);
    });
  });
};

const getDogPic = async () => {
  try {
    const data = await readFilePro(`dog.txt`);
    console.log(`Breed: ${data}`);

    const res = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    console.log(res.body.message);

    await writeFilePro(`dog-img.txt`, res.body.message);
    console.log(`dog image saved to file!`);
  } catch (err) {
    console.log(err);
  }
};
getDogPic();

/*
readFilePro(`dog  .txt`)
  .then((data) => {
    console.log(`Breed: ${data}`);
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then((res) => {
    / if (err) return console.log(err.message);
    console.log(res.body.message);
    return writeFilePro(`dog-img.txt`, res.body.message);
  })
  .then(() => {
    console.log(`dog image saved to file!`);
  })
  .catch((err) => {
    console.log("NOT Found!", err); // the err messsage we receive is the error message which the api is sending to us
  });
*/
const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject("Could not write the file. 😒");
      resolve("success"); // we don't have anything to return here as we are writing the file.
    });
  });
};

// fs.readFile(`dog.txt`, "utf8", (err, data) => {
//   console.log(`Breed: ${data}`);

//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .then((res) => {
//       // if (err) return console.log(err.message);
//       console.log(res.body.message);

//       fs.writeFile(`dog-img.txt`, res.body.message, (err) => {
//         console.log(`${data} dog image saved to file!`);
//       });
//     })
//     .catch((err) => {
//       console.log(err.message);
//     });
// .end((err, res) => {  // all of this code is moved to then and catch as promises is used.
//   if (err) return console.log(err.message);
//   console.log(res.body.message);

//   fs.writeFile(`dog-img.txt`, res.body.message, (err) => {
//     console.log(`${data} dog image saved to file!`);
//   });
// });
// });
