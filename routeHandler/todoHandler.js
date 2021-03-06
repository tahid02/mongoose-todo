const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const checkLogin = require("../middlewares/checkLogin");
const [userHandler, User] = require("./userHandler");
const todoSchema = require("../schemas/todoSchema");
const Todo = new mongoose.model("Todo", todoSchema);

// middle wares
router.use(checkLogin);
// get all the todo

router.get("/", checkLogin, async (req, res) => {
  // now, checkLogin middleware will work first and if there is no error ...
  //then next() middleware will call ( here is third parameter's (req,res) function.. as it is also a middleware)
  // if these middleware has any error , then the errorHandler middleware (in index.js file) will be called and will send response to the user\
  // though we have created a custom errorHandler , at the very end there always have a errorHandler middleware by default
  try {
    await Todo.find({ status: "inactive" })
      .populate("user", "user title -_id")
      //parameter 1>> collection name("User") , we ref in schema
      // parameter two > properties of the document , we want(user title)  and not(_id)
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
router.post("/", checkLogin, async (req, res) => {
  console.log("request", req);
  try {
    const newTodo = await new Todo({
      ...req.body,
      user: req.userId,
    });
    console.log(newTodo);
    const todo = await newTodo.save();
    const updated = await User.updateOne(
      { _id: req.userId },
      {
        $push: {
          todos: todo._id,
        },
      }
    );
    console.log({ updated });
    res.status(200).json({
      message: "post added successfully",
    });
  } catch (error) {
    res.status(500).send(`todo post error ${error}`);
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
