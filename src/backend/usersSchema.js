const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let User = new Schema({
    name: {
        type: String
    },
    surrname: {
        type: String
    },
    description: {
        type: String
    }
});

module.exports = mongoose.model("User", User);
