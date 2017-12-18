const MarkovChain 	= require('markovchain');
const fs			= require('fs');
const msgs			= new MarkovChain(fs.readFileSync('messages.txt', 'utf-8'));

const randomWord = (wordList) => {
	let tmpList = Object.keys(wordList).filter(function(word) {
		return true;
	})
	return tmpList[~~(Math.random()*tmpList.length)];
}

console.log(msgs.start(randomWord).end(10).process());