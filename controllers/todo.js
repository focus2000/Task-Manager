const mongoose = require("mongoose");

const Todo = require("../models/todo");

exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.id });
    res.json(todos);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.addTodo = async (req, res) => {
  const { title } = req.body;
  try {
    let todo = new Todo({
      user: req.user.id,
      title,
    });
    todo = await todo.save();
    res.json(todo);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    let todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ msg: "Todo not found" });
    }
    await Todo.findByIdAndRemove(req.params.id);
    res.send("Todo removed");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.updateTodo = async (req, res) => {
  const { title } = req.body;
  const updatedTodo = { title };

  try {
    let todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ msg: "Todo not found" });
    }
    todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { $set: updatedTodo },
      { new: true }
    );
    res.send(todo);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
