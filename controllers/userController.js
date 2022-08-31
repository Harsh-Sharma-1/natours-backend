const User = require('../models/userModel');
const catchAsync = require("../utils/catchAsync");
const AppError = require('../utils/appError');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      tours: users,
    },
  });
  });
  
exports.getUserById = (req, res) => {
    res.status(500).json({
      status: 'error',
      message: 'This route is not yet implemented'
    })
  }
  
exports.addNewUser = (req, res) => {
    res.status(500).json({
      status: 'error',
      message: 'This route is not yet implemented'
    })
  }
  
exports.updateUser = (req, res) => {
    res.status(500).json({
      status: 'error',
      message: 'This route is not yet implemented'
    })
  }
  
exports.deleteUser = (req, res) => {
    res.status(500).json({
      status: 'error',
      message: 'This route is not yet implemented'
    })
  }
  