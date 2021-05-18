import React, { Component } from 'react';
import './ToDos.css';
import { addTodo, getTodos, deleteTodo, completeTodo } from '../Utils/todos-api';

export default class ToDos extends Component {

  state = {
    todo: '',
    todoArray: []
  }

  async componentDidMount() {
    try {
      const todoArray = await getTodos();
      this.setState({ todoArray: todoArray });
      // console.log(this.state.todoArray);
    }
    catch (err) {
      console.log(err);
    }
  }

  handleAdd = async e => {
    e.preventDefault();
    const { todo, todoArray } = this.state;
    console.log(todoArray);

    try {
      const addedTodo = await addTodo({ task: todo, completed: false });
      console.log(addedTodo);
      const updatedTodos = [...todoArray, addedTodo];
      this.setState({
        todoArray: updatedTodos,
        todo: ''
      });
    }
    catch (err) {
      console.log(err.message);
    }
  }

  handleTodoChange = ({ target }) => {
    this.setState({ todo: target.value });
  }

  handleDelete = async id => {
    const { todoArray } = this.state;

    try {
      await deleteTodo(id);

      const updatedTodos = todoArray.filter(todo => todo.id !== id);
      this.setState({ todo: updatedTodos });
    }
    catch (err) {
      console.log(err);
    }
  }

  handleComplete = async id => {
    const { todoArray } = this.state;

    try {
      const updatedTodo = await completeTodo(id);

      const updatedTodos = todoArray.map(todo => todo.id === id ? updatedTodo : todo);
      this.setState({ todoArray: updatedTodos });
    }
    catch (err) {
      console.log(err);
    }
  }

  render() {

    const { todo, todoArray } = this.state;
    return (
      <div className="ToDos">

        <form onSubmit={this.handleAdd}>
          Add a new responsibility:
          <input value={todo} onChange={this.handleTodoChange} />
        </form>

        <ul>
          {todoArray.map(todo => (
            <li key={todo.id}>
              <h2>{todo.task}</h2>
              <span>{todo.completed} {todo.completed === 'true' ? 'Completed' : 'Get to Work'}</span>
              <button className='complete' onClick={() => this.handleComplete(todo.id)}>Did Work</button>
              <button className='delete' onClick={() => this.handleDelete(todo.id)}>Don't Want to Do Work</button>
            </li>
          ))}
        </ul>

      </div>
    );
  }
}