const MongoClient = require("mongodb").MongoClient;

const uri = `mongodb+srv://todoserver:${process.env.MONGO_PASS}@cluster0.v4xsjxk.mongodb.net/?retryWrites=true&w=majority`;

async function getAll() {
  var client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  var db = client.db("mydb");
  var todos = await db.collection("todos").find().toArray();
  console.log(todos);
  return todos;
}

async function addTodo(todo) {
  var client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  var db = client.db("mydb");
  var result = await db.collection("todos").insertOne(todo);
  console.log(result);
}

async function updateTodo(id) {
  var client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  var db = client.db("mydb");
  var query = { id: parseInt(id) };
  var todo = await db.collection("todos").findOne(query);
  console.log(todo);
  todo.completed = !todo.completed;
  var result = await db.collection("todos").updateOne(query, { $set: todo });
  console.log(result);
}

async function deleteTodo(id) {
  var client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  var db = client.db("mydb");
  var query = { id: parseInt(id) };
  var result = await db.collection("todos").deleteOne(query);
  console.log(result);
}

module.exports.getAll = getAll;
module.exports.addTodo = addTodo;
module.exports.updateTodo = updateTodo;
module.exports.deleteTodo = deleteTodo;
