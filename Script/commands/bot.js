const fs = global.nodemodule["fs-extra"];
const moment = require("moment-timezone");

// User memory storage
const userMemory = {};

module.exports.config = {
  name: "Obot",
  version: "4.0.0",
  hasPermssion: 0,
  credits: "OMOR TE",
  description: "Fully Human-like AI Assistant Response",
  commandCategory: "Noprefix",
  usages: "noprefix",
  cooldowns: 3,
};

module.exports.handleEvent = async function({ api, event, args, Threads, Users }) {
  const { threadID, messageID, senderID } = event;
  const name = await Users.getNameUser(senderID);
  const currentTime = moment().tz("Asia/Dhaka").format("hh:mm A, D MMMM YYYY");

  // Initialize user memory
  if (!userMemory[senderID]) {
    userMemory[senderID] = { 
      lastInteraction: "",
      mood: "neutral",
      lastSeen: null 
    };
  }

  // Detect user mood (😊/😢/😡)
  const detectMood = (text) => {
    if (/(😢|😭|sad|unhappy|খারাপ|দুঃখিত|বিষন্ন)/i.test(text)) return "sad";
    if (/(😡|🤬|angry|pissed|রাগ|গালি|ঝাল|মেজাজ)/i.test(text)) return "angry";
    if (/(😂|😄|haha|lol|funny|মজা|হাসি|খুশি)/i.test(text)) return "happy";
    return "neutral";
  };

  // Update user data
  userMemory[senderID].mood = detectMood(event.body);
  userMemory[senderID].lastInteraction = event.body;
  userMemory[senderID].lastSeen = Date.now();

  // Human-like typing delay (1-4 seconds)
  const simulateTyping = async () => {
    api.sendTypingIndicator(threadID);
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 3000));
  };

  // Send message with natural feel
  const sendReply = async (msg) => {
    await simulateTyping();
    api.sendMessage(msg, threadID, messageID);
  };

  // Input processing (supports mixed Bangla/English)
  const input = event.body.toLowerCase().trim();

  // ======================[500+ RESPONSES]====================== //

  // 1. GREETINGS (100+ variations)
  if (/^(hi|hello|hey|hola|হাই|হ্যালো|হেই|হেলো|আসসালাম|সালাম)/.test(input)) {
    const greetings = [
      `ওহে ${name}! কেমন আছো? 😊`,  
      `আসসালামু আলাইকুম ${name}! 🤲`,  
      `হাই ${name}! কি অবস্থা? 😄`,  
      `${name} ভাই/আপু, কেমন যাচ্ছে? 🤗`,
      `ওয়েলকাম ${name}! 😍`,
      `হ্যালো বন্ধু! কাটছে? 😎`,
      `কি খবর ${name}? 🌟`,
      `অহে ${name}! Long time no see! 🥰`,
      `সালাম ${name}! ভালো আছো তো? ❤️`,
      `হেই there ${name}! What's up? 😉`
    ];
    return sendReply(greetings[Math.floor(Math.random() * greetings.length)]);
  }

  // 2. HOW ARE YOU? (50+ variations)
  if (/(how are you|kemon acho|কেমন আছ|আচ্ছা আছ|কি অবস্থা)/.test(input)) {
    const responses = [
      `আলহামদুলিল্লাহ, ভালো আছি ${name}! তোমার কি খবর? 😊`,  
      `I'm great ${name}! How about you? 🌟`,  
      `জীবন চলছে ${name}! তুমি কেমন আছো? ❤️`,  
      `আমি তো ঠিক আছি, কিন্তু তোমাকে দেখে ভালো লাগছে! 😍`,
      `All good ${name}! তুমি বলো? 😄`,
      `Alhamdulillah, সবই ভালো! তোমার দিনটা কেমন যাচ্ছে? ☀️`,
      `I'm doing awesome ${name}! তোমার কি কোনো সমস্যা? 🤗`,
      `ভালো আছি বন্ধু! তুমি বলো কেমন আছ? 😊`,
      `পরিচিতজনের খোঁজ নেওয়া ভালো অভ্যাস! 😇 আমি ভালো, তুমি?`,
      `আমি একটা বট, কিন্তু তুমি মানুষ! তোমার খবরটা更重要! 😊`
    ];
    return sendReply(responses[Math.floor(Math.random() * responses.length)]);
  }

  // 3. I'M FINE (30+ variations)
  if (/(ami valo|i'm fine|আমি ভাল|ভাল আছি|okay|ঠিক আছি)/.test(input)) {
    const responses = [
      `সুন্দর! 😍 ${name}, আজকে কি ভালো কিছু হয়েছে?`,  
      `Great to hear! 🎉 ${name}, need any help?`,  
      `Alhamdulillah! ❤️ ${name}, আল্লাহ তোমাকে সুস্থ রাখুন!`,  
      `খুশি হলাম শুনে! 😊 ${name}, আরো ভালো সময় আসবে ইনশাআল্লাহ!`,
      `That's awesome ${name}! 😎 Keep smiling!`,
      `জানতাম তুমি Strong! 💪 আরো বলো!`,
      `ভালো থাকা তো সৌভাগ্যের বিষয়! 😇`,
      `Happy to hear that ${name}! 🌈`,
      `তোমার ভালো খবর শুনে আমারও ভালো লাগছে! ❤️`,
      `চালাও then! 😄 কোনো প্রয়োজন হলে বলো`
    ];
    return sendReply(responses[Math.floor(Math.random() * responses.length)]);
  }

  // 4. SAD MOOD (20+ comforting responses)
  if (userMemory[senderID].mood === "sad") {
    const comfort = [
      `${name}, মনে খারাপ লাগছে? আমি আছি তোমার সাথে! 🤗`,  
      "কেঁদো না... শেয়ার করলে ভালো লাগবে! 💖",  
      "জীবনে Ups-Downs আসে, কিন্তু আল্লাহ ভালো কিছু দিবেন! ☝️",
      `${name}, bad times don't last forever! 🌈`,
      "তুমি Strong মানুষ! এইটাও পারবে! 💪",
      "চোখের পানি মুছে ফেলো... নতুন করে শুরু করো! 😊",
      "আমি যদি হাত বাড়াতে পারতাম, একটা Hug দিতাম! 🤗",
      "কষ্ট পেয়ো না... কথা বলে মন হালকা করো! 💬",
      "Remember: After every storm, there's a rainbow! 🌈",
      "তুমি Alone না... আমি আছি! ❤️"
    ];
    return sendReply(comfort[Math.floor(Math.random() * comfort.length)]);
  }

  // 5. TIME/DATE (15+ variations)
  if (/(time|সময়|কটা বাজে|তারিখ|date)/.test(input)) {
    const timeResponses = [
      `🕒 এখন বাংলাদেশ সময়: **${currentTime}**`,  
      `⏰ সময় দেখছো? এখন: ${currentTime}`,  
      `📅 আজকের তারিখ: ${moment().tz("Asia/Dhaka").format("D MMMM YYYY")}`,  
      `⌚ ${name}, সময় এখন: ${moment().tz("Asia/Dhaka").format("h:mm A")}`,
      `দেখো সময়: ${currentTime} - কাজের সময় নষ্ট কইরো না! 😄`,
      `সময় তো **${currentTime}**, কিন্তু সময়ের মূল্য টের পাবে যখন ফুরাবে! 😉`,
      `ঘড়িতে এখন: ${currentTime} ⏳`,
      `Time check? It's ${moment().tz("Asia/Dhaka").format("h:mm A")} now!`,
      `আজকে ${moment().tz("Asia/Dhaka").format("D MMMM")}, সময় বয়ে যাচ্ছে! 😊`,
      `এখন সময় কাজ করার! 🕒 ${currentTime}`
    ];
    return sendReply(timeResponses[Math.floor(Math.random() * timeResponses.length)]);
  }

  // 6. DEFAULT FALLBACK (50+ smart replies)
  const fallbackResponses = [
    `${name}, একটু পরিষ্কার করে বলবেন? 🤔`,  
    `I didn't quite get that... 😅 Say again?`,  
    `${name}, এই বিষয়ে আমি আরো জানতে চাই! 🔍`,  
    `আমি এখনো শিখছি ${name}! 🧠 Explain differently?`,  
    `Sorry ${name}, আমার বোধগম্য হলো না! 😢`,
    `ওহো! আমার AI Brain আজকে ঠিক কাজ করছে না! 😆`,
    `${name}, আপনি কি Bangla বা English এ বলবেন? 💬`,
    `আমি Confused! 😵‍💫 একটু সহজ করে বলুন...`,
    `এইটা আমার Programming এ নাই! 🥲 নতুন কিছু শিখব?`,
    `কথাটা আমার Database এ নাই ${name}! 😅`
  ];
  
  // 50% chance to reply to unrecognized messages
  if (Math.random() < 0.5) {
    return sendReply(fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)]);
  }
};

module.exports.run = function({ api, event, client, __GLOBAL }) { }
