const express = require('express');
const fs = require('fs');
const app = express();

console.log(__dirname);

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

app.listen(8000, () => {
	console.log('Listening on port 8000!');
});
