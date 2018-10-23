// get is used to setup routes
// syntax for get is app.get(routeString, (request, response)=>{})
//request contains details about the request 
//response is used to respond to the incoming request
//response.send is used to send some data back to the requester
//----Express Middleware-----
//app.use is used to register middleware
//Syntax app.use(fx); Eg: app.use((req, res, next)=>{});
//next param is used to tell node that the middleware is done and the app resumes
//!!!!----HBS-----!!!!
//syntax app.set('key', 'value'); is used to set properties including the render engine in this case hbs
//When using a render engine the view dir is used to hold all of the templates
//instead of using app.send use app.render('templateName', dataObj);
//----Partials-----
//hbs.registerPartials('dirpath'); is used to register all the hbs partials in the partials dir
//partials are injected into templates using {{> partialName}}
//----Helpers-----
//helpers are registered using syntax hbs.registerHelper('name', ()=>{});
//Helpers are called using {{helperName param1 param2}} 
//helpers are functions available across all partials and templates
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();
const port = process.env.PORT ||  3000;

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toDateString();
    var log = `${now}: ${req.method}: ${req.url}`;
    
    console.log(log);
    fs.appendFileSync('server.log', log + '\n');
    next();
});

// app.use((req, res, next)=>{
    
//     res.render('maintenance.hbs');
    
// });

app.use(express.static(__dirname+'/public'));

hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (txt)=>{
    txt.toUpperCase();
});
app.get('/', (req, res)=>{

    res.render('home.hbs', {

        pageTitle: 'Home Page',
        welcomeMessage: 'Hello World'

    });
    // res.send('<h1>hello express</h1>');
    // res.send({

    //     name: 'Yuri',
    //     likes:['gaming', 'coding', 'reading']

    // });
});

app.get('/about',(req,res)=>{

    res.render('about.hbs', {

        pageTitle: 'About Page',

    });

});

app.get('/bad', (req, res) =>{

    res.send({errorMessage: 'Unable to handle request. '});

});

app.listen(port, ()=>{

    console.log(`Server is up on ${port}`);

});