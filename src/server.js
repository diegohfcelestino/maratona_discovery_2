const express = require("express")
const server = express()
const routes = require("./routes")
const path = require("path")
//login
const passport = require('passport');
const session = require('express-session');
//const auth = require('auth')

// usando template engine
server.set('view engine',  'ejs')

// Mudar a localização da pasta views
server.set('views', path.join(__dirname, 'views'))


//habilitar arquivos statics
server.use(express.static("public"))

// usar o req.body
server.use(express.urlencoded({ extended: true }))

//Login
require('../auth')(passport);
server.use(session({  
  secret: '123',//configure um segredo seu aqui,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 30 * 60 * 1000 }//30min
}))
server.use(passport.initialize());
server.use(passport.session());

function authenticationMiddleware(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/login?fail=true');
}

//server.use('/login', loginRouter);
//server.use('/', authenticationMiddleware,  indexRouter);

// routes
server.use(routes)

server.listen(3000, () => console.log('Aplicação rodando'))