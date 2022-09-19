const mongoose = require(`mongoose`);
const express = require(`express`);
const app = express();
const dotenv = require(`dotenv`).config();
const path = require(`path`);
const cookieParser = require(`cookie-parser`);
const { authentication, cookieVerification } = require(`./Auth`);

let Port = 3000;

const connect = async () => {
  try {
    app.listen(Port, console.log(`listening to port 3000`));
    await mongoose.connect(process.env.Uri);
    console.log(`connected to DB`);
    app.set(`view engine`, `ejs`);
    app.use(express.json());
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
