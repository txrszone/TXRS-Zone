const axios = require("axios");

module.exports.config = { 
name: "uprobot", 
version: "1.1.0",
hasPermission: 0,
credits: "Shaon Ahmed | Modified & Extended by Omor TE",
description: "Create, list, status, and delete UptimeRobot monitors",
commandCategory: "system",
usages: "/uprobot [create|status|list|delete] [params]",
cooldowns: 5, };

module.exports.run = async function ({ api, event, args }) { const [action, ...params] = args; const threadID = event.threadID; const messageID = event.messageID;

const send = msg => api.sendMessage(msg, threadID, messageID);

switch ((action || '').toLowerCase()) { case 'create': { const [name, url] = params; const interval = 300; if (!name || !url || !url.startsWith("http")) { return send("❌ Usage: /uprobot create [name] [valid-url]"); }

try {
   const res = await axios.get("https://web-api-delta.vercel.app/upt", {
     params: { name, url, interval }
   });
   const result = res.data;
   if (result.error) return send(`⚠️ Error: ${result.error}`);

   const monitor = result.data;
   return send(`✅ Monitor Created!

────────────── 🆔 ID: ${monitor.id} 📛 Name: ${monitor.name} 🔗 URL: ${monitor.url} ⏱️ Interval: ${monitor.interval / 60} mins 📶 Status: ${monitor.status == 1 ? "Active ✅" : "Inactive ❌"}); } catch (e) { return send(🚫 API Error: ${e.message}`); } }

case 'list': { try { const res = await axios.get("https://web-api-delta.vercel.app/upt/all"); const monitors = res.data.data; if (!monitors.length) return send("📭 No monitors found.");

const msg = monitors.map((m, i) => `#${i+1} - ${m.name}\n🔗 ${m.url}\n🆔 ${m.id}\n📶 ${m.status == 1 ? "✅" : "❌"}`).join("\n\n");
   return send(`📋 All Monitors:

────────────── ${msg}); } catch (e) { return send(🚫 Failed to fetch list: ${e.message}`); } }

case 'status': { const [id] = params; if (!id) return send("❌ Usage: /uprobot status [id]");

try {
   const res = await axios.get("https://web-api-delta.vercel.app/upt/check", {
     params: { id }
   });

                
