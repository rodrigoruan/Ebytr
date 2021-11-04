const sortTasks = (setData, data, setRefresh, refresh, key) => {
  setData(data.sort((a, b) => a[key].localeCompare(b[key])));
  setRefresh(!refresh);
};

export default sortTasks;
