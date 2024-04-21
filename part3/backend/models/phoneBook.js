"use strict";
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URI;

mongoose
  .connect(url)
  .then((response) => console.log("connected to mongoDB"))
  .catch((err) => console.log("error connecting", err.message));

const personsSchema = new mongoose.Schema({
  name:  {
    type: String,
    minLength: 3,
    required: true
  },
  number: String,
});

personsSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personsSchema);