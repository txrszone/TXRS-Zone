module.exports.config = {
    name: "chat",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Omor T.E & ChatGPT",
    description: "Chat with Shapes API",
    commandCategory: "Fun",
    usages: "/chat <message>",
    cooldowns: 2,
    dependencies: { "axios": "" }
};

module.exports.run = async ({ api, event, args }) => {
    const axios = require("axios");
    const API_KEY = "I38TFQEKOAO1RNA6ONXY5IZQLRZHXYXXOITEYSIRKHM";
    const MODEL_ID = "shapesinc/mwlegendsofficialchatbot-g2rg";
    const API_URL = "https://api.shapes.inc/v1/chat/completions";

    const userMessage = args.join(" ");
    if (!userMessage) {
        return api.sendMessage("⚠ দয়া করে /chat এর পরে আপনার মেসেজ লিখুন।", event.threadID, event.messageID);
    }

    api.sendMessage(`💬 অনুরোধ পাঠানো হচ্ছে...`, event.threadID, async (err, info) => {
        try {
            const res = await axios.post(API_URL, {
                model: MODEL_ID,
                messages: [
                    { role: "user", content: userMessage }
                ]
            }, {
                headers: {
                    "Authorization": `Bearer ${API_KEY}`,
                    "Content-Type": "application/json"
                }
            });

            setTimeout(() => {
                api.unsendMessage(info.messageID);
            }, 3000);

            if (res.data && res.data.choices && res.data.choices[0].message.content) {
                return api.sendMessage(res.data.choices[0].message.content, event.threadID, event.messageID);
            } else {
                return api.sendMessage("❌ কোনো উত্তর পাওয়া যায়নি।", event.threadID, event.messageID);
            }
        } catch (error) {
            setTimeout(() => {
                api.unsendMessage(info.messageID);
            }, 3000);
            return api.sendMessage(`❌ ত্রুটি: ${error.message}`, event.threadID, event.messageID);
        }
    });
};
