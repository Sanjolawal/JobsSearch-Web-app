const jobModel = require(`../models/jobs`);

// jobs sent to the server
const jobsSent = async (req, res) => {
  try {
    await jobModel.create(req.body);
    res.status(200).json({ msg: `successful` });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: error.message });
  }
};

// jobs get request sent to the server
const jobsToSend = async (req, res) => {
  try {
    const jobsData = await jobModel.find({});
    res.status(200).json(jobsData);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: error.message });
  }
};

module.exports = { jobsSent, jobsToSend };
