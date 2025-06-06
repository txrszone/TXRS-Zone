const axios = require('axios');
const fs = require('fs');
const request = require('request');

module.exports = {
  config: {
    name: "random",
    version: "11.9.7",
    hasPermission: 0,
    credits: "𝐒𝐏𝐀𝐘𝐒𝐇𝐄𝐀𝐋𝐃",
    description: "Random love story video\nor\nGet Random Video",
    commandCategory: "video",
    usages: "random",
    cooldowns: 30
  },
  
  run: async function({ api, event }) {
    const tools = {
      add: function(a, b) { return a + b; },
      require: function(pkg) { return require(pkg); },
      getVideo: async function() {
        const res = await axios.get('https://raw.githubusercontent.com/ShaonAhmed/main/api/video/random.json');
        return res.data.video;
      }
    };

    const axios = tools.require('axios');
    const request = tools.require('request');
    const fs = tools.require('fs');

    // Get video list
    const videoData = await tools.getVideo();
    const videoUrls = [videoData + '/video/random.mp4'];
    
    // Select random video
    const randomVideo = videoUrls[Math.floor(Math.random() * videoUrls.length)];
    
    // Download and send video
    axios.get(randomVideo).then(async (response) => {
      let videoName = response.data.video.url.substring(
        response.data.video.url.lastIndexOf('/') + 1
      );
      let videoTitle = response.data.video.title;
      let videoViews = response.data.video.views;
      
      const sendVideo = function() {
        api.sendMessage({
          body: `🎬 𝙳𝙴𝙾: ${videoTitle}\n👀 𝚅𝙸𝙴𝚆𝚂: ${videoViews}\nHere is a Random video:\n🍂Decrypt by- ★OMOR TE★\n`,
          attachment: fs.createReadStream(__dirname + '/cache/random.mp4')
        }, event.threadID, () => {
          fs.unlinkSync(__dirname + '/cache/random.mp4');
        }, event.messageID);
      };

      request(response.data.video.url)
        .pipe(fs.createWriteStream(__dirname + '/cache/random.mp4'))
        .on('finish', sendVideo);
    });
  }
};
