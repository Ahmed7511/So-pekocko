const bcrypt = require('bcrypt');          
const jwt = require('jsonwebtoken');  // pour créé les token et les vérifier
const User = require('../models/User');
const mailValidator = require('email-validator'); 
const passwordValidator = require('password-validator'); 

// Create a schema
var schema = new passwordValidator();
 
schema
.is().min(6)                                    // Minimum length 6
.is().max(20)                                  // Maximum length 20
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits()                                 // Must have digits
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values

exports.signup = (req, res, next) => {
  if (!mailValidator.validate(req.body.email) || (!schema.validate(req.body.password))) {  
    throw { error: " entrer invalide !" }  
} else if (mailValidator.validate(req.body.email) && (schema.validate(req.body.password))) { 
  bcrypt.hash(req.body.password, 10)   // function pour hashé le mot de passe  avec 10 tour de l'exucution de l'algoritme de hashage
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })

    .catch(error => res.status(500).json({ error }));
  }
  };

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
              userId: user._id,
              token: jwt.sign(
                { userId: user._id },
                process.env.PASS_WORD,
                { expiresIn: '24h' }
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };