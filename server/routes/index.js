const todosController = require('../controllers').todos;
const todoItemsController = require('../controllers').todoItems;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Todos API!',
  }));

  //Create a todo 
  app.post('/api/todos', todosController.createTodo);


  //listing all todos
  app.get('/api/todos', todosController.listTodos);

  //find one todo
  app.get('/api/todos/:todoId', todosController.findTodo);

  //update one todo

  app.put('/api/updateTodo/:todoId', todosController.updateTodo);

  //creating todo items
  app.post('/api/todoitems/:todoId', todoItemsController.createTodoItems);

  //update todo item
  app.put('/api/updateTodoItem/:id', todoItemsController.updateTodoItem);


  //delete todo
  app.delete('/api/deleteTodo/:todoId', todosController.deleteTodo);

};
