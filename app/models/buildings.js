const { mongo } = require("mongoose");

module.exports = (mongoose) => {
  const buildings = mongoose.model(
    "buildings",
    mongoose.Schema(
      {
        buildingName: String,
        companyBuilding: String,
        companyName: String,
        address: String,
        managerName: String,
        phone: Number,
        boilersId: [],
        boilerTypes: String,
        boilerAmount: Number,
      },
      { timestamps: true }
    )
  );
  return buildings;
};
