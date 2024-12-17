const { ValidationError } = require('sequelize');
const boom = require('@hapi/boom');
const response = require('../network/response'); // Centralización de respuestas

function logErrors(err, req, res, next) {
  console.error('Error log:', err);
  next(err);
};


function ormErrorHandler(err, req, res, next) {
  if (err instanceof ValidationError) {
    response.error(req, res, err.name, 409, err.errors);
  } else {
    next(err);
  }
};

function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    response.error(req, res, output.payload.message, output.statusCode, err.data);
  } else {
    next(err);
  }
}

function genericErrorHandler(err, req, res, next) {
  response.error(req, res, err.message || 'Internal Server Error', 500);
}

module.exports = {
  logErrors,
  ormErrorHandler,
  boomErrorHandler,
  genericErrorHandler,
};
