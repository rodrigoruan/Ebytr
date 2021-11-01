const validateData = (...informations) => informations.includes(undefined);

const validateEmailFormat = (email) => !/^\w+@\w+\.com(\.br)?$/.test(email);

module.exports = {
  validateData,
  validateEmailFormat,
};
