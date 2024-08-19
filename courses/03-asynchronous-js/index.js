const fs = require("fs");

const superagent = require("superagent");

fs.readFile(`${__dirname}/dog.txt`, "utf-8", (err, data) => {
    console.log(`Breed: ${data}`);
    superagent
        .get(`https://dog.ceo/api/breed/${data}/images/random`)
        .end((err, res) => {
            if (err) return console.log(err.message);

            fs.appendFile(
                `${__dirname}/image-links.txt`,
                `${res.body.message}\n`,
                (err) => {
                    if (err) return console.log(err.message);
                    console.log("Written successfully!");
                }
            );
        });
});
