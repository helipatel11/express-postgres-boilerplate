const TodoItem = require('../models').TodoItem;

const createTodoItems = async (req, res) => {
  try {
    const todoItems = await TodoItem.create({
      content: req.body.content,
      todoId: req.params.todoId,
    });
    console.log(todoItems)
    return res.status(201).json({ todoItems })
  } catch (err) {
    return err.status(500).json({ err: err.message });

  }
}

const updateTodoItem = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await TodoItem.update(req.body, {
      where: { todoId: id }
    });
    if (updated) {
      const updatedTodoItem = await TodoItem.findOne({ where: { todoId: id } });
      return res.status(200).json({ todo: updatedTodoItem });
    }
    throw new Error('Todo not found');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  createTodoItems,
  updateTodoItem,
}