const fs = require('fs');
const process = require('process');
const axios = require('axios');

function handleCat(content, outPath) {
	if (outPath) {
		fs.writeFile(outPath, content, 'utf8', function(err) {
			if (err) {
				console.error(`Couldn't write ${path}: ${err}`);
				process.exit(1);
			}
			console.log(`# no output, but ${outPath} contains contents of ${source}`);
		});
	} else {
		console.log(content);
	}
}

function cat(path, outPath) {
	fs.readFile(path, 'utf8', function(err, data) {
		if (err) {
			console.error(`Error reading ${path}: ${err}`);
			process.exit(1);
		} else {
			handleCat(data, outPath);
		}
	});
}

async function webCat(url, outPath) {
	try {
		let res = await axios.get(url);
		let content = res.data;
		handleCat(content, outPath);
	} catch (err) {
		console.error(`Error fetching ${url}: ${err}`);
		process.exit(1);
	}
}

let source;
let outPath;

if (process.argv[2] === '--out') {
	source = process.argv[4];
	outPath = process.argv[3];
} else {
	source = process.argv[2];
}

if (source.includes('http')) {
	webCat(source, outPath);
} else {
	cat(source, outPath);
}
