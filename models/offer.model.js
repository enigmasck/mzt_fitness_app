const mongoose = require('mongoose');

const OfferSchema = mongoose.Schema({
    offer_id: String,
    offer_name: String,
    offer_description: String,
    sponsor_name: String,
    website_url: String,
    points: Number
}, {
    timestamp: true
});

module.exports = mongoose.model('Offer', OfferSchema);