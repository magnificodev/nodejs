const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req, res) => {
    // Solution 1: Normal way
    // fs.readFile("./test-file.txt", "utf-8", (err, data) => {
    //     if (err) console.log(err);

    //     res.end(data)
    // })

    // Solution 2: Stream
    // const readable = fs.createReadStream("./test-file.txt", "utf-8");
    // readable.on("data", (chunk) => {
    //     res.write(chunk);
    // });

    // readable.on("end", () => {
    //     res.end();
    // });

    // readable.on("error", (err) => {
    //     console.log(err) 
    //     res.statusCode = 500
    //     res.end("File not found")
    // })

    // Solution 3
    // const readable = fs.createReadStream("./test-file.txt", "utf-8");
    // readable.pipe(res)

});

server.listen(8000, () => {
    console.log("Server is listening on port 8000");
});