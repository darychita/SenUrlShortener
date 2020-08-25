const { Router } = require('express');
const handler = require('./handlers/user');

// eslint-disable-next-line
const router = Router();

router.delete('/', handler.deleteUser);
router.patch('/password', handler.updatePasswordAuthenticated);
router.get('/links?', handler.getUserLinks);

module.exports = router;
