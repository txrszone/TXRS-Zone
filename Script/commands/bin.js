const fs = require("fs"),
	path = require("path"),
	axios = require("axios");
module.exports.config = {
	name: "bin",
	version: "1.0",
	hasPermssion: 2,
	credits: "Shaon Ahmed",
	description: "Upload local command files to a pastebin service.",
	commandCategory: "utility",
	usages: "[filename]",
	cooldowns: 2
}, module.exports.run = async function({
	api: e,
	event: s,
	args: a
}) {
	if (0 === a.length) return e.sendMessage("📁 অনুগ্রহ করে ফাইলের নাম দিন।\nব্যবহার: pastebin <filename>", s.threadID, s.messageID);
	const n = a[0],
		r = path.join(__dirname, "..", "commands"),
		t = path.join(r, n),
		o = path.join(r, n + ".js");
	let i;
	if (fs.existsSync(t)) i = t;
	else {
		if (!fs.existsSync(o)) return e.sendMessage("❌ `commands` ফোল্ডারে ফাইলটি খুঁজে পাওয়া যায়নি।", s.threadID, s.messageID);
		i = o
	}
	fs.readFile(i, "utf8", (async (a, n) => {
		if (a) return console.error("❗ Read error:", a), e.sendMessage("❗ ফাইলটি পড়তে সমস্যা হয়েছে।", s.threadID, s.messageID);
		try {
			e.sendMessage("📤 ফাইল আপলোড হচ্ছে PasteBin-এ, অনুগ্রহ করে অপেক্ষা করুন...", s.threadID, (async (a, r) => {
				if (a) return console.error(a);
				const t = "https://pastebin-api.vercel.app",
					o = await axios.post(`${t}/paste`, {
						text: n
					});
				if (setTimeout((() => {
						e.unsendMessage(r.messageID)
					}), 1e3), o.data && o.data.id) {
					const a = `${t}/raw/${o.data.id}`;
					return e.sendMessage(`✅ ফাইল সফলভাবে আপলোড হয়েছে:\n🔗 ${a}`, s.threadID)
				}
				return console.error("⚠️ Unexpected API response:", o.data), e.sendMessage("⚠️ আপলোড ব্যর্থ হয়েছে। PasteBin সার্ভার থেকে সঠিক আইডি পাওয়া যায়নি।", s.threadID)
			}))
		} catch (a) {
			return console.error("❌ Upload error:", a), e.sendMessage("❌ ফাইল আপলোড করতে সমস্যা হয়েছে:\n" + a.message, s.threadID)
		}
	}))
};
