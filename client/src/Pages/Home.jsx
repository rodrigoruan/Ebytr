import React from 'react';
import axios from 'axios';
import Task from '../components/Task';

function Home() {
  const [data, setData] = React.useState(null);
  const [logged, setLogged] = React.useState(false);

  React.useEffect(() => {
    const storage = localStorage.getItem('token');
    if (storage) setLogged(true);

    axios
      .get('http://localhost:5000/')
      .then((response) => setData(response.data));
  }, []);

  if (!data) return <div>Loading...</div>;
  if (!logged) return <div>Usuário não logado</div>;

  return (
    <div>
      <input placeholder="Add a task here..." />
      <button type="button">Add</button>
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
