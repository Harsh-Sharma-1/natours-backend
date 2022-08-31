const AppError = require("../utils/appError");

const handleCastErrorDB = err =>{
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
}

const handleDuplicateFieldsDB = err =>{
  // const value = err.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/);
  const value = err.keyValue.name;
  const message = `Duplicate field value ${value}.Please use another value`;
  return new AppError(message, 400);
}

const handleValidationErrorDB = err =>{
  const errors = Object.values(err.errors).map(val => val.message);
  const message = `invalid input data ${errors.join('. ')}`;
  return new AppError(message, 400);
}

const handleJWTError = err => new AppError('Invalid token. Please log in again!', 401)

const handleJWTExpireError = err => new AppError('Expired token. Please log in again!',401)

const sendErrorDev = (err, res) =>{
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error:err,
    stack: err.stack
  })
}

const sendErrorProd = (err, res) =>{
  // Operational, trusted error: send message to client
  if(err.isOperational){
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });

    // Programming or other unknown error
  } else{
    // 1) Log error
    console.error('ERROR:',err);
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!'
    })
  }

};

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    if(process.env.NODE_ENV === "development"){
      sendErrorDev(err, res);
    }else{
      let name = err.name;
      let error = {...err};
      if(name === 'CastError') error = handleCastErrorDB(error);
      if(error.code === 11000) error = handleDuplicateFieldsDB(error);
      if(name === 'ValidationError') error = handleValidationErrorDB(error);
      if(name ==='JsonWebTokenError') error = handleJWTError(error);
      if(name === 'TokenExpiredError') error = handleJWTExpireError(error);
      sendErrorProd(error, res);
    }
  }