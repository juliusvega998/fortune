const MarkovChain 	= require('markovchain');
const nlp			= require('compromise');
const nc			= require('nlp_compromise');
const fs			= require('fs');
const msgs			= new MarkovChain(fs.readFileSync('messages.txt', 'utf-8'));

let firstWords = [];
let articles = ["the", "a", "an"];
let accepted = ["Noun", "Verb", "Adverb", "Adjective", "Preposition"]

const isValidSentence = (pos) => {
	let article = 0;
	let preposition = 0;
	let adjective = 0;
	let adverb = 0;
	let conjunction = 0;

	for(let i = 0; i < pos.length; i++) {
		let e = pos[i];
		switch(e) {
		case "Article":
			if(article == 0) {
				article = -1;
			} else {
				return false;
			}
			break;
		case "Preposition":
			if(preposition == 0) {
				preposition = -1;
			} else {
				return false;
			}
			break;
		case "Conjunction":
			if(conjunction == 0) {
				conjunction = -1;
			} else {
				return false;
			}
		case "Noun":
			if(article < 0) {
				article = 0;
			}

			if(preposition < 0) {
				preposition = 0;
			} else if(conjunction < 0) {
				conjunction = 0;
			}
			break;
		case "Verb":
			if(adverb < 0) {
				adverb = 0;
			}
			break;
		case "Adjective":
			adjective = -1;
			break;
		case "Adverb":
			adverb = -1;
			break;
		}
		//console.log(article + " " + preposition + " " + adjective + " " + adverb)
	}

	return article == 0 && preposition == 0 && conjunction == 0 && adjective == 0 && adverb == 0;
}

const main = () => {
	let text = fs.readFileSync('messages.txt', 'utf-8').split('\n');
	let pos = [];
	let msg;

	text.forEach((n) => {
		let word = n.split(" ")[0];

		if(!firstWords.includes(word)) {
			firstWords.push(word);
		}
	});

	do {
		msg = msgs.start(firstWords[~~(Math.random()*firstWords.length)]).end(7).process();
		if(!msg) continue;
		pos = nc.text(msg).tags()[0];

		msg.split(" ").forEach((e, i) => {
			if(pos[i] == "Gerund") {
				pos[i] = "Noun";
			} else if(pos[i] == "Copula") {
				pos[i] = "Verb";
			} else if(accepted.includes(pos[i])) {
				return;
			} else if(articles.includes(e)) {
				pos[i] = "Article";
			} else if(nlp(msg).nouns().out('list').includes(e)) {
				pos[i] = "Noun";
			} else if(nlp(msg).verbs().out('list').includes(e)) {
				pos[i] = "Verb";
			} else if(nlp(msg).adjectives().out('list').includes(e)) {
				pos[i] = "Adjective";
			} else if(nlp(msg).adverbs().out('list').includes(e)) {
				pos[i] = "Adverb";
			}
		});
	} while(!isValidSentence(pos));
	
	console.log(msg);
}

main();