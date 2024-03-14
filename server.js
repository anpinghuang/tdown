const express = require('express');
const bodyParser = require('body-parser');
const {downloadVideo, getVideoFormats} = require('./app'); // Import the downloadVideo function from app.js
const app = express();


const axios = require('axios');

const { Transform } = require('stream');
// const pump = require('pump');

const { pipeline } = require('stream');
const { promisify } = require('util');
const pump = promisify(pipeline);

const port = 3000;
app.use(express.static('public'));

// Middleware to parse POST data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/download', async (req, res) => {

    const url = req.query.url;
    const formatIndex = req.query.formatIndex;

    try {
        const { videoStreamUrl, videoTitle, contentLength } = await downloadVideo(url, formatIndex);

        console.log('Download URL: ', videoStreamUrl); // Log the download URL
        const encodedFileName = encodeURIComponent(videoTitle);

            const response = await axios.get(videoStreamUrl, { responseType: 'stream' });
    
            res.setHeader('Content-Disposition', `attachment; filename*=UTF-8''${encodedFileName}.mp4`);
            res.setHeader('Content-Type', 'video/mp4');

            response.data.on('data', (chunk) => {
                res.write(chunk);
            });

            response.data.on('end', () => {
                res.end();
            });

        // if (contentLength > (10 * 1024 * 1024)) {

        //     console.log('Content size exceeds 10MB, downloading in chunks.');

        //     const chunkSize = 10 * 1024 * 1024; // 10MB chunk size
        //     const totalChunks = Math.ceil(contentLength / chunkSize);
        //     const fileName = 'downloaded_file.mp4';

        //     res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
        //     res.setHeader('Content-Type', 'video/mp4');

        //     // Create a Transform stream to split the incoming stream into chunks
        //     const splitter = new Transform({
        //         transform(chunk, encoding, callback) {
        //             this.push(chunk);
        //             callback();
        //         }
        //     });

        //     splitter.setMaxListeners(20); 

        //     let downloadedBytes = 0;

        //     splitter.on('data', async (chunk) => {
        //         res.write(chunk);
        //         downloadedBytes += chunk.length;

        //         if (downloadedBytes === contentLength) {
        //             res.end();
        //         }
        //     });

        //     splitter.on('error', (err) => {
        //         console.error('Error downloading chunk:', err);
        //         res.status(500).send('Internal Server Error');
        //     });

        //     // Download chunks in parallel
        //     for (let i = 0; i < totalChunks; i++) {
        //         const startByte = i * chunkSize;
        //         const endByte = Math.min((i + 1) * chunkSize - 1, contentLength - 1);

        //         const rangeHeaders = {
        //             headers: {
        //                 Range: `bytes=${startByte}-${endByte}`,
        //             },
        //             responseType: 'stream',
        //         };

        //         const response = await axios.get(videoStreamUrl, rangeHeaders);
        //         response.data.pipe(splitter, { end: false });

        //         if (i === totalChunks - 1) {
        //             // If this is the last chunk, ensure it includes all remaining bytes
        //             const remainingBytes = contentLength - downloadedBytes;
        //             if (remainingBytes > 0) {
        //                 const lastChunkResponse = await axios.get(videoStreamUrl, {
        //                     headers: {
        //                         Range: `bytes=${downloadedBytes}-${contentLength - 1}`,
        //                     },
        //                     responseType: 'stream',
        //                 });
        //                 lastChunkResponse.data.pipe(splitter, { end: false });
        //             }
        //         }
        //     }

        // } else {
        //     const response = await axios.get(videoStreamUrl, { responseType: 'stream' });
    
        //     res.setHeader('Content-Disposition', `attachment; filename*=UTF-8''${encodedFileName}.mp4`);
        //     res.setHeader('Content-Type', 'video/mp4');

        //     response.data.on('data', (chunk) => {
        //         res.write(chunk);
        //     });

        //     response.data.on('end', () => {
        //         res.end();
        //     });
        // }

        

    } catch (err) {
        console.error('Error fetching URL:', err);
        res.status(500).send('Internal Server Error');
    }
});



app.post('/formats', async (req, res) => { 
    const videoUrl = req.body.videoUrl;
    console.log("VIDEO URL GOT: ",videoUrl); // works 
    try {
        const formats = await getVideoFormats(videoUrl); 
        console.log("FORMATS GOT from /formats"); 
        res.status(200).json(formats);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});