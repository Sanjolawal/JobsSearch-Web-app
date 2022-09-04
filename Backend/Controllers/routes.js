const router = require(`express`).Router();
const Showdashboard = require(`./middleware`);
router.get(`/dashboard.html`, Showdashboard);

module.exports = router;
