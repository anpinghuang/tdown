// pages/api/search.js
import axios from 'axios';
import ytdl from 'ytdl-core';

import slugify from 'slugify';




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
export default async function handler(req, res) {
    const url = req.query.url;
    const formatIndex = req.query.formatIndex;
    const videoId = extractVideoId(url);
  
    try {
      const info = await ytdl.getInfo(videoId);
      const title = slugify(info.videoDetails.title, {
        replacement: '-',
        remove: /[*+~.()'"!:@]/g,
        lower: true,
        strict: false
      });
  
      let downloadUrl;
  
      if (formatIndex == 'mp3') {
        const format = ytdl.chooseFormat(info.formats, { filter: 'audioonly' });
        downloadUrl = format.url;
      } else {
        const format = ytdl.chooseFormat(info.formats, { quality: formatIndex });
        downloadUrl = format.url;
      }
  
      // Redirect the user to the download URL
      res.writeHead(302, {
        'Location': downloadUrl,
        'Content-Disposition': `attachment; filename="${title}.${formatIndex === 'mp3' ? 'mp3' : 'mp4'}"`
      });
      res.end();
      
    } catch (err) {
      console.error(err);
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('cannot redirect');
    }
  }



//// actual downloading


// export default async function handler(req, res) {
//     const url = req.query.url;
//       const formatIndex = req.query.formatIndex;
//       const videoId = extractVideoId(url);
  
  
//       try {
//           // const { videoStreamUrl, videoTitle, contentLength } = await downloadVideo(url, formatIndex);
//           // const encodedFileName = encodeURIComponent(videoTitle);
//           ytdl.getInfo(videoId).then((info) => {
//               const title = slugify(info.videoDetails.title, {
//                   replacement: '-',
//                   remove: /[*+~.()'"!:@]/g,
//                   lower: true,
//                   strict: false
//               });
//               console.log(info);
//               if (formatIndex == 'mp3') {
//                   res.setHeader('Content-Disposition', `attachment; filename="${title}.mp3"`);
//                   ytdl(url, {
//                       format: 'mp3',
//                       filter: 'audioonly',
//                       quality: 'highest'
//                   }).pipe(res);
//               } else {
//                   const format = ytdl.chooseFormat(info.formats,{quality:formatIndex});
//                   res.setHeader('Content-Disposition', `attachment; filename="${title}.mp4"`);
//                   ytdl.downloadFromInfo(info, { format: format }).pipe(res);
//               }
//           });
  
//       } catch (err) {
//           console.error(err);
//       }
//   }