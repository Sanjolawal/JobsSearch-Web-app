const mongoose = require(`mongoose`);
const express = require(`express`);
const app = express();
const dotenv = require(`dotenv`).config();
const path = require(`path`);
const cookieParser = require(`cookie-parser`);
const { cookieVerification } = require(`./Auth`);

// extra security packages
const xss = require(`xss-clean`);
const helmet = require(`helmet`);
const cors = require(`cors`);
const rateLimit = require(`express-rate-limit`);

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

let Port = process.env.PORT || 3000;

const connect = async () => {
  try {
    app.listen(Port, console.log(`listening to port 3000`));
    await mongoose.connect(process.env.Uri);
    console.log(`connected to DB`);
    app.set(`view engine`, `ejs`);
    app.use(express.json());
    app.use(helmet());
    app.use(cors());
    app.use(xss());
    app.set("trust proxy", 1);
    app.use("/api", apiLimiter);
    app.use(cookieParser());
    app.use(`/dashboard.html`, cookieVerification, (req, res) => {
      Name = req.cookies.name;
      res.render(`dashboard`, { name: `Welcome, ${Name}` });
    });
    const router = require(`./Controllers/routes`);
    app.use(router);
    app.use(express.static(`Backend/Public`));
    app.use((req, res) => {
      res.render(`error`);
    });
  } catch (error) {
    console.log(error);
  }
};

connect();
