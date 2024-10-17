const router = require('express').Router();
const passport = require('passport');

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    //swagger.tags=['Hello World'] 
    res.send('So Far So Good');});







module.exports = router;