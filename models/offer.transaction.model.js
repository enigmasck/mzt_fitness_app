const mongoose = require('mongoose');

const OfferTransactionSchema = mongoose.Schema({
    offer_transaction_id: String,
    customer_id: String,
    challnege_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Challenge'},
    offer_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Offer'},
    transcation_type: {type: String, enum:['EARNED','REDEEMED']},
    points: Number
}, {
    timestamp: true
});

module.exports = mongoose.model('OfferTransaction', OfferTransactionSchema);