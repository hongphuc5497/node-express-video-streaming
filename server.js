const express = require('express');
const fs = require('fs');
const app = express();

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

app.get('/video', (req, res) => {
	let range = req.headers.range;

	if (!range) range = 'bytes=0-';

	const videoSize = fs.statSync('video_sample.mp4').size;
	const CHUNK_SIZE = 10 ** 6;
	const start = Number(range.replace(/\D/g, ''));
	const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
	const contentLength = end - start + 1;

	console.info({
		CHUNK_SIZE,
		start,
		end,
		contentLength,
	});

	const headers = {
		'Content-Range': `bytes ${start}-${end}/${videoSize}`,
		'Accept-Ranges': 'bytes',
		'Content-Length': contentLength,
		'Content-Type': 'video/mp4',
	};
	console.log('🚀 ~ file: server.js ~ line 33 ~ app.get ~ headers', headers);

  res.writeHead(206, headers);

	const videoStream = fs.createReadStream('video_sample.mp4', { start, end });
	videoStream.pipe(res);
});

app.listen(8000, () => {
	console.log('Listening on port 8000!');
});
