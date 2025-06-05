const fs = require("fs-extra");
const path = "./chat_memory.json";

// Initialize database
if (!fs.existsSync(path)) {
  fs.writeFileSync(path, JSON.stringify({
    users: {},
    phrases: {},
    statistics: {
      totalConversations: 0,
      lastUpdated: Date.now()
    }
  }, null, 2));
}

let memory = JSON.parse(fs.readFileSync(path));

module.exports.config = {
  name: "Genius Bot",
  version: "6.0.0",
  hasPermssion: 0,
  credits: "OMOR TE",
  description: "Self-improving AI",
  commandCategory: "AI",
  usages: "[query]",
  cooldowns: 5
};

module.exports.handleEvent = async function({ api, event }) {
  const { senderID, body } = event;
  const input = body.toLowerCase().trim();

  // Update conversation count
  memory.statistics.totalConversations++;
  memory.statistics.lastUpdated = Date.now();

  // Enhanced learning logic
  if (!memory.phrases[input]) {
    memory.phrases[input] = {
      responses: [],
      contexts: [],
      learnedFrom: [],
      usageCount: 0
    };
  }

  // Smart reply selection
  if (memory.phrases[input].responses.length > 0) {
    const bestReply = selectBestReply(input);
    api.sendMessage(bestReply, event.threadID);
    return;
  }

  // Learning mode
  if (shouldLearn(input)) {
    api.sendMessage(
      `🤔 How should I respond to:\n"${body}"?\n\n` +
      `Reply with:\n/teach [your preferred response]`,
      event.threadID
    );
  }
};

// Helper: Selects most effective response
function selectBestReply(phrase) {
  const possible = memory.phrases[phrase].responses;
  return possible[Math.floor(Math.random() * possible.length)];
}

// Helper: Determines when to learn
function shouldLearn(phrase) {
  return (
    !memory.phrases[phrase] ||
    memory.phrases[phrase].responses.length === 0
  );
}

// Save memory periodically
setInterval(() => {
  fs.writeFileSync(path, JSON.stringify(memory, null, 2));
}, 300000); // Auto-saves every 5 minutes
