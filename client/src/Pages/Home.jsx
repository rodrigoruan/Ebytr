import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Task from '../components/Task';
import addTask from '../api/addTask';
import addTaskIcon from '../imgs/addTask.svg';
import todoIcon from '../imgs/todoIcon.svg';
import '../css/Home.css';

function Home() {
  const [data, setData] = React.useState(null);
  const [logged, setLogged] = React.useState(false);
  const [taskDescription, setTaskDescription] = React.useState('');
  const [name, setName] = React.useState('');
  const history = useHistory();

  const fetchTasksFromApi = () => {
    axios
      .get('http://localhost:5000/')
      .then((response) => setData(response.data));
  };

  const logOutUser = () => {
    localStorage.clear();
    setLogged(false);
    history.push('/');
  };

  const verifyAndAddTask = () => taskDescription && addTask(taskDescription, fetchTasksFromApi);

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    const storageName = localStorage.getItem('name');
    if (token) setLogged(true);
    setName(storageName);
  }, []);

  React.useEffect(() => {
    fetchTasksFromApi();
  }, []);

  if (!data) return <div>Loading...</div>;
  if (!logged) return <div>User not logged</div>;

  return (
    <div>
      <header className="header-container">
        <div>
          <img src={todoIcon} alt="todo icon" />
          <p className="user-logged">
            Welcome
            {' '}
            <span className="username">{name}</span>
            !
          </p>
        </div>
        <button type="button" onClick={() => logOutUser()}>
          Log Out
        </button>
      </header>

      <hr />

      <div className="task-input-container">
        <input
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
      <div>
        {data.map(({ description, name: task, _id: id }) => (
          <Task
            key={id}
            description={description}
            name={task}
            id={id}
            fetch={fetchTasksFromApi}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
