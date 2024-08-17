import axios from 'axios';
import './App.css';
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import TodoView from './components/TodoListView';

function App() {

  const [todoList, setTodoList] = useState([]);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:8000/api/todo').then(res => {
      setTodoList(res.data);
    });
  }, []);

  const addTodoItem = () => {
    axios.post('http://localhost:8000/api/todo/', { 'title': title, 'description': desc })
      .then(res => {
        setTodoList([...todoList, res.data]);
        setTitle('');
        setDesc('');
      });
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
      <nav className={`navbar navbar-expand-lg ${darkMode ? 'navbar-dark bg-dark' : 'navbar-light'}`}>
        <div className="container-fluid">
          <a className="navbar-brand" href="#" style={{ color: '#00684A' }}>Task Manager</a>
          <button className="btn" style={{ color: darkMode ? '#ffffff' : '#000000',border: `solid 1px ${darkMode ? '#ffffff' : '#000000'}`}}
            onClick={toggleDarkMode}>
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </nav>
      <div className="container-fluid py-5">
        <div className='row justify-content-center'>
          <div className='col-lg-6 col-md-8 col-sm-10'>
            <div className={`card shadow-lg ${darkMode ? 'bg-dark' : 'bg-white'}`}>
              <div className='card-body'>
                <h3 className={`card-title text-center ${darkMode ? 'text-light' : 'text-success'}`}>Add Your Tasks</h3>
                <div className='form-group mb-4'>
                  <input className='form-control' placeholder='Title' value={title} onChange={event => setTitle(event.target.value)} />
                </div>
                <div className='form-group mb-4'>
                  <input className='form-control' placeholder='Description' value={desc} onChange={event => setDesc(event.target.value)} />
                </div>
                <div className='text-center'>
                  <button className='btn btn-lg btn-accent' onClick={addTodoItem}>Add Task</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='row justify-content-center mt-5'>
          <div className='col-lg-8 col-md-10 col-sm-12'>
            <div className={`card shadow-lg ${darkMode ? 'bg-dark' : 'bg-white'}`}>
              <div className={`card-header ${darkMode ? 'text-light' : 'text-success'}`}>
                <h4>Your Tasks</h4>
              </div>
              <div className='card-body'>
                <TodoView todoList={todoList} setTodoList={setTodoList} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
