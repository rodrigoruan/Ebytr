import React from 'react';

function App() {
  const [tasks, setTasks] = React.useState([]);

  const fetchFromApi = () => fetch('http://localhost:5000/')
      .then((res) => res.json())
      .then((r) => setTasks(r));

  React.useEffect(() => {
    fetchFromApi();
  }, []);

  console.log(tasks)

  return <div></div>;
}

export default App;
