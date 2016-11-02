let express = require('express');
let mongoose = require('mongoose');
let app = express();
let Todo = require('./models/todo');
let bodyParser = require('body-parser');

let port = 4201;

let router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/todos');

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE');
  next();
});

router.route('/')
  .get((req, res) => {
    Todo.find((err, todos) => {
      if (err) res.send(err);
      res.json(todos);
    });
  })
  .post((req, res) => {
    let todo = new Todo();
    todo.title = req.body.title;
    todo.deadline = req.body.deadline;
    todo.priority = req.body.priority;
    todo.save((err) => {
      if (err) res.send(err);
      res.json(todo);
    });
  });

router.delete('/:id', (req, res) => {
  Todo.remove({
    _id: req.params.id
  }, (err, todo) => {
    if (err) res.send(err);
    res.json(todo);
  });
});

app.use('/', router);

app.listen(port);
