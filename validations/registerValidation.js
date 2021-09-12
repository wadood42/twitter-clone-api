const validator = require("validator");

const registerValidation = function (data) {
  const errors = {};

  if (!validator.isEmail(data.email)) {
    errors.email = "Email is not valid";
  }

  if (validator.isEmpty(data.username)) {
    errors.username = "Username is required";
  }
  if (data.username.length > 0 && data.username.length < 4) {
    errors.username = "Username should be at least 6 characters";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "Password is requied";
  }
  if (data.password.length > 0 && data.password.length < 6) {
    errors.password = "Password should be at least 6 characters";
  }

  return {
    errors,
    isValid: () => Object.keys(errors).length === 0,
  };
};

module.exports = registerValidation;
