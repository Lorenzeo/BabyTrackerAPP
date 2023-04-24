const express = require('express');
const app = express();
const port = 9000;
const middleware = require("./middleware");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("./database");
const session = require("express-session");


const server = app.listen(port, () => console.log("Server listening on port: " + port));

app.set("view engine", "pug");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(session({
    secret: "banana chips",
    resave: true,
    saveUninitialized: false
}))

//Routes
const loginRoute = require("./routes/loginRoutes")
const logout = require("./routes/logout")
const registerRoutes = require("./routes/registerRoutes")

// API Routes
const postsApiRoutes = require("./routes/api/posts")

app.use("/login", loginRoute);
app.use("/logout", logout);
app.use("/register", registerRoutes);
app.use("/api/posts", postsApiRoutes);

app.get('/', middleware.requireLogin, (req, res, next)=>{

    var  payload = {
        pageTitle:"Home",
        userLoggedIn: req.session.user,
        userLoggedInJs: JSON.stringify(req.session.user)
    }

    res.status(200).render("home", payload)
})