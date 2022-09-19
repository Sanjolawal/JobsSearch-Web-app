const mongoose = require(`mongoose`);

// users collection or users model

const usersSchema = mongoose.Schema({
  Name: {
    type: String,
    required: true,
    minLength: [2, "Name is too short"],
  },
  Email: {
    type: String,
    required: [true, `please provide a valid email`],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
    unique: true,
  },
  Password: {
    type: String,
    required: [true, `please provide a valid password`],
    match: [
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      `Must contain atleast, one uppercase letter, one lowercase letter, one number and one special character`,
    ],
  },
});

const userModel = mongoose.model(`User`, usersSchema);
module.exports = userModel;
