const router = require('express').Router();
const UserProfile = require('../../models/UserProfile');

// auth sign in
router.post('/signIn', (req, res) => {
  // req.body now holds profileObj
  const profileObj = req.body;
  UserProfile.findOne({ googleId: profileObj.googleId }).then((currentUser) => {
    if (currentUser) {
      res.status(200).json();
    } else {
      // if not, create user in our db
      new UserProfile({
        googleId: profileObj.googleId,
        name: profileObj.name,
        firstName: profileObj.familyName,
        lastName: profileObj.givenName,
        email: profileObj.email
      }).save().then((newUser) => {
        res.status(200).json();

      });
    }
  });

});


module.exports = router;