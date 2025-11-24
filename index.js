import MarkovChain from 'markov-chain-nlg';
import fs from 'fs'

export const handler = (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false
    try {
        let response = generate_message()
        return {
            statusCode: 200,
            body: response
        }
    }
    catch (e) {
        console.error(e)
        return 500
    }
}

function init() {
    let messages_file = 'messages.json'
    let data = fs.readFileSync(messages_file)
    MarkovChain.train(JSON.parse(data).data, true)
    console.log("Markov chain finished training.")
}

function generate_message() {
    let msg

    init()

    msg = MarkovChain.generate(20)
    console.log("Message generated: { \"message\": \"" + msg.trim() + "\", \"success\": true }")
    return "{ \"message\": \"" + msg.trim() + "\", \"success\": true }"
}
