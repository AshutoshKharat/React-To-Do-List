import React from "react";
import axios from "axios";

function TodoItem(props) {
    const deleteTodo = (title) => {
        axios.delete(`http://localhost:8000/api/todo/${title}`)
            .then(res => {
                props.setTodoList(props.todoList.filter(todo => todo.title !== title));
            });
    };

    return (
        <li className="list-group-item d-flex justify-content-between align-items-center">
            <span style={{ fontWeight: "bold", color: '#00684A' }}>{props.todo.title}</span> {props.todo.description}
            <button className="btn btn-sm btn-accent" onClick={() => deleteTodo(props.todo.title)}>
                &times;
            </button>
        </li>
    );
}

export default TodoItem;
