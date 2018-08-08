const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : '';
  data.company = !isEmpty(data.company) ? data.company : '';
  data.from = !isEmpty(data.from) ? data.from : '';

  if (Validator.isEmpty(data.title)) {
    errors.title = 'Job title field is requried';
  }

  if (Validator.isEmpty(data.company)) {
    errors.company = 'Company title field is requried';
  }

  if (Validator.isEmpty(data.from)) {
    errors.from = 'From date title field is requried';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
