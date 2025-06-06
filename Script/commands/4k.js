const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');

module.exports = {
  config: {
    name: "4k",
    version: "2.0",
    author: "Your Name",
    description: "Upscale images to 4K quality using AI",
    commandCategory: "image",
    usage: "[reply to image]",
    cooldown: 30,
    dependencies: {
      "axios": "",
      "fs-extra": ""
    }
  },

  run: async function({ api, event }) {
    try {
      // Check for image reply
      if (!event.messageReply || !event.messageReply.attachments || !event.messageReply.attachments[0]) {
        return api.sendMessage("🔍 Please reply to an image to upscale to 4K", event.threadID);
      }

      const imageUrl = event.messageReply.attachments[0].url;
      const outputPath = path.join(__dirname, 'cache', `4k_${Date.now()}.jpg`);

      // Step 1: Download the image
      const { data: imageBuffer } = await axios.get(imageUrl, { 
        responseType: 'arraybuffer' 
      });

      // Step 2: Send to DeepAI API (free tier available)
      const apiResponse = await axios.post(
        'https://api.deepai.org/api/torch-srgan',
        { image: Buffer.from(imageBuffer).toString('base64') },
        {
          headers: {
            'api-key': 'quickstart-QUdJIGlzIGNvbWluZy4uLi4K', // Free public key
            'Content-Type': 'application/json'
          }
        }
      );

      // Step 3: Download the upscaled image
      const { data: upscaledImage } = await axios.get(apiResponse.data.output_url, {
        responseType: 'arraybuffer'
      });

      // Save and send
      await fs.writeFile(outputPath, upscaledImage);
      
      api.sendMessage({
        body: "✅ 4K Upscale Complete!",
        attachment: fs.createReadStream(outputPath)
      }, event.threadID, () => fs.unlink(outputPath));

    } catch (error) {
      console.error(error);
      api.sendMessage(`❌ Error: ${error.message}\n⚠️ API may be rate limited, try again later.`, event.threadID);
    }
  }
};
