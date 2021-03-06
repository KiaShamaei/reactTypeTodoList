import React, { ChangeEvent, FormEvent, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { Row } from "./Row";
import { data } from "../todos";
import { AddTodo } from "./AddTodo";

type Todo = {
  id: string;
  task: string;
  isCompleted: boolean;
  priority : string | number
};

export const Todos = () => {
  const [todos, setTodos] = useState<Todo[]>(data.sort(compare));
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("");
  const lengthTodos = todos.length;
  const hasTodos = todos.length > 0;
  const remainingTodos = todos.filter((todo) => !todo.isCompleted).length;
  function compare(a : Todo, b : Todo) {
    if (+a.priority > +b.priority) {
      return -1;
    }
    if (+a.priority < +b.priority) {
      return 1;
    }
    // a must be equal to b
    return 0;
  }

  const handleAddTodo = (todo: Todo) => {
    const updatedTodos = [...todos, todo];
    let sortUpdateTodos = updatedTodos.sort(compare)
    setTodos(sortUpdateTodos);
    setTask("");
  };

  const handleChangeText = (e: ChangeEvent) => {
    const { value } = e.target as HTMLInputElement;
    setTask(value);
  };
  const handleChangePriority = (e: ChangeEvent) => {
    const { value } = e.target as HTMLInputElement;
    setPriority(value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const todo = {
      id: uuidv4(),
      task: task,
      priority : priority,
      isCompleted: false,
    };
    priority && task && handleAddTodo(todo);
	setPriority("");
	setTask("");
  };

  const handleDelete = (id: string) => {
    let updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const handleCheck = (id: string) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          isCompleted: !todo.isCompleted,
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <section className="w-10/12 sm:w-10/12 lg:w-1/2 max-w-2xl border rounded shadow-lg px-4 py-10 bg-white flex flex-col items-center">
      <AddTodo
        task={task}
		priority={priority}
        handleChangeText={handleChangeText}
        handleChangePriority={handleChangePriority}
        handleSubmit={handleSubmit}
      />
      {todos.map((todo) => (
        <Row
          key={todo.id}
          todo={todo}
          handleDelete={handleDelete}
          handleCheck={handleCheck}
        />
      ))}
      {!hasTodos ? (
        <p className="flex justify-center items-center text-xl mt-5 font-medium text-red-500">
          No todos left!
        </p>
      ) : (
        <p className="flex justify-center items-center text-lg mt-3 font-medium">{`${remainingTodos} of ${lengthTodos} todos left`}</p>
      )}
    </section>
  );
};
