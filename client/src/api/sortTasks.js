//  functions used to sort tasks, receives a react state to change and set the new sorted data
//  refresh is too a state to reload component

const sortByLetter = (setData, data, setRefresh, refresh) => {
  setData(data.sort((a, b) => a.description.localeCompare(b.description)));
  setRefresh(!refresh);
};

const sortByDate = (setData, data, setRefresh, refresh) => {
  setData(data.sort((a, b) => new Date(a.momentDate) - new Date(b.momentDate).getTime()));
  setRefresh(!refresh);
};

const sortByStatus = (setData, data, setRefresh, refresh) => {
  setData(data.sort((a, b) => a.status.localeCompare(b.status)));
  setRefresh(!refresh);
};

module.exports = {
  sortByLetter,
  sortByDate,
  sortByStatus,
};
