const validateData = (...informations) => informations.some((information) => !information);

const validateEmailFormat = (email) => !/^\w+@\w+\.com(\.br)?$/.test(email);

module.exports = {
  validateData,
  validateEmailFormat,
};
