const router = require('express').Router();
const path = require('path');

const apiRouter = require('./api');

router.use('/api', apiRouter);

router.get('/exercise', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/exercise.html'));
});

router.get('/stats', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/stats.html'));
});

module.exports = router;
