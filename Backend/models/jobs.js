const mongoose = require(`mongoose`);

const jobSchema = mongoose.Schema({
  Date: {
    type: Date,
    default: new Date(),
  },
  companyInput: {
    type: String,
    required: [true, `Please provide desired company`],
    minlength: [1, `Company name is too short`],
  },
  positionInput: {
    type: String,
    required: [true, `Please provide position you are looking for`],
    minlength: [1, `Company name is too short`],
  },
  status: String,
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: `User`,
  },
});

const jobModel = mongoose.model(`Job`, jobSchema);

module.exports = jobModel;
