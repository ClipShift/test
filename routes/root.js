const express = require('express');
const path = require('path');
const router = express.Router();


router.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
})


router.post('^/$', (req, res) => {
    res.json(req.body);
})
module.exports = router;