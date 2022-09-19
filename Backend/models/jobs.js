const mongoose = require(`mongoose`);

const jobSchema = mongoose.Schema({
  Company: {
    type: String,
    required: [true, `Please provide desired company`],
    minlength: [1, `Company name is too short`],
  },
  Position: {
    type: String,
    required: [true, `Please provide position you are looking for`],
    minlength: [1, `Company name is too short`],
  },
});

const jobModel = mongoose.model(`Job`, jobSchema);

module.exports = jobModel;
