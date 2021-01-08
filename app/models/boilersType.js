const { mongoose } = require(".");

module.exports = (mongoose) => {
    const boilersType = mongoose.model(
        'boilersType',
        mongoose.Schema({
            description: {
                type: String,
                required: true,
                enum: ['A', 'B', 'C', 'D'],
            },
            type: {
                type: String,
                required: true,
                enum: ['gas', 'condensation', 'biomass', 'gasoil', 'solar'],
            },
            maxCapacity: {
                type: Number,
                required: true,
            },
            temperatureRange: {
                type: String,
                required: true,
            },
            weight: {
                type: Number,
                required: true,
            },
        })
    );
    return boilersType;
};
