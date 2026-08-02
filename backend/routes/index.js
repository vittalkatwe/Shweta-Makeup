const express = require('express');

const router = express.Router();

router.use(require('./health'));
router.use(require('./payments'));
router.use(require('./profile'));
router.use('/admin/meta-ads', require('./meta-ads'));
router.use('/admin', require('./admin'));

module.exports = router;
