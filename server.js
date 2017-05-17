const express = require('express');
const hbs =require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
var app = express();


hbs.registerPartials(__dirname+'/views/partials');
app.set('template engine','hbs');

// app.use((req,res)=>{
//   res.render('manteinance.hbs',{
//     header:'Manteinance',
//     message:'Website en mantenimiento !!'
//   });
// });


app.use(express.static(__dirname+'/public'));

app.use((req,res,next)=>{
  var now = new Date().toString();
  var log = `${now}:${req.method}:${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log+'\n',(err)=>{
    if(err){
      console.log(err);
    }
  });
  next();
});

hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear();
})
hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
})

app.get('/',(req,res)=>{
  //res.send('Hello Express!')
  // res.send({
  //   name:'Matias',
  //   age:'36'
  // })
  res.render('home.hbs',{
    pageTitle:'Home page',
    wellcomeMessage:'Wolcome to the website'
  })
});
app.get('/manteinance',(req,res)=>{
  res.render('manteinance.hbs',{
    header:'Manteinance',
    message:'we will be back !'
  })
});
app.get('/about',(req,res)=>{
  //res.send('About page.');
  res.render('about.hbs',{
    pageTitle:'About page'
  });
});
app.get('/bad',(req,res)=>{
  res.send({
    errorMessage:'Unable to handle request.'
  });
});
app.listen(port,()=>{
  console.log(`Server is up in port ${port}`);
});
