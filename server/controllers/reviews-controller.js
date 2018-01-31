const mongoose = require('mongoose');
const Review = mongoose.model('Review');
const moment = require('moment');

exports.homePage = (req, res) => {
    res.render('index', { title: 'Reviews' });
}

exports.getInfo = async (req, res) => {
    const weightedInfo = {};
    const weightedAspects = {};
    let ratingSum = null;
    let weightSum = null;

    const reviews = await Review.getRatings();

    reviews.forEach(item => {
        const currentDate = Date.now();
        const entryDate = item.entryDate;
        const currentYear = moment(currentDate).get('year');
        const entryYear = moment(entryDate).get('year');
        const diff = moment.duration(currentDate - entryDate).years();
        const weight = diff < 5 ? 1 - (currentYear - entryYear) * 0.1 : 0.5;
        const weightedRating = item.generalRating * weight;

        ratingSum += weightedRating;
        weightSum += weight;

        for (let key in item.aspects) {
            const aspect = weightedAspects[key] || null;
            weightedAspects[key] = aspect + item.aspects[key] * weight;
        }
    });

    for (let key in weightedAspects) {
        weightedAspects[key] = Math.round((weightedAspects[key] / weightSum) * 10) / 10;
    }

    weightedInfo.general = Math.round((ratingSum / weightSum) * 10) / 10;
    weightedInfo.aspects = weightedAspects;
    weightedInfo.quantity = reviews.length;

    res.json(weightedInfo);
}

exports.getFilterOptions = async (req, res) => {
    const traveledWith = await Review.getTraveledWith();

    res.json(traveledWith);
}




exports.getReviews = async (req, res) => {
    const page = req.params || 1;
    const limit = 20;
    const skip = page * limit - limit;

    const reviews = await Review
        .find()
        .skip(skip)
        .limit(limit);

    res.json(reviews);
}

exports.updateList = async (req, res) => {
    const page = req.params.page || 1;
    const limit = 20;
    const skip = (page * limit) - limit;

    const reviews = await getQueryByParams(req.query).skip(skip).limit(limit);

    res.json(reviews);
}

exports.changePage = async (req, res) => {
    const page = req.params.page || 1;
    const limit = 20;
    const skip = (page * limit) - limit;

    const reviewsPromise = getQueryByParams(req.query).skip(skip).limit(limit);

    const countPromise = Review.count();

    const [reviews, count] = await Promise.all([reviewsPromise, countPromise]);
    const pages = Math.ceil(count / limit);

    if (!reviews.length && skip) {
        res.redirect(`/page/${pages}`);
        return;
    }

    res.json(reviews);
}

exports.getCount = async (req, res) => {
    res.json(Math.ceil(await getQueryByParams(req.query).count() / 20));
}

function getQueryByParams(params) {
    const filterQuery = params.filter;
    const sortQuery = params.sort;
    const filterParam = filterQuery === 'filter-by-all' ? {} : { traveledWith: params.filter.toUpperCase() };
    const sortParam = sortQuery === 'sort-by-entry' ? { entryDate: -1 } : { travelDate: -1 };

    return Review
        .find(filterParam)
        .sort(sortParam);
}

