module.exports = (mongoose) => {
  const Technician = mongoose.model(
    "technicians",
    mongoose.Schema({
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      boilersTypeId: [
        {
          type: String,
          required: true,
        },
      ],
      professionalLevel: {
        type: String,
        required: true,
        enum: ["J", "SS", "S", "L"],
      },
      hourRate: {
        type: String,
        required: true,
      },
      monthlyCapacity: {
        type: Number,
        required: true,
      },
    })
  );
  return Technician;
};
