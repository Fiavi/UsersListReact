const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const usersRoutes = express.Router();
const PORT = 3001;

//bNbToDNsB3xUXpU6 pass mongo

let User = require("./usersSchema");

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(
    "mongodb+srv://dbuser:bNbToDNsB3xUXpU6@cluster0.fdm0r.mongodb.net/Users?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;

connection.once("open", function () {
    console.log("MongoDB connection established successfully!");
});

usersRoutes.route("/").get(function (req, res) {
    User.find(function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    });
});

usersRoutes.route("/:id").get(function (req, res) {
    let id = req.params.id;
    User.findById(id, function (err, user) {
        res.json(user);
    });
});

usersRoutes.route("/add").post(function (req, res) {
    let newUser = new User(req.body);
    newUser
        .save()
        .then((user) => {
            res.status(200).json({ user: "user added successfull" });
        })
        .catch((err) => {
            res.status(400).send("new user was not created");
        });
});

usersRoutes.route("/update/:id").post(function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (!user) {
            res.status(404).send("user was not found");
        } else {
            user.name = req.body.name;
            user.surrname = req.body.surrname;
            user.description = req.body.description;

            user.save()
                .then((user) => {
                    res.json("User updated");
                })
                .catch((err) => {
                    res.status(400).send("User was not updated");
                });
        }
    });
});

usersRoutes.route("/delete/:id").delete(function (req, res) {
    const id = req.params.id;

    User.findByIdAndDelete(id)
        .then((data) => {
            if (data) {
                res.send({ message: "User was deleted successfully!" });
            } else {
                res.status(404).send({ message: `User ${id} was not deleted` });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: `Could not delete User with id: ${id}`
            });
        });
});

app.use("/users", usersRoutes);

app.listen(PORT, function () {
    console.log("Server is working on Port: " + PORT);
});
