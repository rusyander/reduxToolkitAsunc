import React from "react";

export default function TodoForm(props: any) {
  return (
    <div>
      <label htmlFor="text">
        <input
          type="text"
          value={props.text}
          onChange={(e: any) => props.setText(e.target.value)}
        />
        <button onClick={props.addTask}>Add Todo</button>
      </label>
    </div>
  );
}
