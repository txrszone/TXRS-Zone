module.exports.config = {
    name: "chat",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "Omor & ChatGPT",
    description: "Chat with Shapes API with typing effect",
    commandCategory: "Talk",
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

    // প্রথমে "typing..." মেসেজ পাঠানো
    api.sendMessage("💬 Typing...", event.threadID, async (err, info) => {
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

            // Typing মেসেজ আনসেন্ড করা
            if(info && info.messageID) {
                api.unsendMessage(info.messageID);
            }

            // Bot reply check & send
            const botReply = res?.data?.choices?.[0]?.message?.content;
            if(botReply) {
                // Typing effect simulation: word by word
                let words = botReply.split(" ");
                let typedMessage = "";
                for(let i=0; i<words.length; i++) {
                    typedMessage += words[i] + " ";
                    // Update message every 2 words
                    if(i % 2 === 1 || i === words.length -1){
                        await new Promise(r => setTimeout(r, 200)); // Delay
                        api.sendMessage(typedMessage.trim(), event.threadID, event.messageID);
                    }
                }
            } else {
                api.sendMessage("❌ কোনো উত্তর পাওয়া যায়নি।", event.threadID, event.messageID);
            }
        } catch (error) {
            if(info && info.messageID) {
                api.unsendMessage(info.messageID);
            }
            return api.sendMessage(`❌ ত্রুটি: ${error.message}`, event.threadID, event.messageID);
        }
    });
};
