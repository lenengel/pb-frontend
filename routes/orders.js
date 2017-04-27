var express = require('express');
var language = require('../config/language/de-DE.json');
var config = require('../config/config.json');
var router = express.Router();

router.get('/', function(req, res)
{
res.redirect('/orders/view');
});

router.get('/view', function(req, res)
{
res.render ('orders', { config: config, language: language, user: req.session.passport.user});
});

module.exports = router;