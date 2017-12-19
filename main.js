const MarkovChain 	= require('markovchain');
const fs			= require('fs');
const msgs			= new MarkovChain(fs.readFileSync('messages.txt', 'utf-8'));

let firstWords = [];

const main = () => {
	let text = fs.readFileSync('messages.txt', 'utf-8').split('\n');
	text.forEach((n) => {
		let word = n.split(" ")[0];

		if(!firstWords.includes(word)) {
			firstWords.push(word);
		}
	});

	console.log(msgs.start(firstWords[~~(Math.random()*firstWords.length)]).end(7).process());
}

main();