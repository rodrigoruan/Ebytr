import React from 'react';
import axios from 'axios';

import sortTasks from '../api/sortTasks';
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
  const [taskDescription, setTaskDescription] = React.useState('');
  const [refresh, setRefresh] = React.useState(false);

  const fetchTasks = () => axios
    .get('https://ebytr-rodrigo.herokuapp.com')
    .then((response) => setData(response.data));

  React.useEffect(() => {
    fetchTasks();
  }, []);

  const verifyAndAddTask = () => {
    if (taskDescription) {
      addTask(taskDescription, fetchTasks);
      setTaskDescription('');
    }
  };

  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <Header />

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
          onClick={() => sortTasks(setData, data, setRefresh, refresh, 'description')}
        >
          <img src={alpSort} alt="alphabet icon" />
        </button>
        <button
          type="button"
          onClick={() => sortTasks(setData, data, setRefresh, refresh, 'momentDate')}
        >
          <img src={calendarSort} alt="calendar icon" />
        </button>
        <button
          type="button"
          onClick={() => sortTasks(setData, data, setRefresh, refresh, 'status')}
        >
          <img src={statusSort} alt="status icon" />
        </button>
      </div>

      <div>
        {data.length === 0 ? (
          <TasksNotFound />
        ) : (
          data.map(
            ({
              description, name: task, _id: id, status, momentDate,
            }) => (
              <Task
                key={id}
                {...{
                  description,
                  task,
                  id,
                  fetchTasks,
                  status,
                  momentDate,
                }}
              />
            ),
          )
        )}
      </div>
    </div>
  );
}

export default Home;
