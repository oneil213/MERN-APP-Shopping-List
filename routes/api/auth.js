const express = require ('express')
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

// User Model
const Shopper = require('./../../models/User');

/**
 * @route   POST api/auth
 * @desc    Auth  User
 * @access  Private
 */

router.post('/', (req, res) => {
 const { email, password } = req.body;

 // Simple validation
 if(!email || !password) {
     return res.status(400).json({msg: 'Please complete all fields'})
 }
 
 // Check for existing user
 Shopper.findOne({ email }).then(shopper => {
       if(!shopper) return res.status(400).json({msg: 'User is not registered'});

       // Validate password
       bcrypt.compare(password, shopper.password).then(isMatch => {

       if(!isMatch) return res.status(400).json({msg: 'Wrong password'});
       
       jwt.sign( 
        { id: shopper.id},
        config.get('jwtSecret'),
        { expiresIn: 3600 },
        (err, token) => {
            if(err) throw err;
            res.json({
             token,   
             shopper: {
                 id: shopper.id,
                 name: shopper.name,
                 email: shopper.email
             }
         });
        }
    )
   })



       

   })

});

/**
 * @route   GET api/auth/shopper
 * @desc    Get user data
 * @access  Private
 * private
 */

 router.get('/shopper', auth, (req, res) => {
     Shopper.findById(req.shopper.id)
     .select('-password').then(shopper => res.json(shopper));
 })


module.exports = router;

