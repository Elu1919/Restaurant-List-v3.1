const express = require('express')
const User = require('../../models/user')
const passport = require('passport')

const router = express.Router()

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {

  // 取得註冊表單參數
  const { name, email, password, confirmPassword } = req.body

  // 檢查使用者是否已經註冊
  User.findOne({ email }).then(user => {

    // 已註冊 >>> 回 Login 頁
    if (user) {
      console.log('User already exists.')
      res.render('register', {
        name,
        email,
        password,
        confirmPassword
      })
    } else {
      // 未註冊 >>> 寫入並創建資料
      return User.create({
        name,
        email,
        password
      })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
    }
  })
    .catch(err => console.log(err))
})

router.get('/logout', (req, res) => {
  req.logout(function (err) {
    if (err) { return next(err) }
    res.redirect('/users/login')
  })
})

module.exports = router