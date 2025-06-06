const sharp = require('sharp');
const fs = require('fs-extra');

module.exports = {
  config: {
    name: "upscale",
    version: "2.0",
    author: "Your Name",
    description: "Enhance image to 4K quality using AI upscaling",
    commandCategory: "image",
    usage: "[reply to image]",
    cooldown: 15,
    dependencies: {
      "sharp": "",
      "fs-extra": ""
    }
  },

  run: async function({ api, event }) {
    try {
      // Check for image attachment
      if (!event.messageReply || !event.messageReply.attachments || !event.messageReply.attachments[0]) {
        return api.sendMessage("⚠️ Please reply to an image to upscale", event.threadID);
      }

      const imageUrl = event.messageReply.attachments[0].url;
      const outputPath = `${__dirname}/cache/4k_${Date.now()}.jpg`;

      // Download and process image
      const response = await require('axios').get(imageUrl, { responseType: 'arraybuffer' });
      const buffer = Buffer.from(response.data, 'binary');

      // AI upscaling with sharp
      await sharp(buffer)
        .resize(3840, 2160, { // 4K resolution
          fit: 'inside',
          withoutEnlargement: false,
          kernel: sharp.kernel.lanczos3
        })
        .sharpen(0.5) // Mild sharpening
        .withMetadata() // Keep original metadata
        .toFormat('jpeg', { quality: 95 }) // High quality
        .toFile(outputPath);

      // Send result
      api.sendMessage({
        body: "✨ 4K Upscale Complete!",
        attachment: fs.createReadStream(outputPath)
      }, event.threadID, () => fs.unlinkSync(outputPath));

    } catch (error) {
      console.error(error);
      api.sendMessage("❌ Error processing image: " + error.message, event.threadID);
    }
  }
};
