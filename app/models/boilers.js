const { Timestamp } = require("mongodb");
const { mongoose } = require(".");

module.exports = (mongoose) => {
    const boilers = mongoose.model(
        'boilers',
        mongoose.Schema({
            lot: {
                type: String,
                required: true
            },
            companyId: {
                type: String,
                required: false
            },
            boilersTypeId: {
                type: String,
                required: true
            },
            instalationDate: {
                type: Timestamp,
                required: false
            },
            fabricationDate: {
                type: Timestamp,
                required: true
            },
            expirationDate: {
                type: Timestamp,
                required: true
            },
        })
    );
    return boilers;
};