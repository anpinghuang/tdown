// pages/api/search.js
// import axios from 'axios';

import ytdl from 'ytdl-core';
import instagramDl from "@sasmeee/igdl"; // instragram downloader



function videoType(url) {
    if ((url.indexOf('https://www.youtube.com/watch?v=') === 0) || (url.indexOf('https://youtube.com/watch?v=') === 0)) {
        return 'youtube';
    } else if ((url.indexOf('https://www.youtube.com/shorts') === 0) || (url.indexOf('https://m.youtube.com/shorts') === 0)) {
        return 'youtube-shorts'; 
    } else if (url.indexOf('https://m.youtube.com') === 0) {
        return 'youtube-mobile';
        
    } else if (url.indexOf('https://www.instagram.com/reels') === 0) {
        return 'instagram';
    } else {
        return 'unknown';
    }
}

function extractVideoId(url) {
    try {
        const urlObj = new URL(url);
        const validHostnames = ["www.youtube.com", "youtube.com", "m.youtube.com", "youtu.be"];

        if (validHostnames.includes(urlObj.hostname)) {
            // Check if it's a regular video URL
            if ((urlObj.pathname === "/watch" || urlObj.pathname === "/watch/") && urlObj.searchParams.has('v')) {
                return urlObj.searchParams.get('v');
            }
            // Check if it's a YouTube Shorts URL
            else if (urlObj.pathname.startsWith("/shorts/")) {
                return urlObj.pathname.substring(urlObj.pathname.lastIndexOf('/') + 1);
            }
            // Check if it's a shortened youtu.be URL
            else if (urlObj.hostname === "youtu.be") {
                return urlObj.pathname.substring(1);
            } else {
                throw new Error('Not a valid YouTube URL');
            }
        } else {
            throw new Error('Not a valid YouTube URL');
        }
    } catch (error) {
        console.error("extract video id message", error.message);
        return null;
    }
}


export default async function handler(req, res) {
const videoUrl = req.query.videoUrl;
console.log(videoUrl, videoType(videoUrl));
    if (videoType(videoUrl) == 'youtube' || videoType(videoUrl) == 'youtube-shorts' || videoType(videoUrl) == 'youtube-mobile') {
        try {
            // const {filteredVideoStreams,thumbnail} = await getVideoFormats(videoUrl); 
            // console.log(thumbnail,"from /formats thumbnail");
            const id=extractVideoId(videoUrl);
            const info = await ytdl.getInfo(id);
            

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
        console.log("VIDEO URL: ", videoUrl, "video type:",videoType(videoUrl));
        res.status(400).json({ error: "Unsupported video type" });
    }
    //console.log("VIDEO URL GOT: ",videoUrl); // works

}