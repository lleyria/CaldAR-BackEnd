module.exports = (mongoose) => {
  const Technician = mongoose.model(
    "technicians",
    mongoose.Schema({
      _id : {
        type: String,
        required: true
      },
      firstName: {
        type: String,
        required: true
      },
      lastName: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true
      },
      boilersTypeId: [{
        type: String,
        required: true
      }],
      proffesionalLevel: {
        type: String,
        required: true,
        enum: ["J", "SS", "S", "L"]
      },
      hourRate: {
        type: Number,
        required: true
      },
      monthlyCapacity: {
        type: Number,
        required: true
      }
    })
  );
  return Technician;
};
