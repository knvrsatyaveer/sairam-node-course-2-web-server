/**
 * Created by satyaveerkrovvidi on 20/2/18.
 */
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

app.set('view engine','hbs');

app.use(express.static(__dirname+'/public'));
app.use((req,resp,next) =>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} --> ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log +'\n',(err)=>{
        if(err){
            console.log('unable to log to server.log');
        }
    });
    next();
    // resp.render('maintenance');
});

app.use((req,resp,next) =>{
   resp.render('maintenance');

});


hbs.registerPartials(__dirname +'/views/partials');

hbs.registerHelper('maintenanceMessage',() =>{
    return 'The page is under maintenance . Please try again later';
});

hbs.registerHelper('getCurrentYear',() =>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text) =>{
    return text.toUpperCase();
});

app.get('/',(req,resp) =>{
   // resp.send('sairam saishyam sai bhagavan... amma kamakshi amma');
    resp.render('home.hbs',{
       pageTitle : 'Shirdi sai trust',
        currentYear : new Date().getFullYear(),
        welcomeMessage : 'Welcome to Shirdi. Sai baba blessings are with you. Be Good and Do Good'
    });
});

app.get('/about',(req,resp) =>{
    resp.render('about.hbs',{
        pageTitle : 'About Page',
        currentYear : new Date().getFullYear()
    });
});


app.get('/about1',(req,resp) =>{
   resp.send('<h1> About shirdi sai ram </h1>');
});

app.get('/bad',(req,resp) =>{
   resp.send(' <h1> bad request </h1>');
});
app.listen(3000);