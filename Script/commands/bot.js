const fs = global.nodemodule["fs-extra"];
const axios = require('axios'); // For weather API
const moment = require("moment-timezone");

module.exports.config = {
  name: "Obot",
  version: "3.0.0",
  hasPermssion: 0,
  credits: "OMOR TE, DEEPSEEK",
  description: "Advanced Interactive Assistant Bot",
  commandCategory: "Noprefix",
  usages: "noprefix",
  cooldowns: 4,
};

module.exports.handleEvent = async function({ api, event, args, Threads, Users }) {
  const { threadID, messageID } = event;
  const id = event.senderID;
  const name = await Users.getNameUser(id);
  const input = event.body.toLowerCase().trim();

  // Enhanced responses array with better emojis
  const greetings = [
    `${name}, আমি আপনার জন্য কিভাবে সাহায্য করতে পারি? ✨`,
    `হ্যালো ${name}! কেমন আছেন আজ? 🌸`,
    `${name}, আপনার জন্য কি করতে পারি? 🤗`,
    `আপনার কথা শুনছি ${name}... বলুন 👂`,
    `${name}, আজকে আপনার দিনটি কেমন যাচ্ছে? ☀️`,
    `আমি সবসময় এখানে আছি আপনাকে সাহায্য করতে! 💖`,
    `${name}, কিছু বলতে চাচ্ছেন? 😊`,
    `আপনার জন্য অপেক্ষা করছি ${name}... ⏳`,
    `${name}, আপনার দিনটি সুন্দর হোক! 🌈`,
    `${name}, আপনার সাথে চ্যাট করতে ভালো লাগছে! 😍`
  ];

  // Time/Date Responses (multiple trigger words)
  if (/(সময়|shomoy|time|কয়টা বাজে|koyta baje|date|তারিখ)/.test(input)) {
    const currentTime = moment().tz("Asia/Dhaka").format("hh:mm A, DD/MM/YYYY");
    const timeResponses = [
      `🕒 এখন বাংলাদেশ সময়: ${currentTime}`,
      `⏰ সময়: ${currentTime}`,
      `${name}, সময় এখন: ${currentTime}`,
      `📅 তারিখসহ সময়: ${currentTime}`
    ];
    return api.sendMessage(timeResponses[Math.floor(Math.random() * timeResponses.length)], threadID);
  }

  // Weather Responses
  if (/(weather|আবহাওয়া|আবহাওয়া)/.test(input)) {
    const location = input.replace(/(weather|আবহাওয়া|আবহাওয়া)/, "").trim();
    if (!location) {
      return api.sendMessage(`🌤️ ${name}, আবহাওয়া জানতে স্থানের নাম লিখুন। যেমন: "weather Dhaka" বা "আবহাওয়া চট্টগ্রাম"`, threadID);
    }
    
    try {
      // This is a placeholder - replace with actual weather API call
      const weatherData = await getWeatherData(location);
      return api.sendMessage(`🌦️ ${name}, ${location}-এর আবহাওয়া:\n${weatherData}`, threadID);
    } catch (error) {
      return api.sendMessage(`⚠️ ${name}, আবহাওয়া তথ্য পাওয়া যায়নি। অন্য স্থান চেষ্টা করুন।`, threadID);
    }
  }

  // How are you responses (multiple variations)
  if (/(how are you|kemon acho|কেমন আছো|valo acho|ভালো আছো|are you fine)/.test(input)) {
    const wellbeingResponses = [
      `আলহামদুলিল্লাহ, আমি ভালো আছি ${name}! আপনাকে দেখে ভালো লাগছে 😊`,
      `আমি সবসময় ভালো থাকি ${name}, কারণ আমার কাজই হলো আপনাকে সাহায্য করা! 💖`,
      `ধন্যবাদ জিজ্ঞাসা করার জন্য ${name}! আমি ঠিক আছি, আর আপনি? 🌸`,
      `Alhamdulillah ${name}, সবই ভালো! আপনার দিনটা কেমন যাচ্ছে? ☀️`,
      `আমি একটা বট, কিন্তু তুমি মানুষ! তোমার খবরটা বেশি গুরুত্বপূর্ণ! 😊`
    ];
    return api.sendMessage(wellbeingResponses[Math.floor(Math.random() * wellbeingResponses.length)], threadID);
  }

  // Custom responses for specific phrases
  const responseMap = {
    "miss you": [`${name}, আমিও আপনার কথা ভাবছিলাম! 💖`, `আপনাকে দেখে ভালো লাগছে ${name}! 😊`],
    "assalamualaikum": ["ওয়ালাইকুম আসসালাম! 🤲", "ওয়ালাইকুম আসসালাম ওয়া রাহমাতুল্লাহ! ☪️"],
    "salam": ["ওয়ালাইকুম আসসালাম! 🤲", "সালাম নেওয়ার জন্য ধন্যবাদ!"],
    "thank you": [`আপনাকে স্বাগতম ${name}! 😊`, `কোনো সমস্যা নেই ${name}! 😇`],
    "thanks": [`আপনাকে স্বাগতম ${name}! 😊`, `কোনো সমস্যা নেই ${name}! 😇`],
    "owner": ["এই বটটি Omor TE দ্বারা তৈরি হয়েছে 🚀", "ডেভেলপার: Omor TE 💻"],
    "creator": ["এই বটটি Omor TE দ্বারা তৈরি হয়েছে 🚀", "ডেভেলপার: Omor TE 💻"],
    "help": [
      `${name}, আমি আপনাকে সাহায্য করতে পারি:\n\n` +
      `• সময়/তারিখ জানাতে ⏰\n` +
      `• আবহাওয়া জানাতে 🌦️ (weather [location] লিখুন)\n` +
      `• সাধারণ তথ্য 🔍\n` +
      `• ইসলামিক তথ্য ☪️\n\n` +
      `আপনি কি চান?`
    ],
    "i love you", "love": ["ধন্যবাদ! মানুষ ও প্রযুক্তির মধ্যে সুন্দর সম্পর্ক গড়ে উঠুক ❤️", "আমিও আপনাকে ভালোবাসি 🤖🩷"],
    "valobashi": ["ধন্যবাদ! মানুষ ও প্রযুক্তির মধ্যে সুন্দর সম্পর্ক গড়ে উঠুক ❤️", "আমিও আপনাকে ভালোবাসি 🤖🩷"]
  };

  // Check if input matches any custom response
  for (const [keyword, responses] of Object.entries(responseMap)) {
    if (input === keyword.toLowerCase()) {
      return api.sendMessage(responses[Math.floor(Math.random() * responses.length)], threadID);
    }
  }

  // General bot trigger
  if (/^(bot|obot|বট|robot)/.test(input)) {
    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
    return api.sendMessage(randomGreeting, threadID, messageID);
  }

  // Fallback - don't respond to unrelated messages
};

// Placeholder weather function - replace with real API call
async function getWeatherData(location) {
  // Implement actual weather API integration here
  return `${location}-এর জন্য আবহাওয়া:\nতাপমাত্রা: 28°C\nআবহাওয়া: রৌদ্রোজ্জ্বল`;
}

module.exports.run = function({ api, event, client, __GLOBAL }) { };
