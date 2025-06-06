module.exports.config = {
  name: "leave",
  eventType: ["log:unsubscribe"],
  version: "1.0.0",
  credits: "OMOR and DEEPSEEK", // Changed credit
  description: "Sends a farewell message when someone leaves the group (including bots)", // Improved description
  dependencies: {
    "fs-extra": "",
    "path": ""
  }
};

module.exports.run = async function({ api, event, Users, Threads }) {
  if (event.logMessageData.leftParticipantFbId == api.getCurrentUserID()) return;
  
  const moment = require("moment-timezone");
  const time = moment.tz("Asia/Dhaka").format("DD/MM/YYYY || HH:mm:ss");
  const hours = moment.tz("Asia/Dhaka").format("HH");
  
  const { threadID } = event;
  const data = global.data.threadData.get(parseInt(threadID)) || (await Threads.getData(threadID)).data;
  const name = global.data.userName.get(event.logMessageData.leftParticipantFbId) || await Users.getNameUser(event.logMessageData.leftParticipantFbId);
  const type = (event.author == event.logMessageData.leftParticipantFbId) ? "left voluntarily" : "was removed";
  
  // Customizable farewell message
  let msg = (typeof data.customLeave == "undefined") ? 
    `✨・。.・°・。。・°・.・。・✨\n\n🌠 Goodbye, ${name}! \n\n⏰ Time: ${time}\n📌 Status: ${type}\n\n"Every new beginning comes from some other beginning's end."\n\nWe'll miss you in the group! 💔\n\n✨・。.・°・。。・°・.・。・✨` 
    : data.customLeave;
  
  // Replace placeholders
  msg = msg
    .replace(/\{name}/g, name)
    .replace(/\{type}/g, type)
    .replace(/\{time}/g, time)
    .replace(/\{session}/g, 
      hours <= 10 ? "Morning" :
      hours > 10 && hours <= 12 ? "Noon" :
      hours > 12 && hours <= 18 ? "Evening" : "Night");
  
  return api.sendMessage(msg, threadID);
};
