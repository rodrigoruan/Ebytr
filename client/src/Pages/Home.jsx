import React from 'react';
import axios from 'axios';
import Task from '../components/Task';
import addTask from '../api/addTask';

function Home() {
  const [data, setData] = React.useState(null);
  const [logged, setLogged] = React.useState(false);
  const [taskDescription, setTaskDescription] = React.useState('');
  const [name, setName] = React.useState('');

  const fetchTasksFromApi = () => {
    axios
      .get('http://localhost:5000/')
      .then((response) => setData(response.data));
  };

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
  if (!logged) return <div>Usuário não logado</div>;

  return (
    <div>
      <p>{name}</p>
      <input
        placeholder="Add a task here..."
        onChange={({ target }) => setTaskDescription(target.value)}
      />
      <button type="button" onClick={() => addTask(taskDescription, fetchTasksFromApi)}>
        Add
      </button>
      <div>
        {data.map((task) => (
          <Task
            key={task.description}
            description={task.description}
            name={task.name}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
