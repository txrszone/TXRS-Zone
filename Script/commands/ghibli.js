const axios = require('axios');
const fs = require('fs');

const xyz = "ArYAN";

module.exports = {
  config: {
    name: "ghibli",
    version: "0.0.1",
    hasPermssion: 0,
    credits: "ArYAN",
    premium: false,
    description: "Convert a photo into Ghibli-style anime artwork",
    commandCategory: "🖼️ Image Editing",
    usages: "[reply to image or paste image URL]",
    cooldowns: 3,
    dependencies: {
      path: "",
      'fs-extra': ""
    }
  },

  run: async function({ api, event, args }) {
    const tempImagePath = __dirname + '/cache/ghibli_result.jpg';
    const { threadID, messageID } = event;
    const imageUrl = event.messageReply?.attachments?.[0]?.url || args.join(' ');

    if (!imageUrl) {
      return api.sendMessage("⚠️ 𝙋𝙡𝙚𝙖𝙨𝙚 𝙧𝙚𝙥𝙡𝙮 𝙩𝙤 𝙖 𝙥𝙝𝙤𝙩𝙤 𝙤𝙧 𝙥𝙧𝙤𝙫𝙞𝙙𝙚 𝙖 𝙫𝙖𝙡𝙞𝙙 𝙞𝙢𝙖𝙜𝙚 𝙐𝙍𝙇 💡", threadID, messageID);
    }

    try {
      const processing = await api.sendMessage("🎨 𝙂𝙚𝙣𝙚𝙧𝙖𝙩𝙞𝙣𝙜 𝙮𝙤𝙪𝙧 𝙂𝙝𝙞𝙗𝙡𝙞-𝙨𝙩𝙮𝙡𝙚 𝙖𝙧𝙩... 𝙋𝙡𝙚𝙖𝙨𝙚 𝙬𝙖𝙞𝙩 ⏳", threadID);

      const apiUrl = `https://aryan-xyz-ghibli.vercel.app/ghibli?image=${encodeURIComponent(imageUrl)}&apikey=${xyz}`;
      const response = await axios.get(apiUrl);
      const resultImageUrl = response.data?.image;

      if (!resultImageUrl) {
        throw new Error("No image returned.");
      }

      const resultImage = (await axios.get(resultImageUrl, { responseType: 'arraybuffer' })).data;
      fs.writeFileSync(tempImagePath, Buffer.from(resultImage, 'binary'));

      api.sendMessage({
        body: "✅ 𝙃𝙚𝙧𝙚'𝙨 𝙮𝙤𝙪𝙧 𝙂𝙝𝙞𝙗𝙡𝙞-𝙨𝙩𝙮𝙡𝙚 𝙖𝙧𝙩𝙬𝙤𝙧𝙠! ✨",
        attachment: fs.createReadStream(tempImagePath)
      }, threadID, () => fs.unlinkSync(tempImagePath), messageID);

      api.unsendMessage(processing.messageID);

    } catch (err) {
      return api.sendMessage("❌ 𝙁𝙖𝙞𝙡𝙚𝙙 𝙩𝙤 𝙘𝙧𝙚𝙖𝙩𝙚 𝙂𝙝𝙞𝙗𝙡𝙞-𝙨𝙩𝙮𝙡𝙚 𝙞𝙢𝙖𝙜𝙚. 𝙏𝙧𝙮 𝙖 𝙙𝙞𝙛𝙛𝙚𝙧𝙚𝙣𝙩 𝙥𝙝𝙤𝙩𝙤 🛠️", threadID, messageID);
    }
  }
};
