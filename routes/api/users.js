const express = require ('express')
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

// User Model
const Shopper = require('./../../models/User');

/**
 * @route   POST api/users
 * @desc    Register new User
 * @access  Public
 */

router.post('/', (req, res) => {
 const { name, email, password } = req.body;

 // Simple validation
 if(!name || !email || !password) {
     return res.status(400).json({msg: 'Please complete all fields'})
 }
 
 // Check for existing user
 Shopper.findOne({ email })
   .then(shopper => {
       if(shopper) return res.status(400).json({msg: 'User is already registered'})

       const newShopper = new Shopper({
           name,
           email,
           password
       });

       // Create salt & hash

       bcrypt.genSalt(10, (err, salt) => {
           bcrypt.hash(newShopper.password, salt,(err, hash)=>{
            if(err) throw err;
               newShopper.password = hash;
               newShopper.save()
                   .then(shopper => {

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
                       

                   });
               
           });
       })

   })

});


module.exports = router;