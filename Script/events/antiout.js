module.exports.config = {
  name: "antiout",
  eventType: ["log:unsubscribe"],
  version: "1.0.0",
  credits: "OMOR TE, ChatGPT",
  description: "Prevent members from leaving the group automatically",
  commandCategory: "group",
  cooldowns: 0
};

module.exports.onLoad = function() {
  // Initialize antiout as off by default
  if (typeof global.antiout === "undefined") {
    global.antiout = {};
  }
}

module.exports.run = async({ event, api, Threads, Users }) => {
  let data = (await Threads.getData(event.threadID)).data || {};
  
  // Check if antiout is off for this thread
  if (global.antiout[event.threadID] === false || data.antiout === false) return;
  
  if (event.logMessageData.leftParticipantFbId == api.getCurrentUserID()) return;
  
  const name = global.data.userName.get(event.logMessageData.leftParticipantFbId) || await Users.getNameUser(event.logMessageData.leftParticipantFbId);
  const type = (event.author == event.logMessageData.leftParticipantFbId) ? "self-separation" : "being kicked by admin";
  
  if (type == "self-separation") {
    api.addUserToGroup(event.logMessageData.leftParticipantFbId, event.threadID, (error, info) => {
      if (error) {
        api.sendMessage(`Sorry boss, I couldn't prevent ${name} from leaving.\nThey might have blocked me or have messenger privacy settings that prevent me from adding them back. 😞\n\n──────·····✦·····────\nMW Legends Bot | Omor TE`, event.threadID);
      } else {
        api.sendMessage(`Listen up ${name}, this group is a gang!\nYou need admin clearance to leave here!\nYou left without permission - I've added you back mafia style.\n\n──────·····✦·····────\nMW Legends Bot | Omor TE`, event.threadID);
      }
    });
  }
}
