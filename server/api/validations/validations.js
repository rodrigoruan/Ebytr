const { getAllAdmins } = require('../models/usersModel');
const { getAllTasks } = require('../models/tasksModel');

const validateData = (...informations) => informations.some((information) => !information);

const validateEmailFormat = (email) => !/^\w+@\w+\.com(\.br)?$/.test(email);

const userOwnsTaskOrIsAdmin = async (id, email) => {
  const allTasks = await getAllTasks();

  const allAdmins = await getAllAdmins();

  const userIsAdmin = allAdmins.some((admin) => admin.email === email);

  const userOwnsTask = allTasks.find(
    ({ email: taskEmail, _id: taskId }) => taskId.toString() === id && email === taskEmail,
  );

  return !userIsAdmin && !userOwnsTask;
};

module.exports = {
  validateData,
  validateEmailFormat,
  userOwnsTaskOrIsAdmin,
};
