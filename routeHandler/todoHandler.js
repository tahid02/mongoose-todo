const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const todoSchema = require("../schemas/todoSchema");
const Todo = new mongoose.model("Todo", todoSchema);

// get all the todo

router.get("/", async (req, res) => {
  try {
    await Todo.find({ status: "active" })
      .select({
        // we will get the documents accepts these properties
        __v: 0,
        date: 0,
      })
      .limit(2) // we will get only two documents
      .exec((err, data) => {
        if (err) {
          console.log({ err });
          res.status(500).json({
            error: "there was an  error in fetching todo",
          });
        } else {
          console.log("fetch success");
          res.status(200).json({
            result: data,
            message: " todo fetched successfully",
          });
        }
      });
  } catch (err) {
    res.send({ err });
  }
});

// get a todo by id
router.get("/:id", async (req, res) => {
  try {
    // const todoData=   Todo.find({ _id: req.params.id })// this will return  the founded document in an array
    await Todo.find({ _id: req.params.id }, (err, data) => {
      if (err) {
        console.log({ err });
        res.status(500).json({
          error: "there was an  error in fetching todo",
        });
      } else {
        console.log("fetch success");
        res.status(200).json({
          result: data,
          message: " todo fetched successfully",
        });
      }
    });
  } catch (err) {
    res.send({ err });
  }
});

// post a todo
router.post("/", async (req, res) => {
  try {
    const newTodo = await new Todo(req.body);
    console.log(req.body);
    await newTodo.save((err) => {
      if (err) {
        console.log({ err });
        res.status(500).json({
          error: "there was an  error in posting todo",
        });
      } else {
        console.log("post success");
        res.status(200).json({
          message: "post added successfully",
        });
      }
    });
  } catch (error) {
    res.send(`post error ${error}`);
    console.log(error);
  }
});

// post multiple todo
router.post("/all", async (req, res) => {
  await Todo.insertMany(req.body, (err) => {
    if (err) {
      console.log({ err });
      res.status(500).json({
        error: "there was an  error in posting all todo",
      });
    } else {
      console.log("post success");
      res.status(200).json({
        message: "todo posts were added successfully",
      });
    }
  });
});

// update  todo
router.put("/:id", async (req, res) => {
  const updatedDocument = await Todo.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        status: "inactive",
      },
    },
    {
      new: true, // now , this method will provide the updated (newer) document
      useFindAndModify: false,
    },
    (err) => {
      if (err) {
        console.log({ err });
        res.status(500).json({
          error: "there was an  error in updating todo",
        });
      } else {
        console.log("update success");
        res.status(200).json({
          message: "todo updated successfully",
        });
      }
    }
  );
  console.log("updated result" + updatedDocument);
});

// delete  todo
router.delete("/:id", async (req, res) => {
  try {
    await Todo.deleteOne({ _id: req.params.id }, (err, data) => {
      if (err) {
        console.log({ err });
        res.status(500).json({
          error: "there was an  error in deleting todo",
        });
      } else {
        console.log("delete success");
        res.status(200).json({
          result: data,
          message: " todo deleted successfully",
        });
      }
    });
  } catch (err) {
    res.send({ err });
  }
});
module.exports = router;
