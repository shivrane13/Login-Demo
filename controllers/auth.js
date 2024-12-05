const db = require("../database/database");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
  /*
  const name = req.body.name;
  const email = req.body.email;
  const pass = req.body.password;
  const cpass = req.body.passwordconfirm;
  */
  const { name, email, password, passwordconfirm } = req.body;

  const r_email = await db.query(
    "SELECT email FROM user1 WHERE email = ?",
    email
  );

  if (
    name === "" ||
    email === "" ||
    password === "" ||
    passwordconfirm === ""
  ) {
    req.session.inputData = {
      hasError: true,
      massage: "Data not satisfied",
      name: name,
      email: email,
      password: password,
      cpassword: passwordconfirm,
    };
    await req.session.save();
    return res.redirect("/register");
  }

  if (r_email[0].length > 0) {
    req.session.inputData = {
      hasError: true,
      message: "That Email is already in use",
      name: name,
      email: email,
      password: password,
      cpassword: passwordconfirm,
    };
    await req.session.save();
    return res.redirect("/register");
  } else if (password !== passwordconfirm) {
    req.session.inputData = {
      hasError: true,
      message: "Password do not match",
      name: name,
      email: email,
      password: password,
      cpassword: passwordconfirm,
    };
    await req.session.save();
    return res.redirect("/register");
  }
  const data = [name, email, password];

  try {
    await db.query("INSERT INTO user1(name, email, password) VALUE (?)", [
      data,
    ]);
    return res.redirect("/login");
  } catch (error) {
    console.log(error);
  }
};
