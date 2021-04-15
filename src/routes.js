const express = require('express');
const routes = express.Router();
const ProfileController = require('./controllers/ProfileController')
const JobController = require('./controllers/JobController')
const DashboardController = require('./controllers/DashboardController')
////login
const passport = require('passport');




routes.get('/', DashboardController.index)
routes.get('/job', JobController.create)
routes.post('/job', JobController.save)
routes.get('/job/:id', JobController.show)
routes.post('/job/:id', JobController.update)
routes.post('/job/delete/:id', JobController.delete)
routes.get('/profile', ProfileController.index)
routes.post('/profile', ProfileController.update)
/* GET login page. */
routes.get('/login', (req, res, next) => {
    if (req.query.fail)
        res.render('login', { message: 'Usuário e/ou senha incorretos!' });
    else
        res.render('login', { message: null });
});
 
/* POST login page */
routes.post('/login',
    passport.authenticate('local', { 
        successRedirect: '/', 
        failureRedirect: '/login?fail=true' 
    })
);
 
module.exports = routes;