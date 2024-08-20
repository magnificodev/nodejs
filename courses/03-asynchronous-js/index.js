const fs = require("fs");
const superagent = require("superagent");

const readFilePro = (file) => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, "utf-8", (err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    });
};

const writeFilePro = (file, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, (err) => {
            if (err) reject(err.message);
            resolve("Written Successfully!");
        });
    });
};

const getDogPic = async () => {
    try {
        const data = await readFilePro(`${__dirname}/dog.txt`);
        const res = await superagent.get(
            `https://dog.ceo/api/breed/${data}/images/random`
        );
        await writeFilePro("./image-links.txt", res.body.message)
    } catch (err) {
        console.log(err);
    }
};
getDogPic()
// readFilePro(`${__dirname}/dog.txt`)
//     .then((data) => superagent.get(`https://dog.ceo/api/breed/${data}/images/random`))
//     .then(res => writeFilePro("./image-links.txt", res.body.message))
//     .then(data => console.log(data))
//     .catch((err) => console.log(err.message));

// Normal way
// fs.readFile(`${__dirname}/dog.txt`, "utf-8", (err, data) => {
//     console.log(`Breed: ${data}`);
//     superagent
//         .get(`https://dog.ceo/api/breed/${data}/images/random`)
//         .then((res) => {
//             fs.appendFile(
//                 `${__dirname}/image-links.txt`,
//                 `${res.body.message}\n`,
//                 (err) => {
//                     if (err) return console.log(err.message);
//                     console.log("Written successfully!");
//                 }
//             );
//         })
//         .catch((err) => {
//             console.log(err.message);
//         });
// });
