const express = require("express");
const fs = require("fs");
require("dotenv").config();

const PORT = process.env.SERVER_PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get("/api/v1/tours", (req, res) => {
    res.status(200).json({
        status: "success",
        results: tours.length,
        data: { tours },
    });
});

app.get("/api/v1/tours/:id", (req, res) => {
    const id = req.params.id * 1;
    const tour = tours.find((tour) => tour.id === id);

    if (!tour)
        res.status(404).json({
            status: "fail",
            message: "Invalid ID",
        });

    res.status(200).json({
        status: "success",
        data: {
            tour,
        },
    });
});

app.post("/api/v1/tours", (req, res) => {
    const newId = tours.at(-1).id + 1;
    const newTour = {
        id: newId,
        ...req.body,
    };
    tours.push(newTour);

    fs.writeFile(
        `${__dirname}/dev-data/data/tours-simple.json`,
        JSON.stringify(tours),
        (err) => {
            if (err)
                return res
                    .status(500)
                    .json({ message: "Error creating a new user" });

            console.log("Written successfully!");
            res.status(201).json({
                status: "success",
                data: { tour: newTour },
            });
        }
    );
});

app.patch("/api/v1/tours/:id", (req, res) => {
    const id = req.params.id * 1;
    const tour = tours.find((tour) => tour.id === id);

    if (!tour)
        return res.status(404).json({
            status: "fail",
            message: "Invalid ID",
        });

    res.status(200).json({
        status: "success",
        data: {
            message: "Updated successfully!",
        },
    });
});

app.delete("/api/v1/tours/:id", (req, res) => {
    const id = req.params.id * 1;
    const tour = tours.find((tour) => tour.id === id);

    if (!tour)
        return res.status(404).json({
            status: "fail",
            message: "Invalid ID",
        });
    
    res.status(204).json({
        status: "success",
        data: null
    });
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
