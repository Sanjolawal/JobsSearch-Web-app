const router = require(`express`).Router();
const { Formdata, loginData } = require(`./middleware`);
router.post(`/api/v1/userinfo`, Formdata);
router.post(`/api/v1/users`, loginData);
// router.get(`/dashboard.html`, showDashboard);

module.exports = router;
