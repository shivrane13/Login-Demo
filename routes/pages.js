const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index.ejs");
});

router.get("/register", (req, res) => {
  let sessionInputData = req.session.inputData;

  if (!sessionInputData) {
    sessionInputData = {
      hasError: false,
      name: "",
      email: "",
      password: "",
      cpassword: "",
    };
  }

  res.render("register.ejs", { inputData: sessionInputData });
});

router.get("/login", (req, res) => {
  try {
    let sessionInputData = req.session.loginData;

    if (!sessionInputData) {
      sessionInputData = {
        hasError: false,
        message: "",
        email: "",
        password: "",
      };
    }

    res.render("login.ejs", { inputData: sessionInputData });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
