const { Router } = require('express');
const handler = require('./handlers/link');
const {
    linkValidation,
    originValidation
} = require('../middleware/validations');
const validate = require('../middleware/validateMiddleware');
const authenticate = require('../middleware/auth');

const router = new Router();

router.post('/extended', authenticate,
                validate(linkValidation), handler.shortLink);
router.post('/', validate(originValidation), handler.shortLink);
router.get('/:endpoint', handler.findLink);
router.post('/:endpoint', handler.findLink);


module.exports = router;
