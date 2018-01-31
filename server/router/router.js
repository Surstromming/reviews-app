const express = require('express');
const router = express.Router();
const reviewsController = require('../controllers/reviews-controller');
const { catchErrors } = require('../handlers/error-handlers');

router.get('/', reviewsController.homePage);

router.get('/api/getInfo', catchErrors(reviewsController.getInfo));
router.get('/api/getFilterOptions', catchErrors(reviewsController.getFilterOptions));
router.get('/api/getReviews', catchErrors(reviewsController.getReviews));

router.get('/api/updateReviews', catchErrors(reviewsController.updateList));
router.get('/api/getCount', catchErrors(reviewsController.getCount));
router.get('/api/page/:page', catchErrors(reviewsController.changePage));

module.exports = router;
