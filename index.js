const AWS           = require('aws-sdk')
const MarkovChain   = require('markov-chain-nlg');
const fs            = require('fs');


function init(callback) {
    let messages_file = 'messages.json'
    fs.readFile(messages_file, (err,data) => {
        let msg

        if(err) {
            console.log("File not found " + messages_file + "!!!")
            callback(err)
            return
        }
        
        MarkovChain.train(JSON.parse(data).data, true);
        console.log("Markov chain finished training.")
        callback(null)
    })
}

function generate_message(event, context, callback) {
    let msg

    context.callbackWaitsForEmptyEventLoop = false

    init((err) => {
        if (err) {
            console.log(err)
            callback(Error(err), JSON.parse("{ \"message\": null, \"success\": false }"))
        }
        
        msg = MarkovChain.generate(20)

        console.log("Message generated.")
        callback(null, JSON.parse("{ \"message\": \"" + msg.trim() + "\", \"success\": true }"));
    })
}

exports.handler = generate_message
