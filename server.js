import express from 'express';
const app = express();
import cors from 'cors';
import path from 'path';

import ytdl from 'ytdl-core';
import {getVideoFormats, extractVideoId} from './app.js'; // Import the downloadVideo function from app.js

import slugify from 'slugify';

const __dirname = path.resolve();

const port = process.env.PORT || 4000;
app.use(express.static(path.join(__dirname, '/assets')));
app.use(cors());


import bodyParser from 'body-parser';
// Middleware to parse POST data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// end testing

app.use(express.static('public'));

function customHeaders(req, res, next) {
    app.disable('x-powered-by');
    res.setHeader('X-Powered-By', 'Video Downloader');
    next();
}
app.use(customHeaders);

// app.use('/', function(req, res) {
//     res.status(404).json({
//         error: 1,
//         message: 'Data not Found'
//     });
// })


app.get('/download', async (req, res) => {
    const url = req.query.url;
    const formatIndex = req.query.formatIndex;
    const videoId = extractVideoId(url);
    try {
        // const { videoStreamUrl, videoTitle, contentLength } = await downloadVideo(url, formatIndex);
        // const encodedFileName = encodeURIComponent(videoTitle);
        ytdl.getInfo(videoId).then((info) => {
            const title = slugify(info.videoDetails.title, {
                replacement: '-',
                remove: /[*+~.()'"!:@]/g,
                lower: true,
                strict: false
            });

            const format = ytdl.chooseFormat(info.formats,{quality:formatIndex});
            res.header('Content-Disposition', `attachment; filename="${title}.mp4"`);
            ytdl.downloadFromInfo(info, { format: format }).pipe(res);
        });

    } catch (err) {
        console.error(err);
    }
});



app.post('/formats', async (req, res) => { 
    const videoUrl = req.body.videoUrl;
    //console.log("VIDEO URL GOT: ",videoUrl); // works 
    try {
        // const {filteredVideoStreams,thumbnail} = await getVideoFormats(videoUrl); 
        // console.log(thumbnail,"from /formats thumbnail");

        const info = await ytdl.getInfo(videoUrl);
        const videos = info.formats;
        let filteredVideoStreams = videos.filter(function(item) {
            return item.mimeType.includes('avc1') && item.contentLength;
        });
        
        // Grouping filtered video streams by qualityLabel
        const groupedVideos = filteredVideoStreams.reduce((groups, video) => { // filter in only the highest quality videos, no repeats
            const { qualityLabel } = video;
            if (!groups[qualityLabel]) {
                groups[qualityLabel] = [];
            }
            groups[qualityLabel].push(video);
            return groups;
        }, {});
        
        // Finding items with maximum contentLength in each group
        const result = Object.values(groupedVideos).map(group => {
            return group.reduce((prev, current) =>
                (parseInt(prev.contentLength) > parseInt(current.contentLength)) ? prev : current
            );
        });
        const thumbnails = info.player_response.videoDetails.thumbnail.thumbnails;
              
        const thumbnail = thumbnails[3].url;
        
        const data = {
            formats: result,
            thumbnail: thumbnail
        }
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});