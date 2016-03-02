var bcrypt = require('bcrypt')
var hat = require('hat')
var User = require('../models/user').User

exports.addUser = function * (user) {
  return new Promise(function (resolve, reject) {
    bcrypt.hash(user.key, 10, function (err, hash) {
      if (err) reject(err)
      var newUser = new User({
        username: user.username.toLowerCase(),
        key: hash,
        tasks: user.tasks,
        darkmode: user.darkmode
      })
      newUser.save(function (err, user) {
        if (err) reject(err)
        resolve(user)
      })
    })
  })
}

exports.findUser = function (username) {
  return new Promise(function (resolve, reject) {
    User.findOne({
      username: username.toLowerCase()
    }, function (err, user) {
      if (err) reject(err)
      resolve(user)
    })
  })
}

exports.updateUser = function (user) {
  return new Promise(function (resolve, reject) {
    User.findOneAndUpdate({
      username: user.username.toLowerCase()
    }, {
      $set: {
        tasks: user.tasks,
        darkmode: user.darkmode,
        dateModified: user.dateModified
      },
      // remove legacy todos
      $unset: {
        todos: ''
      }
    }, {
      new: true
    }, function (err, user) {
      if (err) reject(err)
      resolve(user)
    })
  })
}

exports.setToken = function (user, next) {
  return new Promise(function (resolve, reject) {
    User.findOneAndUpdate({
      username: user.username.toLowerCase()
    }, {
      $set: {
        resetToken: hat(),
        resetDate: Date.now() + 3600000
      }
    }, {
      new: true
    }, function (err, user) {
      if (err) reject(err)
      resolve(user)
    })
  })
}

exports.resetPassword = function (user, next) {
  bcrypt.hash(user.newKey, 10, function (err, hash) {
    if (err) return next(err)
    User.findOne({
      resetToken: user.token
    }, function (err, user) {
      if (err) return next(err, err)
      if (!user) return next(null, null)
      var username = user.username
      var newKey = hash
      if (Date.now() > user.resetDate) {
        return next(err, null)
      }
      User.findOneAndUpdate({
        username: username
      }, {
        $set: {
          key: newKey,
          resetToken: null
        }
      }, function (err, user) {
        if (err) return console.log(err)
        console.log('User ' + user.username + ' updated')
      })
      next(err, user)
    })
  })
}
