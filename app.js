const path = require("path");
const express = require("express");

const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);

const db = require("./database/database");
const exp = require("constants");

const app = express();

const sessionStore = new MySQLStore({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "gaurav",
  database: "practice",
  createDatabaseTable: true,
});

app.use(
  session({
    secret: "super-secret",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000,
    },
  })
);
//database connection

//use viweengine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "viwes"));
//use css and script file
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

app.use(function (req, res, next) {
  const user = req.session.user;
  const isAuth = req.session.isAuthenticated;

  if (!user || !isAuth) {
    return next();
  }
  const userEmail = user.email;
  res.locals.isAuth = isAuth;
  res.locals.userEmail = userEmail;
  next();
});

app.use("/", require("./routes/pages"));
app.use("/", require("./routes/auth"));

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
