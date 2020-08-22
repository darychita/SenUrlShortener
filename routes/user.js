const { Router } = require('express');
const { updatePasswordAuthenticated, deleteUser } = require('./handlers/user');

// eslint-disable-next-line
const router = Router();

router.delete('/', deleteUser);
router.patch('/password', updatePasswordAuthenticated);

module.exports = router;
