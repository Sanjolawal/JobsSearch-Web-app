const router = require(`express`).Router();

const { Formdata, loginData, removeCookies } = require(`./middleware`);

const { authentication } = require(`../Auth`);

const {
  jobsSent,
  jobsToSend,
  getJob,
  updateJob,
  deleteJob,
} = require(`./jobsmiddlewares`);

router.post(`/api/v1/userinfo`, Formdata);
router.post(`/api/v1/users`, loginData);
router.get(`/remove`, removeCookies);
router
  .route(`/api/v1/jobs`)
  .post(authentication, jobsSent)
  .get(authentication, jobsToSend);
router
  .route(`/api/v1/jobs/:id`)
  .get(authentication, getJob)
  .put(authentication, updateJob)
  .delete(deleteJob);

module.exports = router;
