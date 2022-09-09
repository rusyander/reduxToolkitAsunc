import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { deleteTodos, toggleTodo, deleteTodo } from "../store/todoSlise";

export default function TodoItem(props: any) {
  const id = props.todos.id;
  const dispatch = useDispatch();

  const deleteTodo = (id: any) => {
    dispatch(deleteTodos(id));
  };

  const toggleTodos = (id: any) => {
    dispatch(toggleTodo(id));
  };

  return (
    <div>
      <li>
        <input
          type="checkbox"
          checked={props.todos.completed}
          name=""
          id=""
          onChange={() => toggleTodos(id)}
        />
        <span>{props.todos.title}</span>
        <span
          style={{ marginLeft: "50px", color: "red", cursor: "pointer" }}
          onClick={() => deleteTodo(id)}
        >
          &times;
        </span>
      </li>
    </div>
  );
}
