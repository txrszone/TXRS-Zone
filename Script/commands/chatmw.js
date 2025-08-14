const axios = require("axios");

module.exports.config = {
    name: "chatmw",
    version: "1.0.0",
    credits: "Omor & ChatGPT",
    description: "Chat with Shapes API",
    usages: "/chatmw <message>",
    cooldowns: 2
};

module.exports.run = async function({ api, event, args }) {
    const API_KEY = "I38TFQEKOAO1RNA6ONXY5IZQLRZHXYXXOITEYSIRKHM";
    const MODEL_ID = "shapesinc/mwlegendsofficialchatbot-g2rg";
    const API_URL = "https://api.shapes.inc/v1/chat/completions";

    const userMessage = args.join(" ");
    if (!userMessage) {
        return api.sendMessage("⚠ দয়া করে /chatmw এর পরে আপনার মেসেজ লিখুন।", event.threadID, event.messageID);
    }

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

        if (res.data && res.data.choices && res.data.choices[0].message.content) {
            api.sendMessage(res.data.choices[0].message.content, event.threadID, event.messageID);
        } else {
            api.sendMessage("❌ কোনো উত্তর পাওয়া যায়নি।", event.threadID, event.messageID);
        }

    } catch (err) {
        api.sendMessage(`❌ API কল ব্যর্থ: ${err.message}`, event.threadID, event.messageID);
    }
};
