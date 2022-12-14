const jwt = require(`jsonwebtoken`);

const authentication = (req, res, next) => {
  if (!req.headers.authorization) {
    return res
      .status(400)
      .json({ msg: `Authorization credentials not present` });
  }
  const auth = req.headers.authorization;
  const payload = jwt.verify(auth.split(` `)[1], process.env.secret);
  res.locals.id = payload._id;
  if (!auth.startsWith(`Bearer `) || !payload) {
    return res.status(400).json({ msg: `Authorization credentials not valid` });
  }
  next();
};

const cookieVerification = (req, res, next) => {
  const { access_token } = req.cookies;
  if (!access_token) {
    return res.redirect(`/Register.html`);
  }
  const test1 = access_token.split(` `)[0];
  const test2 = access_token.split(` `)[1];
  if (test1 === "Bearer" && jwt.verify(test2, process.env.secret)) {
    return next();
  }
  return res.redirect(`/Register.html`);
};

module.exports = { authentication, cookieVerification };
