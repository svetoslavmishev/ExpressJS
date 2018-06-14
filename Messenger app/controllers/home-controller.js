const User = require('../models/User')

module.exports = {
  get: (req, res) => {
    let error = req.query.error
    
    if (req.user) {
      User.findById(req.user._id)
        .sort({ dateCreated: -1 })
        .populate('otherUsers')
        .then(user => {
          let data = {
            users: user.otherUsers
          }
          if (error) {
            data.error = error
          }

          //Precise render object
          res.render('home/index', data)
        })

      return
    }

    res.render('home/index')
  }
}
