import { useState } from 'react';

import Todo from "./compenents/Todo";
import './App.css';
import TodoForm from "./compenents/TodoForm";
import Search from "./compenents/Search";

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Criar funcionalidade X no sistema', category: 'Trabalho', isCompleted: false },
    { id: 2, text: 'Ir para academia', category: 'Pessoal', isCompleted: false },
    { id: 3, text: 'Estudar React', category: 'Estudos', isCompleted: false },
  ]);

  const [search, setSearch] = useState('');

  const addTodo = (text, category) => {
    const newTodos = [
      ...todos,
      {
        id: Math.floor(Math.random() * 10000),
        text,
        category,
        isCompleted: false,
      },
    ];
    setTodos(newTodos);
  };

  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const completeTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  return (
    <div className="app">
      <h1>Lista de Tarefas</h1>
      <Search search={search} setSearch={setSearch} />
      <div className="todo-list">
        {todos
          .filter((todo) =>
            todo.text.toLowerCase().includes(search.toLowerCase())
          )
          .sort((a, b) => a.text.localeCompare(b.text)) // Ordena alfabeticamente
          .map((todo) => (
            <Todo key={todo.id} todo={todo} removeTodo={removeTodo} completeTodo={completeTodo} />
          ))}
      </div>
      <TodoForm addTodo={addTodo} />
    </div>
  );
}

export default App;
