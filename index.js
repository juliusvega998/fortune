const MarkovChain   = require('markov-chain-nlg');
const fs            = require('fs');
const express       = require('express');
const bodyParser    = require('body-parser');
const axios         = require('axios');
const app           = express();

let msgs, text;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use((req, res, next) => {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'https://juliusvega998.github.io');
    res.setHeader('Access-Control-Allow-Origin', 'http://juliusve.ga');
    
    // Request methods you wish to allow
    // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Methods', 'GET');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    // res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
})

app.get('/fortune', function(req, res) {
    let pos = [];
    let msg;

    do {
        msg = MarkovChain.generate(20)
        if(msg.split(' ').length < 20) break;
    } while(true);

    res.end("{ \"message\": \"" + msg + "\" }");
});

axios.get('https://juliusvega998.github.io/juliusvega998.github.io/misc/messages.json')
    .then(function(data) {
        MarkovChain.train(data.data.data, true);

        app.listen(3000, () => {
            console.log('Server now listening on port 3000');
        });
    })
    .catch(function (err) {
        console.log(err);
    });
