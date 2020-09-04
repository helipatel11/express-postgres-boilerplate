const Todo = require('../models').Todo;
const TodoItem = require('../models').TodoItem;

const createTodo = async (req, res) => {
  try {
    const todo = await Todo.create(req.body);
    return res.status(201).json({ todo });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
}

const listTodos = async (req, res) => {
  try {
    const todos = await Todo.findAll({
      include: [{
        model: TodoItem,
        as: 'todoItems',
      }],
    });
    return res.status(201).json({ todos });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
}

const findTodo = async (req, res) => {
  try {
    const todoInstance = await Todo.findAll({
      where: { id: req.params.todoId },
      include: [{
        model: TodoItem,
        as: 'todoItems',
      }],
    })
    return res.status(201).json({ todoInstance });
  } catch (err) {
    return res.status(500).json({ err: err.message })
  }
}

const updateTodo = async (req, res) => {
  try {
    const { todoId } = req.params;
    const [updated] = await Todo.update(req.body, {
      where: { id: todoId }
    });
    if (updated) {
      const updatedTodo = await Todo.findOne({ where: { id: todoId } });
      return res.status(200).json({ todo: updatedTodo });
    }
    throw new Error('Post not found');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { todoId } = req.params;
    const deleted = await Todo.destroy({
      where: { id: todoId }
    });
    if (deleted) {
      return res.status(204).send("Todo deleted");
    }
    throw new Error("Todo not found");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  createTodo,
  listTodos,
  findTodo,
  updateTodo,
  deleteTodo
}
