/**
 * Created by satyaveerkrovvidi on 24/2/18.
 */

const express = require('express');
const hbs = require('hbs');

var app = new express();

app.set('view engine','hbs');

app.use((req,resp,next) => {
    // resp.render('maintenance');
    next();
});

// app.use((req,resp,next) => {
//    next();
// })

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear',() => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text) => {
    return text.toUpperCase();
});


hbs.registerHelper('maintenanceMessage',() => {
    return 'we\'ll see you soon';
});

app.get('/',(req,resp) => {
   resp.render('home',{
       pageTitle : 'Sairam page Title',
       welcomeMessage : 'Welcome to Shirdi'
   });
});

app.get('/about',(req,resp) => {
   resp.render('about',{
       pageTitle : ' Sairam about page title'
   })
});

app.listen(3000);