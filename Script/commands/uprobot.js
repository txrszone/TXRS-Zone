const axios = require("axios");

module.exports.config = {
  name: "uprobot",
  version: "1.0.2",
  role: 0,
  credits: "Shaon Ahmed",
  description: "Uptime monitor (create, delete, status, list)",
  commandCategory: "system",
  usages: "upt [name] [url] | upt delete [id] | upt status [id] | upt list",
  cooldowns: 5,
};

module.exports.run = async function ({ api, event, args }) {
  const apiLink = "https://web-api-delta.vercel.app/upt"; // 🔥 এখানে তোমার API URL বসাও

  if (!args.length) {
    return api.sendMessage(
      `📍 Usage:\n\n` +
        `✅ Create: upt [name] [url]\n` +
        `🗑️ Delete: upt delete [id]\n` +
        `📊 Status: upt status [id]\n` +
        `📜 List: upt list\n\n` +
        `Example:\n` +
        `upt Shaon https://example.com\n` +
        `upt delete 123456\n` +
        `upt status 123456\n` +
        `upt list`,
      event.threadID,
      event.messageID
    );
  }

  const command = args[0].toLowerCase();

  // ✅ Delete Command
  if (command === "delete") {
    const id = args[1];
    if (!id)
      return api.sendMessage(
        "❌ Please provide the monitor ID.\nUsage: upt delete <id>",
        event.threadID,
        event.messageID
      );

    try {
      const res = await axios.get(`${apiLink}?delete=true&id=${id}`);
      const result = res.data;
      if (result.success) {
        return api.sendMessage(result.message, event.threadID, event.messageID);
      } else {
        return api.sendMessage(`❌ Error:\n${result.message}`, event.threadID, event.messageID);
      }
    } catch (e) {
      return api.sendMessage(`🚫 API Error: ${e.message}`, event.threadID, event.messageID);
    }
  }

  // ✅ Status Command
  if (command === "status") {
    const id = args[1];
    if (!id)
      return api.sendMessage(
        "❌ Please provide the monitor ID.\nUsage: upt status <id>",
        event.threadID,
        event.messageID
      );

    try {
      const res = await axios.get(`${apiLink}?status=true&id=${id}`);
      const result = res.data;

      if (result.success) {
        const data = result.data;
        return api.sendMessage(
          `📊 Monitor Status:\n` +
            `🆔 ID: ${data.id}\n` +
            `📛 Name: ${data.name}\n` +
            `🔗 URL: ${data.url}\n` +
            `⏰ Interval: ${data.interval} minutes\n` +
            `📶 Status: ${
              data.status == 2
                ? "🟢 Up"
                : data.status == 9
                ? "🔴 Down"
                : "⚪️ Paused"
            }`,
          event.threadID,
          event.messageID
        );
      } else {
        return api.sendMessage(`❌ Error:\n${result.message}`, event.threadID, event.messageID);
      }
    } catch (e) {
      return api.sendMessage(`🚫 API Error: ${e.message}`, event.threadID, event.messageID);
    }
  }

  // ✅ List Command
  if (command === "list") {
    try {
      const res = await axios.get(`${apiLink}?list=true`);
      const result = res.data;

      if (result.success) {
        const list = result.monitors;
        if (list.length === 0) {
          return api.sendMessage(`❌ No monitor found.`, event.threadID, event.messageID);
        }

        const msg = list
          .map(
            (item, index) =>
              `${index + 1}. 🌐 ${item.name}\n` +
              `🔗 ${item.url}\n` +
              `🆔 ID: ${item.id}\n` +
              `📶 Status: ${
                item.status == 2
                  ? "🟢 Up"
                  : item.status == 9
                  ? "🔴 Down"
                  : "⚪️ Paused"
              }\n`
          )
          .join("\n");

        return api.sendMessage(`📜 Monitor List:\n\n${msg}`, event.threadID, event.messageID);
      } else {
        return api.sendMessage(`❌ Error:\n${result.message}`, event.threadID, event.messageID);
      }
    } catch (e) {
      return api.sendMessage(`🚫 API Error: ${e.message}`, event.threadID, event.messageID);
    }
  }

  // ✅ Create Command
  const name = args[0];
  const url = args[1];

  if (!url || !url.startsWith("http")) {
    return api.sendMessage(
      "❌ Please provide name and valid URL.\nUsage: upt [name] [url]",
      event.threadID,
      event.messageID
    );
  }

  try {
    const res = await axios.get(`${apiLink}?url=${encodeURIComponent(url)}&name=${encodeURIComponent(name)}`);
    const result = res.data;

    if (result.success) {
      const data = result.data;
      return api.sendMessage(
        `✅ Monitor Created!\n──────────────\n` +
          `🆔 ID: ${data.id}\n` +
          `📛 Name: ${data.name}\n` +
          `🔗 URL: ${data.url}\n` +
          `⏰ Interval: ${data.interval} minutes\n` +
          `📶 Status: ${
            data.status == 2
              ? "🟢 Up"
              : data.status == 9
              ? "🔴 Down"
              : "⚪️ Paused"
          }`,
        event.threadID,
        event.messageID
      );
    } else {
      return api.sendMessage(`❌ Error:\n${result.message}`, event.threadID, event.messageID);
    }
  } catch (e) {
    return api.sendMessage(`🚫 API Error: ${e.message}`, event.threadID, event.messageID);
  }
};
