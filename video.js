const { json } = require("body-parser");

let instruction;

 async function getStuff() {
    try {
        const response = await fetch("https://www.youtube.com/iframe_api");
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const data = await response.text();
        const id = extractPlayerVersion(data);
        const timestamp = await instructionsAndTimestamp(id);
        
        // // Set globalTimestamp to the value of timestamp
        // globalTimestamp = timestamp;
        //console.log(timestamp);
        return timestamp;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error; // Rethrow the error to propagate it
    }
}

 function extractPlayerVersion(inputString) {
    var player = inputString.indexOf('player')+'player//'.length;
    var other = inputString.indexOf('www-widgetapi.vflset')-2;
    //console.log("index of player",player);
    return inputString.substring(player, other);
}

 function extractInstruction(inputString) {
    // first instruction
    // ex: NMa=function(a){a=a.split("");oP.NW(a,43);oP.wJ(a,53);oP.ww(a,3);oP.wJ(a,1);oP.ww(a,3);oP.wJ(a,68);oP.NW(a,15);oP.ww(a,2);return a.join("")};
    var first = inputString.indexOf('a=a.split("");')-'NMa=function(a){'.length;
    var last = inputString.indexOf('a.join("")')+'a.join("")};'.length;
    var instruct1 = inputString.substring(first,last);
    //second instruction hint
    // ex: var oP={wJ:function(a){a.reverse()},NW:function(a,b){var c=a[0];a[0]=a[b%a.length];a[b%a.length]=c},ww:function(a,b){a.splice(0,b)}};
    var second = first+('NMa=function(a){a=a.split("");'.length);
    var hint = inputString.substring(second, second+2);
    // second instruction
    var get = inputString.indexOf(`var ${hint}=`);
    const nextIndex = inputString.indexOf("}};", get + 1);
    var instruct2 = inputString.substring(get,nextIndex+3);

    return instruct1+instruct2;
}

 function getTimestamp(inputString) {
    var timeindex = inputString.indexOf('signatureTimestamp')+'signatureTimestamp:'.length;
    return inputString.substring(timeindex,timeindex+("19788".length));
}
 async function instructionsAndTimestamp(version) {
    try {
        const response = await fetch(`https://www.youtube.com/s/player/${version}/player_ias.vflset/en_US/base.js`);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const data = await response.text();
        // Assuming the content inside the script tag is assigned to a variable named "scriptUrl"
        //console.log(data);
        instruction = extractInstruction(data);
        return getTimestamp(data);
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error; // Rethrow the error to propagate it
    }
}

function getInstruction() {
    return instruction;
}


///////////////////////////////////////////////////////////////////////////////
async function getVideo(videoid) {
    try {
        const timestamp = await getStuff();
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "videoId": videoid,
            "context": {
                "client": {
                    "clientName": "TVHTML5_SIMPLY_EMBEDDED_PLAYER",
                    "clientVersion": "2.0"
                },
                "thirdParty": {
                    "embedUrl": "https://www.youtube.com"
                }
            },
            "playbackContext": {
                "contentPlaybackContext": {
                    "signatureTimestamp": timestamp 
                }
            }
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        const response = await fetch("https://www.youtube.com/youtubei/v1/player?key=AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8", requestOptions);
        const result = await response.text();
        const jsonObject = JSON.parse(result);
        const data = jsonObject.streamingData; // all vids

        const videos = data.adaptiveFormats; // normal vids

        let adaptiveFormats = videos.filter(function(item) {
            return item.mimeType.includes('avc1');
        });

        let formats = data.formats; // ratebypass=yes vids

        for (let adaptiveFormat of adaptiveFormats) {
            for (let formatItem of formats) {
                if (adaptiveFormat.qualityLabel === formatItem.qualityLabel) {
                    Object.assign(adaptiveFormat, formatItem);
                }
            }
        }

        const title = jsonObject.videoDetails.title;
        return [adaptiveFormats, title];
    } catch (error) {
        console.error(error);
    }
}



 function extractURLAndDecodeAge(formats) {
    formats.forEach(format => {
      if (format.url) {
        //console.log(format.url);
        return format.url;
      } else if (format.signatureCipher) {
        //console.log(format.signatureCipher);
        // You can call decodeAge function here if needed
        //console.log(desig(format.signatureCipher, instruction));
        return desig(format.signatureCipher, getInstruction());
      }
    });
  }




  /// CIPHER //////////////////////////////////////////////////

   function desig(url, instruction) {
            // DECODING URL AND SIGNATURE KEY IS VERY IMPORTANT OR IT WILL NOT WORK

        // Split the URL string by '&' to separate query parameters
        var queryParams = url.split("&");

        // Iterate through each query parameter to find the one with key "s"
        var sValue;
        for (var i = 0; i < queryParams.length; i++) {
            var param = queryParams[i].split("="); // Split each parameter by '=' to separate key and value
            if (param[0] === "s") {
                sValue = decodeURIComponent(param[1]); // Decode the URL encoded value
                break; // Break the loop once the "s" parameter is found
            }
        }
        var urlValue = decodeURIComponent(url.substring(url.indexOf('&url=')+('&url='.length)));

        const decodeDict = {
            ' ': '%20',
            '"': '%22',
            '#': '%23',
            '%': '%25',
            '&': '%26',
            '(': '%28',
            ')': '%29',
            '+': '%2B',
            ',': '%2C',
            '/': '%2F',
            ':': '%3A',
            ';': '%3B',
            '<': '%3C',
            '=': '%3D',
            '>': '%3E',
            '?': '%3F',
            '@': '%40',
            '\\': '%5C',
            '|': '%7C',
        };

        for (const key in decodeDict) {
            if (Object.hasOwnProperty.call(decodeDict, key)) {
                urlValue = urlValue.split(decodeDict[key]).join(key);
            }
        }

        var cipher = sValue;
        
        eval(instruction)

        var result = eval(instruction.substring(0,3)+"(cipher);");
        //console.log(result);

        return urlValue + "&sig=" + result;
  }

  module.exports = {getInstruction, getStuff, extractPlayerVersion, extractInstruction, getTimestamp, instructionsAndTimestamp, getVideo, extractURLAndDecodeAge, desig}; // Export the functions
