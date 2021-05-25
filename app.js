const express = require("express");
const path = require("path");
const app = express();
const bodyparser = require("body-parser");
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
mongoose.connect('mongodb://localhost/audition', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connect('mongodb://localhost/kid', {useNewUrlParser: true, useUnifiedTopology: true});
const port = 5000;

//Define Mongosse Scheme
const auditionSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    address: String,
    more: String
});
const Audition = mongoose.model('Audition', auditionSchema);

const kidSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    address: String,
    more: String
});
const Kid = mongoose.model('Kid', kidSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

//ENDPOINT
app.get('/', (req, res)=>{
    const params = { }
    res.status(200).render('home.pug', params);
});

app.get('/about', (req, res)=>{
    const params = { }
    res.status(200).render('about.pug', params);
});

app.get('/audition', (req, res)=>{
    const params = { }
    res.status(200).render('audition.pug', params);
});

app.post("/audition", (req, res)=>{
    var myData = new Audition(req.body);
    myData.save().then(()=>{
        res.send("Registeration Successfull")
    }).catch(()=>{
        res.status(404).send("Registeration Error")
    })
});

app.get('/kid', (req, res)=>{
    const params = { }
    res.status(200).render('kid.pug', params);
});

app.post("/kid", (req, res)=>{
    var myData = new Kid(req.body);
    myData.save().then(()=>{
        res.send("Registeration Successfull")
    }).catch(()=>{
        res.status(404).send("Registeration Error")
    })
});

app.get('/contact', (req, res)=>{
    const params = { }
    res.status(200).render('contact.pug', params);
});

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});