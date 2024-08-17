import React from "react";
import TodoItem from "./Todo";

function TodoView(props) {
  return (
    <ul className="list-group list-group-flush">
      {props.todoList.map((todo, index) => (
        <TodoItem 
          key={index} 
          todo={todo} 
          todoList={props.todoList}
          setTodoList={props.setTodoList}
        />
      ))}
    </ul>
  );
}

export default TodoView;
