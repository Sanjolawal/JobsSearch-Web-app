const jobModel = require(`../models/jobs`);

// jobs sent to the server
const jobsSent = async (req, res) => {
  try {
    req.body.createdBy = res.locals.id;
    const response = await jobModel.create(req.body);
    res.status(200).json({ msg: response });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: error.message });
  }
};

// jobs get request sent to the server
const jobsToSend = async (req, res) => {
  try {
    const jobsData = await jobModel.find({ createdBy: res.locals.id });
    res.status(200).json(jobsData);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: error.message });
  }
};

// getting job

const getJob = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await jobModel.findById(id);
    if (job) {
      return res.status(200).json(job);
    }
    res.status(400).json({ msg: `No jobs with the id provided is available` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

// updating job

const updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    // const { company, position, status } = req.body;
    const job = await jobModel.findByIdAndUpdate(id, req.body);
    if (job) {
      return res.status(200).json({ msg: `Job sucessfully updated ` });
    }
    res.status(400).json({ msg: `No jobs with the id provided is available` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};
// deleting job

const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await jobModel.findByIdAndDelete(id);
    if (job) {
      return res.status(200).json({ msg: `Job sucessfully deleted ` });
    }
    res.status(400).json({ msg: `No jobs with the id provided is available` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

module.exports = { jobsSent, jobsToSend, getJob, updateJob, deleteJob };
