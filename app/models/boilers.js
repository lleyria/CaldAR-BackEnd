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
            companyName: {
                type: String,
                required: false,
            },
            companyId: {
                type: String,
                required: false
            },
            boilersTypeId: {
                type: String,
                required: true
            },
            installationDate: {
                type: Date,
                required: false
            },
            fabricationDate: {
                type: Date,
                required: true
            },
            expirationDate: {
                type: Date,
                required: true
            },
        })
    );
    return boilers;
};
