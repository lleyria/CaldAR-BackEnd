module.exports = (mongoose) => {
  const Appointments = mongoose.model(
    "appointments",
    mongoose.Schema({
      building: {
        type: String,
        required: true,
      },
      boiler: {
        type: String,
        required: true,
      },
      technician: {
        type: String,
        required: true,
      },
      startTimeStamp: {
        type: Date,
        timestamps: true,
        required: true,
      },
      endTimeStamp: {
        type: Date,
        timestamps: true,
        required: true,
      },
      monthlyHours: {
        type: Number,
        required: true,
      },
      status: {
        type: String,
        required: true,
        enum: ['active', 'cancelled', 'completed'],
      },
    })
  );
  return Appointments;
};
