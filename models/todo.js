let mongoose = require('mongoose');
let schema = mongoose.Schema;

let todoSchema = new schema({
  'title': String,
  'deadline': String,
  'priority': Number
});

module.exports = mongoose.model('todo', todoSchema);
