const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const todoSchema = require("../schemas/todoSchema");
const Todo = new mongoose.model("Todo", todoSchema);
// get all the todo
router.get("/", () => {});
// get a todo by id
router.get("/:id", () => {});
// post a todo
router.post("/", () => {});
// post all todo
router.post("/all", () => {});
// post all todo
router.put("/:id", () => {});
// post all todo
router.delete("/:id", () => {});

module.exports = router;
