const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

const bouncer = require ("express-bouncer")(10000, 60000, 3);  
   //empêcher toute nouvelle tentative de connection entre 1000ms et 60000ms
   // aprés 3 tentative on a erreur 429                                                            

router.post('/signup',  userCtrl.signup);
router.post('/login', bouncer.block, userCtrl.login);


module.exports = router;