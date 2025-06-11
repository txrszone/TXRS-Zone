const axios = require('axios');
const fs = require('fs-extra');
const moment = require('moment-timezone');
const request = require('request');

module.exports = {
  config: {
    name: "cyber",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "Islamick Chat & Cyber Ullash",
    description: "Cyber Messenger Bot Information",
    commandCategory: "system",
    cooldowns: 1,
    dependencies: {
      'request': '',
      'fs-extra': '',
      'axios': '',
      'moment-timezone': ''
    }
  },

  run: async function({ api, event, args, client, Users, Threads, __GLOBAL, Currencies }) {
    const time = process.uptime();
    const hours = Math.floor(time / (60 * 60));
    const minutes = Math.floor((time % (60 * 60)) / 60);
    const seconds = Math.floor(time % 60);
    
    const timeNow = moment.tz("Asia/Dhaka").format("『D/MM/YYYY』 【hh:mm:ss】");
    
    const cyberImage = [
      "https://i.imgur.com/X7k9weO.gif",
      "https://i.imgur.com/gSW285Z.gif",
      "https://i.imgur.com/9SnnwMJJr.gif"
    ];
    
    const randomImage = cyberImage[Math.floor(Math.random() * cyberImage.length)];
    
    const cyberMessage = `
╭•┄┅════❁🌺❁════┅┄•╮
        
        আসসালামু আলাইকুম-!!
        
┅┄•╯
        
📅 ${timeNow}
        
আপনি আমাদের এই মেসেঞ্জার বটটি ব্যবহার করছেন

✨🧡
               
📂 Support Discord:- https://discord.gg/PQN4P6qSrM
        
💻 𝐅𝐎𝐑𝐊 𝐋𝐈𝐍𝐊:- https://github.com/txrszone/TXRS-Zone/
        
╰•┄┅═══❁🌺❁════┅┄•╮
    `;
    
    const imagePath = __dirname + '/cache/cyber.jpg';
    
    const sendMessage = () => api.sendMessage({
      body: cyberMessage,
      attachment: fs.createReadStream(imagePath)
    }, event.threadID, () => fs.unlinkSync(imagePath), event.messageID);
    
    return request(randomImage)
      .pipe(fs.createWriteStream(imagePath))
      .on('close', () => sendMessage());
  }
};
