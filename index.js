const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
var db = require("./db");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/todos", async (req, res) => {
  // res.send("test todo");
  var todos = await db.getAll();
  res.json(todos);
});

app.post("/todos", async (req, res) => {
  var todo = req.body;
  console.log(todo);
  await db.addTodo(todo);
  res.json(todo);
});

app.put("/todos/:id", (req, res) => {
  var id = req.params.id;
  console.log("completed id is: " + id);
  db.updateTodo(id);
  res.json({
    id: id,
    status: "completed",
  });
});

app.delete("/todos/:id", (req, res) => {
  var id = req.params.id;
  console.log("deleted id is: " + id);
  db.deleteTodo(id);
  res.json({
    id: id,
    status: "deleted",
  });
});

var port = process.env.PORT||3000;

app.listen(port, ()=> {
  console.log("listening on "+port);
});
