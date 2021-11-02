import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { decodeToken } from 'react-jwt';
import Task from '../components/Task';
import addTask from '../api/addTask';
import addTaskIcon from '../imgs/addTask.svg';
import todoIcon from '../imgs/todoIcon.svg';
import sleepIcon from '../imgs/sleep.svg';
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

  const sortByLetter = () => {
    setData(data.sort((a, b) => a.description.localeCompare(b.description)));
    setRefresh(!refresh);
  };

  const sortByDate = () => {
    setData(data.sort((a, b) => new Date(a.momentDate) - new Date(b.momentDate).getTime()));
    setRefresh(!refresh);
  };

  const sortByStatus = () => {
    setData(data.sort((a, b) => a.status.localeCompare(b.status)));
    setRefresh(!refresh);
  };

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

  const verifyAndAddTask = () => {
    if (taskDescription) {
      addTask(taskDescription, fetchTasksFromApi);
      setTaskDescription('');
    }
  };

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setLogged(true);
    const decoded = decodeToken(token);
    setName(decoded.data.name);
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
        <button type="button" onClick={sortByLetter}>
          <img src={alpSort} alt="alphabet icon" />
        </button>
        <button type="button" onClick={sortByDate}>
          <img src={calendarSort} alt="alphabet icon" />
        </button>
        <button type="button" onClick={sortByStatus}>
          <img src={statusSort} alt="alphabet icon" />
        </button>
      </div>
      <div>
        {data.length ? (
          data.map(
            ({
              description, name: task, _id: id, status, momentDate,
            }) => (
              <Task
                key={id}
                description={description}
                name={task}
                id={id}
                fetch={fetchTasksFromApi}
                status={status}
                date={momentDate}
              />
            ),
          )
        ) : (
          <div className="no-tasks-container">
            <h1 className="no-tasks">
              Seems doesn&lsquo;t have any tasks yet...
            </h1>
            <img src={sleepIcon} alt="sleep icon" />
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
