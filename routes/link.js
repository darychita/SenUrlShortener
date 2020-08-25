const { Router } = require('express');
const handler = require('./handlers/link');
const {
    linkValidation,
    originValidation,
    updateLinkValidaton
} = require('../middleware/validations');
const validate = require('../middleware/validateMiddleware');
const authenticate = require('../middleware/auth');

const router = new Router();

router.post('/extended', authenticate,
                            validate(linkValidation), handler.shortLink);

router.post('/', validate(originValidation), handler.shortLink);

router.patch('/:uuid', authenticate,
                            validate(updateLinkValidaton), handler.updateLink);

router.delete('/:uuid', authenticate, handler.deleteLink);

module.exports = router;
