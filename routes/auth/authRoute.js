const router = require('express').Router();
const UserProfile = require('../../models/UserProfile');

// auth sign in
// @route  POST auth/signIn
// @desc   Sign in using google
// @access Public
router.post('/signIn', (req, res) => {
  // req.body now holds profileObj
  const profileObj = req.body;
  UserProfile.findOne({ googleId: profileObj.googleId }).then((currentUser) => {
    if (currentUser) {
      // exist, send OK
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
        // user now saved in db, send OK
        res.status(200).json();
      });
    }
  });

});


module.exports = router;