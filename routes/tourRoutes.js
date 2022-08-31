const express = require('express');
const router = express.Router();
const {
    getAllTours,
    addNewTour,
    getToursById,
    updateTour,
    deleteTour,
    aliasTopTours,
    getTourStats,
    getMonthlyPlan
} = require('../controllers/tourController');
const {protect} = require('../controllers/authController')


router.route('/top-5-cheap')
      .get(aliasTopTours,getAllTours)

router.route('/tour-stats')
      .get(getTourStats);

router.route('/monthly-plan/:year')
      .get(getMonthlyPlan);

router.route('/')
  .get(protect,getAllTours)
  .post(addNewTour);

router.route('/:id')
  .get(getToursById)
  .patch(updateTour)
  .delete(deleteTour);

module.exports = router;