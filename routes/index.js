const router = require('express').Router();
const passport = require('passport');

router.use('/', require('./swagger'));
router.use('/grocery', require('./grocery'));
router.use('/library', require('./library'));
router.use('/pharmacy', require('./pharmacy'));
router.use('/users', require('./users'));

router.get('/', (req, res) => {
    //swagger.tags=['Hello World'] 
    res.send('So Far So Good');});







module.exports = router;