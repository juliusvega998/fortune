const MarkovChain 	= require('markovchain');
const nlp			= require('compromise');
const nc			= require('nlp_compromise');
const fs			= require('fs');
const msgs			= new MarkovChain(fs.readFileSync('messages.txt', 'utf-8'));

let firstWords = [];
let articles = ["the", "a", "an"];

const main = () => {
	let text = fs.readFileSync('messages.txt', 'utf-8').split('\n');
	text.forEach((n) => {
		let word = n.split(" ")[0];

		if(!firstWords.includes(word)) {
			firstWords.push(word);
		}
	});

	let msg = msgs.start(firstWords[~~(Math.random()*firstWords.length)]).end(7).process();
	let pos = [];
	let parts = [];

	msg.split(" ").forEach((e) => {
		if(nlp(msg).nouns().out('list').includes(e)) {
			pos.push("Noun");
		} else if(nlp(msg).verbs().out('list').includes(e)) {
			pos.push("Verb");
		} else if(nlp(msg).adjectives().out('list').includes(e)) {
			pos.push("Adjective");
		} else if(nlp(msg).adverbs().out('list').includes(e)) {
			pos.push("Adverb");
		} else {
			pos.push(nc.text(e).tags()[0][0]);
		}
	});

	console.log(msg);
	
	pos.forEach((e) => {
		let determiner = false;
	})
}

main();