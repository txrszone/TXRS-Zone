// ==============================================
// Gemini AI Chatbot Module
// Purpose: Provides AI responses via Facebook Messenger
// Features: Text and image processing
// ==============================================

const axios = require('axios');

// Configuration for the chatbot module
module.exports = {
  config: {
    name: "ai", // Command name
    version: "1.0", // Module version
    credit: "DeepSeek", // Credits to developers
    description: "Gemini AI assistant", // Module description
    cooldowns: 3, // 5-second cooldown per user
    hasPermission: 0, // 0 = public, 1 = admin
    commandCategory: "AI", // Category
    usages: {
      en: "[question] - Ask Gemini AI\n[image] - Analyze images with AI"
    }
  },

  // Main execution function
  run: async ({ api, args, event }) => {
    try {
      // Extract message components
      const userQuery = args.join(" ");
      const isImageRequest = event.type === "message_reply" && 
                           event.messageReply.attachments[0]?.type === "photo";

      // Handle image + text requests
      if (isImageRequest) {
        const imageUrl = event.messageReply.attachments[0].url;
        
        const response = await axios.post("https://google.com/chat", {
          modelType: "text_and_image",
          prompt: userQuery,
          imageParts: [imageUrl]
        });

        const aiResponse = response.data.result;
        api.sendMessage(aiResponse, event.threadID, event.messageID);
      } 
      // Handle text-only requests
      else {
        if (!userQuery) {
          return api.sendMessage(
            "Assalamu Alaikum\n\nHow can I assist you today?", 
            event.threadID, 
            event.messageID
          );
        }

        const response = await axios.post("https://google.com/chat", {
          modelType: "text_only",
          prompt: userQuery
        });

        const aiResponse = response.data.result;
        api.sendMessage(aiResponse, event.threadID, event.messageID);
      }
    } catch (error) {
      console.error("Error calling Gemini:", error);
      api.sendMessage(
        "⚠️ Error:\nSorry, there was an error processing your request with Gemini AI.\n\n" + 
        (error.message || error),
        event.threadID,
        event.messageID
      );
    }
  }
};
