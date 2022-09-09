import React from "react";
import TodoItem from "./todoItem";
import { useSelector } from "react-redux";

export default function TodoList(props: any) {
  const todos = useSelector((state: any) => state.todos.todos);
  return (
    <div>
      <ol>
        {todos.map((todo: any) => (
          <TodoItem key={todo.id} todos={todo} />
        ))}
      </ol>
    </div>
  );
}
