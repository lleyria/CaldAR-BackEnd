const { mongo } = require("mongoose");

module.exports = mongoose =>{
    const buildings = mongoose.model(
        "buildings", 
        mongoose.Schema(
            {
                id: Number,
                buildingName: String,
                companyBuilding: Boolean,
                companyName: String,
                address: String,
                managerName: String,
                phone: Number,
                boilersId: [],
                boilerTypes: String,
                boilerAmount: Number
            },
            {timestamps: true}
        )
    )
    return buildings
};