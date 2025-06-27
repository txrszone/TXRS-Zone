module.exports.config = {
    name: "antiout",
    version: "1.0.0",
    credits: "OMOR TE",
    hasPermssion: 1,
    description: "Check or toggle antiout system status",
    usages: "antiout [on/off]",
    commandCategory: "system",
    cooldowns: 0
};

module.exports.run = async({ api, event, Threads }) => {
    let threadData = (await Threads.getData(event.threadID)).data || {};
    const args = event.body.split(" ").slice(1);
    
    // If no argument provided, show current status
    if (args.length === 0) {
        const currentStatus = threadData["antiout"] ? "ON 🟢" : "OFF 🔴";
        return api.sendMessage(
            `🔍 Antiout System Status\n━━━━━━━━━━━━━\n• Current Status: ${currentStatus}\n\nTo change, type:\n• /antiout on - Turn ON\n• /antiout off - Turn OFF`,
            event.threadID
        );
    }
    
    // Handle on/off commands
    const action = args[0].toLowerCase();
    if (action === 'on') {
        threadData["antiout"] = true;
    } else if (action === 'off') {
        threadData["antiout"] = false;
    } else {
        return api.sendMessage(
            `⚠️ Invalid command!\nUsage: /antiout [on/off]\nExample:\n• /antiout on\n• /antiout off`,
            event.threadID
        );
    }
    
    // Save the new settings
    await Threads.setData(event.threadID, { data: threadData });
    global.data.threadData.set(parseInt(event.threadID), threadData);
    
    // Confirmation message
    const newStatus = threadData["antiout"] ? "ON 🟢" : "OFF 🔴";
    return api.sendMessage(
        `✅ Antiout System Updated\n━━━━━━━━━━━━━\n• New Status: ${newStatus}`,
        event.threadID
    );
};
