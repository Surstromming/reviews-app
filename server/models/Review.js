const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const reviewSchema = new mongoose.Schema({
    traveledWith: String,
    entryDate: Number,
    travelDate: Number,
    ratings: {
        general: {
            general: Number
        },
        aspects: {
            location: Number,
            service: Number,
            priceQuality: Number,
            food: Number,
            room: Number,
            childFriendly: Number,
            interior: Number,
            size: Number,
            activities: Number,
            restaurants: Number,
            sanitaryState: Number,
            accessibility: Number,
            nightlife: Number,
            culture: Number,
            surrounding: Number,
            atmosphere: Number,
            noviceSkiArea: Number,
            advancedSkiArea: Number,
            apresSki: Number,
            beach: Number,
            entertainment: Number,
            environmental: Number,
            pool: Number,
            terrace: Number
        }
    },
    titles: {
        nl: String
    },
    texts: {
        nl: String
    },
    user: String,
    locale: String
});

reviewSchema.statics.getRatings = function() {
    return this.aggregate([
        { $project: { _id: '$_id', generalRating: '$ratings.general.general', aspects: '$ratings.aspects', entryDate: '$entryDate', traveledWith: '$traveledWith', } },
    ]);
}

reviewSchema.statics.getTraveledWith = function() {
    return this.aggregate([
        { $group: { _id: '$traveledWith', count: { $sum: 1 } }},
        { $sort: { count: -1 } }
    ]);
}

module.exports = mongoose.model('Review', reviewSchema);