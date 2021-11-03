const verifyEmail = (email) => /\w+@\w+\.com(\.br)?$/.test(email);

const verifyName = (name) => name.length > 3;

const verifyPassword = (password) => password.length > 5;

module.exports = {
  verifyEmail,
  verifyName,
  verifyPassword,
};
