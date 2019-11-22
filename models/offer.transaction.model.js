const mongoose = require('mongoose');

const OfferTransactionSchema = mongoose.Schema({
    offer_transaction_id: String,
    customer_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Customer'},
    challenge_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Challenge'},
    offer_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Offer'},
    transaction_type: {type: String, enum:['EARNED', 'NOT_EARNED', 'REDEEMED','IN_PROGRESS']},
    points: Number
}, {
    timestamp: true
});

module.exports = mongoose.model('Offer_Transaction', OfferTransactionSchema);