const router = require(`express`).Router();
const { Formdata, loginData, removeCookies } = require(`./middleware`);
const { jobsSent, jobsToSend } = require(`./jobsmiddlewares`);
router.post(`/api/v1/userinfo`, Formdata);
router.post(`/api/v1/users`, loginData);
router.get(`/remove`, removeCookies);
router.route(`/api/v1/jobs`).get(jobsToSend).post(jobsSent);

module.exports = router;
