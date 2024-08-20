const fs = require("fs");
const superagent = require("superagent");

const readFilePro = (file) => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, "utf-8", (err, data) => {
            if (err) reject("I cannot read that file, please check again!");
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

        const resPro1 = superagent.get(
            `https://dog.ceo/api/breed/${data}/images/random`
        );
        const resPro2 = superagent.get(
            `https://dog.ceo/api/breed/${data}/images/random`
        );
        const resPro3 = superagent.get(
            `https://dog.ceo/api/breed/${data}/images/random`
        );

        const all = await Promise.all([resPro1, resPro2, resPro3])
        const imgs = all.map(res => res.body.message)
        console.log(imgs)

        await writeFilePro("./image-links.txt", imgs.join("\n"));
    } catch (err) {
        throw err;
    }
    return "Hello from getDogPic() function";
};
getDogPic()


// Using IIFE
// (async () => {
//     try {
//         const res = await getDogPic();
//         console.log(res);
//     } catch (err) {
//         console.log(err);
//     }
// })();



// Using async/await
// getDogPic()
//     .then((res) => console.log(res))
//     .catch((err) => console.log(err));

// console.log("Hello from Magnificodev outside of the box");

// Using promises
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
