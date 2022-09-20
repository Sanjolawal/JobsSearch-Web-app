const userModel = require(`../models/users`);
const jwt = require(`jsonwebtoken`);
const bcrypt = require(`bcrypt`);
require(`dotenv`).config();

// middleWARE for handling form data sent
const Formdata = async (req, res) => {
  try {
    const { Name, Email, protection } = req.body;
    const Password = bcrypt.hashSync(protection, 10);
    await userModel.create({ Name, Email, Password });
    const token = jwt.sign({ Name, Email, Password }, process.env.secret, {
      expiresIn: `30d`,
    });
    res.cookie("access_token", `Bearer ${token}`, {
      expires: new Date(Date.now() + 720 * 3600000),
      httpOnly: true,
      path: `/`,
    });
    res.status(200).json({ msg: Name.split(` `)[0] });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: error.message });
  }
};

//MIDDLEWARE FOR HANDLING  FORM LOGIN DATA
const loginData = async (req, res) => {
  try {
    const { Email, password } = req.body;

    const check = await userModel.findOne({ Email });
    if (!check) {
      return res.status(400).json({
        msg: ` Email not yet registered in our database. `,
      });
    }
    const pwdValidation = await bcrypt.compare(password, check.Password);
    if (pwdValidation) {
      const token = jwt.sign(req.body, process.env.secret, {
        expiresIn: `30d`,
      });

      res.cookie(`access_token`, `Bearer ${token}`, {
        expires: new Date(Date.now() + 720 * 3600000),
        httpOnly: true,
        path: `/`,
      });
      return res.status(200).json({ msg: check.Name.split(` `)[0] });
    }
    return res.status(400).json({ msg: `Password is not valid` });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// middleware for logging out/ removing cookies
const removeCookies = (req, res) => {
  res.clearCookie(`access_token`);
  res.redirect(`/dashboard.html`);
};

module.exports = { Formdata, loginData, removeCookies };
