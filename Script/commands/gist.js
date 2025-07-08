const fs = require('fs');
const axios = require('axios');

module.exports.config = {
 name: "gist",
 version: "6.9.0",
 hasPermission: 2,
 credits: "Shaon",
 description: "Convert code into gist link",
 commandCategory: "convert",
 usages: "!gist [filename] (reply or read file)",
 cooldowns: 5,
};

module.exports.run = async function ({ api, event, args }) {
 const { threadID, messageID, messageReply } = event;
 const fileName = args[0];

 if (!fileName) {
 return api.sendMessage(`❌ Please write the file name.\n\nExample: !gist hello`, threadID, messageID);
 }

 const path = `Script/commands/${fileName}.js`;
 let code = "";

 try {
 if (messageReply) {
 code = messageReply.body || "";
 if (!code) {
 return api.sendMessage("❌ রিপ্লাই করা মেসেজে কোনো টেক্সট পাওয়া যায়নি।", threadID, messageID);
 }
 } else {
 code = await fs.promises.readFile(path, 'utf-8');
 }

 const response = await axios.get(`https://noobs-api-sable.vercel.app/gist`, {
 params: {
 filename: `${fileName}.js`,
 code: code,
 description: 'Uploaded via Mirai Bot',
 isPublic: true
 }
 });

 const data = response.data;

 if (data.success) {
 return api.sendMessage(
 `✅ Gist upload successful! \n\n📥 Raw URL:\n${data.raw_url}`,
 threadID,
 messageID
 );
 } else {
 return api.sendMessage("❌ Gist তৈরি করতে ব্যর্থ হয়েছে। API ত্রুটি।", threadID, messageID);
 }
 } catch (error) {
 console.error("Error:", error);
 return api.sendMessage("❌ কমান্ড বা API তে সমস্যা হয়েছে। পরে চেষ্টা করুন।", threadID, messageID);
 }
};
