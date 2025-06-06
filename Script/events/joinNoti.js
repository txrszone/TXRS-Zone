module.exports.config = {
    name: "joinNoti",
    eventType: ["log:subscribe"],
    version: "1.0.1",
    credits: "OMOR TE",
    description: "Elegant welcome notification for new group members",
    dependencies: {
        "fs-extra": "",
        "path": "",
        "pidusage": ""
    }
};

module.exports.run = async function({ api, event }) {
    const { threadID } = event;
    
    // Bot join notification
    if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) {
        api.changeNickname(`[ ${global.config.PREFIX} ] • ${(!global.config.BOTNAME) ? " " : global.config.BOTNAME}`, threadID, api.getCurrentUserID());
        
        return api.sendMessage({
            body: `🌺✨ 𝗪𝗔𝗥𝗠 𝗪𝗘𝗟𝗖𝗢𝗠𝗘 ✨🌺

╔══════════════╗
 ⚓𝐌𝐖 𝐋𝐄𝐆𝐄𝐍𝐃𝐒 ☸️
╚══════════════╝

Thank you for inviting me to your group! 💖

I'm honored to serve you with:
✦ ${global.config.PREFIX}help - Command list
✦ ${global.config.PREFIX}menu - Full features

Let's make wonderful memories together! ✨

🏴‍☠️⚓ MW LEGENDS is now at your service! ⛵☸️`
        }, threadID);
    }
    else {
        try {
            let { threadName, participantIDs } = await api.getThreadInfo(threadID);
            const threadData = global.data.threadData.get(parseInt(threadID)) || {};
            
            let mentions = [], nameArray = [], memLength = [], i = 0;
            
            for (let id in event.logMessageData.addedParticipants) {
                const userName = event.logMessageData.addedParticipants[id].fullName;
                nameArray.push(userName);
                mentions.push({ tag: userName, id });
                memLength.push(participantIDs.length - i++);
            }
            
            // Custom welcome message template
            let msg = (typeof threadData.customJoin == "undefined") ? 
`🌸 𝗡𝗘𝗪 𝗠𝗘𝗠𝗕𝗘𝗥 𝗔𝗟𝗘𝗥𝗧 🌸

╔══════════════╗
   WELCOME TO-
   ${threadName}
╚══════════════╝

✨ Dear ${nameArray.join(', ')} ✨

We're delighted to have you as our ${memLength.join(', ')}${memLength.length > 1 ? 'th' : 'th'} member!

May this group bring you:
☀️ Joy and laughter
🌙 Meaningful connections
🌟 Wonderful memories

Enjoy your stay! 💫

🏴‍☠️⚓ MW LEGENDS Family ☸️⛵` 
            : threadData.customJoin;

            // Replace placeholders
            msg = msg
                .replace(/\{name}/g, nameArray.join(', '))
                .replace(/\{type}/g, (memLength.length > 1) ? 'friends' : 'friend')
                .replace(/\{soThanhVien}/g, memLength.join(', '))
                .replace(/\{threadName}/g, threadName);

            return api.sendMessage({ 
                body: msg,
                mentions 
            }, threadID);
        } catch (e) { 
            console.error(e);
            return api.sendMessage("🌸 Welcome to our new members! 🌸", threadID);
        }
    }
};
