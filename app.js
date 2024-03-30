// const axios = require('axios');
// const stream = require('stream');
// const util = require('util');
// const { format } = require('path');

//const { getVideo, instruction } = require('./video');


import {getInstruction, getStuff, extractPlayerVersion, extractInstruction, getTimestamp, instructionsAndTimestamp, getVideo, extractURLAndDecodeAge, desig} from "./video.js";
//const { filter } = require('cheerio/lib/api/traversing');

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//     next();
// });


async function getVideoFormats(videoUrl) {
    const id=extractVideoId(videoUrl);
    const {adaptiveFormats,title, thumbnailURL} = await getVideo(id);
    // filteredVideoStreams = filteredVideoStreams[0];
    // thumbnail = filteredVideoStreams[2];
    console.log("GET VIDEO FORMATS thumbnail",thumbnailURL);
    //console.log("VIDEO STREAMS (from get video formats): ",filteredVideoStreams); //this works

  // Return the video streams
  //console.log("VIDEO STREAMS (from get video formats): ",filteredVideoStreams); //this works
  return {filteredVideoStreams:adaptiveFormats , thumbnail:thumbnailURL};
}

async function downloadVideo(videoUrl, formatIndex) {
    /// get the data available
    const id=extractVideoId(videoUrl);
    //https://www.youtube.com/watch?v=8CubrsO7f6Y
    const {adaptiveFormats,title, thumbnailURL}= await getVideo(id);
    //  videoStreams = videoData[0];
    //  title = videoData[1];
    videoStreams=adaptiveFormats;
    
    //formatIndex is a string so it needs to be converted
    const pickedItag = parseInt(formatIndex, 10);
    const selectedStream = videoStreams.find(element => element.itag === pickedItag);

    let b;
  
    if (selectedStream.url) {
        b = selectedStream.url;
      } else if (selectedStream.signatureCipher) {
        //console.log(format.signatureCipher);
        // You can call decodeAge function here if needed
        b = desig(selectedStream.signatureCipher, getInstruction())
      }
    let contentLength = selectedStream.contentLength;

    //   console.log("THIS IS THE VIDEO STREAM URL: ",b);
    //   console.log("VIDEO TITLE IS",encodeURIComponent(title));

       // need to have instruction


    return { videoStreamUrl: b, videoTitle: title, contentLength: contentLength };
}


////// SMALL FUNCTIONS /// 

//   function extractVideoId(url) {
//     try {
//         const urlObj = new URL(url);
//         if (urlObj.hostname === "www.youtube.com" || urlObj.hostname === "youtube.com") {
//             const searchParams = new URLSearchParams(urlObj.search);
//             return searchParams.get('v');
//         } else if (urlObj.hostname === "youtu.be") {
//             return urlObj.pathname.substring(1);
//         } else {
//             throw new Error('Not a valid YouTube URL');
//         }
//     } catch (error) {
//         console.error("extract video id messasge", error.message);
//         return null;
//     }
// }
function extractVideoId(url) {
  try {
      const urlObj = new URL(url);
      if (urlObj.hostname === "www.youtube.com" || urlObj.hostname === "youtube.com") {
          // Check if it's a regular video URL
          if (urlObj.pathname === "/watch" && urlObj.searchParams.has('v')) {
              return urlObj.searchParams.get('v');
          }
          // Check if it's a YouTube Shorts URL
          else if (urlObj.pathname.startsWith("/shorts/")) {
              return urlObj.pathname.substring(urlObj.pathname.lastIndexOf('/') + 1);
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
  


// module.exports = {downloadVideo, getVideoFormats}; // Export the functions
export {downloadVideo, getVideoFormats, extractVideoId}; // Export the functions
