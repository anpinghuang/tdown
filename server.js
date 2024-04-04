import express from 'express';
const app = express();
import cors from 'cors';
import path from 'path';


import ytdl from 'ytdl-core';
import {getVideoFormats, extractVideoId} from './app.js'; // Import the downloadVideo function from app.js

import slugify from 'slugify';

import instagramDl from "@sasmeee/igdl"; // instragram downloader


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

app.get('/sitemap.xml', async function(req, res, next){
    let xml_content = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
      '  <url>',
      '    <loc>http://www.swiftdownloader.com/</loc>',
      '    <lastmod>2024-04-04</lastmod>',
      '  </url>',
      '</urlset>'
    ]
    res.set('Content-Type', 'text/xml')
    res.send(xml_content.join('\n'))
  })

  app.get('/robots.txt', function (req, res) {
    res.type('text/plain');
    res.send("User-agent: *\nDisallow: /");
});



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
            if (formatIndex == 'mp3') {
                res.header('Content-Disposition', `attachment; filename="${title}.mp3"`);
                ytdl(url, {
                    format: 'mp3',
                    filter: 'audioonly',
                    quality: 'highest'
                }).pipe(res);
            } else {
                const format = ytdl.chooseFormat(info.formats,{quality:formatIndex});
                res.header('Content-Disposition', `attachment; filename="${title}.mp4"`);
                ytdl.downloadFromInfo(info, { format: format }).pipe(res);
            }
        });

    } catch (err) {
        console.error(err);
    }
});


function videoType(url) {
    if (url.indexOf('https://www.youtube.com/watch?v=') === 0) {
        return 'youtube';
    } else if (url.indexOf('https://www.youtube.com/shorts') === 0) {
        return 'youtube-shorts'; 
    } else if (url.indexOf('https://m.youtube.com') === 0) {
        return 'youtube-mobile';
        
    } else if (url.indexOf('https://www.instagram.com/reels') === 0) {
        return 'instagram';
    } else {
        return 'unknown';
    }
}

app.post('/formats', async (req, res) => { 
    const videoUrl = req.body.videoUrl;
    if (videoType(videoUrl) == 'youtube' || videoType(videoUrl) == 'youtube-shorts' || videoType(videoUrl) == 'youtube-mobile') {
        //console.log("VIDEO IS YOUTUBE!!",videoUrl);
        try {
            // const {filteredVideoStreams,thumbnail} = await getVideoFormats(videoUrl); 
            // console.log(thumbnail,"from /formats thumbnail");
            const info = await ytdl.getInfo(videoUrl);
            const videos = info.formats;
            let filteredVideoStreams = videos.filter(function(item) {
                //return item.mimeType.includes('avc1') && item.contentLength;
                return item.mimeType.includes('video/mp4') && item.hasAudio == true;
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

    } else if (videoType(videoUrl) == 'instagram') {
       // console.log("VIDEO IS INSTAGRAM!!");

        const dataList = await instagramDl(videoUrl);
        const data = {link: dataList[0].download_link, thumbnail: dataList[0].thumbnail_link};
        res.status(200).json(data);
    } else {
        console.log("ERROR!!");
        res.status(400).json({ error: "Unsupported video type" });
    }
    //console.log("VIDEO URL GOT: ",videoUrl); // works
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});