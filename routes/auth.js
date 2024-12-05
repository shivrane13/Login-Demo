const express = require("express");
const authController = require("../controllers/auth");
const router = express.Router();
const db = require("../database/database");

router.post("/register", authController.register);

router.post("/login", async (req, res) => {
  const email = req.body.email;
  const pass = req.body.password;

  const existingUser = await db.query(
    "SELECT * FROM user1 WHERE email = (?)",
    email
  );

  if (existingUser[0].length == 0 || existingUser[0][0].password != pass) {
    req.session.loginData = {
      hasError: true,
      message: "Invalid Username or Password",
      email: email,
      password: pass,
    };
    req.session.save(function () {
      return res.redirect("/login");
    });
  } else {
    req.session.user = {
      id: existingUser[0][0].id,
      email: existingUser[0][0].email,
    };
    req.session.isAuthenticated = true;
    req.session.save(function () {
      return res.redirect("/");
    });
  }
});

router.post("/logout", function (req, res) {
  req.session.user = null;
  req.session.isAuthenticated = false;
  return res.redirect("/");
});

module.exports = router;
