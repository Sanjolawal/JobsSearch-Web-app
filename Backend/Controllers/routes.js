const router = require(`express`).Router();
const Showdashboard = require(`./middleware`);
router.use(`/dashboard.html`, Showdashboard);

module.exports = router;
