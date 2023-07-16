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

  // 檢驗表單填寫狀況
  const errors = []
  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: '所有欄位都是必填。' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不相符！' })
  }
  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }
  // 檢查使用者是否已經註冊
  User.findOne({ email }).then(user => {
    // 已註冊 >>> 回 Login 頁
    if (user) {
      errors.push({ message: '這個 Email 已經註冊過了。' })
      return res.render('register', {
        errors,
        name,
        email,
        password,
        confirmPassword
      })
    }
    // 未註冊 >>> 寫入並創建資料
    return User.create({
      name,
      email,
      password
    })
      .then(() => res.redirect('/'))
      .catch(err => console.log(err))
  })
    .catch(err => console.log(err))
})

router.get('/logout', (req, res) => {
  req.logout(function (err) {
    if (err) { return next(err) }
    req.flash('success_msg', '已經成功登出')
    res.redirect('/users/login')
  })
})

module.exports = router