const fs = require("fs");
const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../../dev-data/data/tours-simple.json`)
);

exports.checkId = (req, res, next, val) => {
    const id = val * 1;
    const tour = tours.find((tour) => tour.id === id);

    if (!tour)
        return res.status(404).json({
            status: "fail",
            message: "Invalid ID",
        });
    next();
};

exports.checkBody = (req, res, next) => {
    const { name, price } = req.body;
    if (!name || !price) {
        return res.status(404).json({
            status: "failure",
            message: "Please enter full of information",
        });
    }
    next();
};

exports.getAllTours = (req, res) => {
    console.log(req.requestTime);
    res.status(200).json({
        status: "success",
        requestAt: req.requestTime,
        results: tours.length,
        data: { tours },
    });
};

exports.getTour = (req, res) => {
    const id = req.params.id * 1;
    const tour = tours.find((tour) => tour.id === id);
    res.status(200).json({
        status: "success",
        data: {
            tour,
        },
    });
};

exports.createTour = (req, res) => {
    const newId = tours.at(-1).id + 1;
    const newTour = {
        id: newId,
        ...req.body,
    };
    tours.push(newTour);

    fs.writeFile(
        `${__dirname}/../../dev-data/data/tours-simple.json`,
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
};

exports.updateTour = (req, res) => {
    res.status(200).json({
        status: "success",
        data: {
            message: "Updated successfully!",
        },
    });
};

exports.deleteTour = (req, res) => {
    res.status(204).json({
        status: "success",
        data: null,
    });
};
