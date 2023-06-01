// index.js
const { log } = require('console');
const express = require('express');
var bodyParser = require('body-parser');
const path = require('path');
const { gtmid, ga4id } = require('./config');

const app = express();

//support json-encoded bodies
app.use( bodyParser.json() );
//support url-encoded bodies
app.use( bodyParser.urlencoded({
    extended: true
}));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// Serve static files from the "public" directory
app.use('/public', express.static(path.join(__dirname,'public') ));

app.set('/views', path.join(__dirname, 'views'));

var formInput = [
    {
        for: 'name',
        label: 'Name',
        tag: 'input',
        type: 'text',
        id: 'name',
        name: 'name',
        required: true
    },
    {
        for: 'email',
        label: 'Email',
        tag: 'input',
        type: 'email',
        id: 'email',
        name: 'email',
        required: true
    },
    {
        for: 'message',
        label: 'Message',
        tag: 'textarea',
        type: 'message',
        id: 'message',
        name: 'message',
        rows: 4,
        required: true
    }
];

// Define a route for the homepage
app.get('/', (req, res) => {

    res.render('index', {formInput, gtmid, ga4id});

});

app.post('/submit', (req, res) => {

    var formRequest = req.body;

    log('/submit');
    log(formRequest);

    var keys = Object.keys(formRequest);
    var values = Object.values(formRequest);

    res.render('submit',{keys, values, gtmid, ga4id});
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
