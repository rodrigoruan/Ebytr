import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { decodeToken } from 'react-jwt';

import { sortByDate, sortByLetter, sortByStatus } from '../api/sortTasks';
import addTask from '../api/addTask';

import Header from '../components/Header';
import TasksNotFound from '../components/TasksNotFound';
import Task from '../components/Task';

import addTaskIcon from '../imgs/addTask.svg';
import alpSort from '../imgs/alpSort.svg';
import calendarSort from '../imgs/calendarSort.svg';
import statusSort from '../imgs/statusSort.svg';

import '../css/Home.css';

function Home() {
  const [data, setData] = React.useState(null);
  const [logged, setLogged] = React.useState(false);
  const [taskDescription, setTaskDescription] = React.useState('');
  const [name, setName] = React.useState('');
  const [refresh, setRefresh] = React.useState(false);
  const history = useHistory();

  const fetchTasks = () => axios
    .get('http://localhost:5000/')
    .then((response) => setData(response.data));

  React.useEffect(() => {
    fetchTasks();
  }, []);

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setLogged(true);
      const decoded = decodeToken(token);
      setName(decoded.data.name);
    }
  }, []);

  const logOutUser = () => {
    localStorage.clear();
    setLogged(false);
    history.push('/');
  };

  const verifyAndAddTask = () => {
    if (taskDescription) {
      addTask(taskDescription, fetchTasks);
      setTaskDescription('');
    }
  };

  if (!data) return <div>Loading...</div>;
  if (!logged) return <div>User not logged</div>;

  return (
    <div>
      <Header name={name} logOutUser={logOutUser} />

      <hr />

      <div className="task-input-container">
        <input
          value={taskDescription}
          placeholder="Add a task here..."
          onChange={({ target }) => setTaskDescription(target.value)}
        />
        <button type="button" onClick={verifyAndAddTask}>
          <img
            className="add-task-image"
            src={addTaskIcon}
            alt="add task icon"
          />
        </button>
      </div>

      <div className="task-buttons-order">
        <button
          type="button"
          onClick={() => sortByLetter(setData, data, setRefresh, refresh)}
        >
          <img src={alpSort} alt="alphabet icon" />
        </button>
        <button
          type="button"
          onClick={() => sortByDate(setData, data, setRefresh, refresh)}
        >
          <img src={calendarSort} alt="calendar icon" />
        </button>
        <button
          type="button"
          onClick={() => sortByStatus(setData, data, setRefresh, refresh)}
        >
          <img src={statusSort} alt="status icon" />
        </button>
      </div>

      <div>
        {data.length === 0 ? (<TasksNotFound />)
          : (data.map(({
            description, name: task, _id: id, status, momentDate,
          }) => (
            <Task
              key={id}
              {...{
                description, task, id, fetchTasks, status, momentDate,
              }}
            />
          )))}
      </div>
    </div>
  );
}

export default Home;
