const express = require('express');
const bodyParser = require('body-parser');
const {downloadVideo, getVideoFormats} = require('./app'); // Import the downloadVideo function from app.js
const app = express();


const axios = require('axios');

const { Transform } = require('stream');


const http = require('http');
const WebSocket = require('ws');
// Create HTTP server
const server = http.createServer(app);
// Create WebSocket server
const wss = new WebSocket.Server({ server });





const downloadSessions = new Map();

// end testing


const port = 3000;
app.use(express.static('public'));

// Middleware to parse POST data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let videoBuffer;

function cleanup_video() {
    console.log("cleanup_video called");
    if (videoBuffer) {
        videoBuffer.fill(0); // Fill the buffer with zeros
        videoBuffer = null;
        console.log('Video buffer cleaned up.!!!!!!!!!!!!!!!!!!!!!!!');
    }
}

// Function to update progress for a specific session
function updateProgress(sessionId) {
    const sessionData = downloadSessions.get(sessionId);
    if (sessionData) {
        const { fileSize, downloadedBytes, complete } = sessionData;
        const percentage = Math.floor((downloadedBytes / fileSize) * 100);

        // Iterate over all WebSocket clients to find the one with matching sessionId property
        wss.clients.forEach(client => {
            if (client.sessionId == sessionId) { 
                //console.log("SENDING TO ",client.sessionId);
                client.send(JSON.stringify({ sessionId, progress: percentage, complete }));
            }
        });
    }
}

// WebSocket upgrade handling
app.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
    });
});



// Handle WebSocket connections
wss.on('connection', (ws, req) => {
    console.log("THIS IS THE REQ.URL URL: ",req.url.substring(1,11),"type: ",typeof(req.url));
    ws.sessionId = req.url.substring(1,24);
});

app.get('/download', async (req, res) => {

    const url = req.query.url;
    const formatIndex = req.query.formatIndex;
    const sessionId = req.query.sessionId; // Generate unique session ID for each download
    console.log("SESSION ID!!! FROM /DOWNLOAD",sessionId);
    console.log("URL!!! FROM /DOWNLOAD",url);
    console.log("FORMAT INDEX!!! FROM /DOWNLOAD",formatIndex);

    try {
        const { videoStreamUrl, videoTitle, contentLength } = await downloadVideo(url, formatIndex);

        // Initialize progress data for this session
        downloadSessions.set(sessionId, {
            fileSize: contentLength,
            downloadedBytes: 0,
            complete: false
        });

        console.log('Download URL: ', videoStreamUrl); // Log the download URL
        const encodedFileName = encodeURIComponent(videoTitle);

        if (contentLength > (1 * 1024 * 1024)) { // modifying content length and chunksize increases the speed of download

            // DONWLOAD ALL IN ONE GO
            console.log('Content size exceeds 10MB, downloading in chunks.');

            const fileSize = contentLength;
            const chunkSize = 1 * 1024 * 1024; // 2MB chunk size
            const totalChunks = Math.ceil(fileSize / chunkSize);

            res.setHeader('Content-Description', 'File Transfer');
            res.setHeader('Content-Type', 'application/octet-stream');
            res.setHeader('Content-Disposition', `attachment; filename="${encodedFileName}.mp4"`);
            res.setHeader('Content-Transfer-Encoding', 'binary');
            res.setHeader('Expires', '0');
            res.setHeader('Cache-Control', 'must-revalidate');
            res.setHeader('Pragma', 'public');
            res.setHeader('Content-Length', fileSize);


            // Create a Transform stream to split the incoming stream into chunks
            const splitter = new Transform({
                transform(chunk, encoding, callback) {
                    this.push(chunk);
                    callback();
                }
            });

            splitter.on('error', (err) => {
                console.error('Error downloading chunk:', err);
                res.status(500).send('Internal Server Error');
            });

            // Download chunks in parallel
            const chunkPromises = [];

            for (let i = 0; i < totalChunks; i++) {
                const startByte = i * chunkSize;
                const endByte = Math.min((i + 1) * chunkSize - 1, fileSize - 1);

                const rangeHeaders = {
                    headers: {
                        Range: `bytes=${startByte}-${endByte}`,
                    },
                    responseType: 'stream',
                };

                const chunkPromise = axios.get(videoStreamUrl, rangeHeaders)
                    .then((response) => {
                        return new Promise((resolve, reject) => {
                            const chunks = [];
                            response.data.on('data', (chunk) => {
                                chunks.push(chunk);
                                downloadSessions.get(sessionId).downloadedBytes += chunk.length;
                                //console.log("THIS IS FROM THE /DOWNLOAD sessionid",sessionId);
                                updateProgress(sessionId);
                            });
                            response.data.on('end', () => {
                                // wss.clients.forEach(client => {
                                //     client.send(JSON.stringify({ progress: 100, complete: true }));
                                // });
                                //updateProgress(sessionId);

                                resolve(Buffer.concat(chunks));
                            });
                            response.data.on('error', (err) => {
                                reject(err);
                            });
                        });
                    });

                chunkPromises.push(chunkPromise);
            }

            // Wait for all chunks to be downloaded
            Promise.all(chunkPromises)
                .then((chunks) => {
                    // Concatenate all chunks into a single buffer
                    videoBuffer = Buffer.concat(chunks);

                    // Stream the entire video buffer to the response
                    res.end(videoBuffer);
                    downloadSessions.get(sessionId).complete = true;

                })
                .catch((err) => {
                    console.error('Error downloading chunks:', err);
                    res.status(500).send('Internal Server Error');
                });

        } else {
        const response = await axios.get(videoStreamUrl, { responseType: 'stream' });

        const fileSize = response.headers['content-length'];

        res.setHeader('Content-Description', 'File Transfer');
        res.setHeader('Content-Type', 'application/octet-stream');
        res.setHeader('Content-Disposition', 'attachment; filename="videoplayback.mp4"');
        res.setHeader('Content-Transfer-Encoding', 'binary');
        res.setHeader('Expires', '0');
        res.setHeader('Cache-Control', 'must-revalidate');
        res.setHeader('Pragma', 'public');
        res.setHeader('Content-Length', fileSize);

        response.data.pipe(res);
        }


    } catch (err) {
        console.error('Error fetching URL:', err);
        res.status(500).send('Internal Server Error');
    } 
});



app.post('/formats', async (req, res) => { 
    const videoUrl = req.body.videoUrl;
    console.log("VIDEO URL GOT: ",videoUrl); // works 
    try {
        const {filteredVideoStreams,thumbnail} = await getVideoFormats(videoUrl); 
        if (filteredVideoStreams) {
            console.log(thumbnail,"from /formats thumbnail");
            const data = {
                formats: filteredVideoStreams,
                thumbnail: thumbnail
            }
            res.status(200).json(data);
        } else {
            res.status(404).json({ error: 'No video formats found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});

function logMemoryUsage() {
    const { rss, heapTotal, heapUsed } = process.memoryUsage();
    console.log(`Memory Usage: RSS ${rss / 1024 / 1024} MB, Heap Total ${heapTotal / 1024 / 1024} MB, Heap Used ${heapUsed / 1024 / 1024} MB`);
}

// Log memory usage every second
//setInterval(logMemoryUsage, 1000);

app.get('/cleanup', (req, res) => {
    cleanup_video();
    res.send('Cleanup function called successfully.');
});

/// redirect to 404 page when unavailable. PUT THIS LAST BECAUSE IF YOU PUT IT BEFORE AN ENDPOINT, IT WILL INTERCEPT AND BREAK IT
app.use((req, res, next) => {
    res.status(404).sendFile(__dirname + '/public/404.html');
  });

// Start the server
server.listen(process.env.PORT || port, () => {
    console.log(`Server running at http://localhost:${port}`);
});