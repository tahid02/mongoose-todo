const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String, // String is shorthand for {type: String}
  title: {
    type: String,
    enum: ["active", "inactive"],
  },
  date: { type: Date, default: Date.now },
  hidden: Boolean,
});

module.exports = todoSchema;
