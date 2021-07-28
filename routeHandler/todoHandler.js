const express = require("express");
const router = express.Router();

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
