const axios = require("axios");
const request = require('request');
const fs = require("fs-extra");

module.exports.config = {
  name: "help",
  version: "1.0.2",
  hasPermssion: 0,
  credits: "𝐂𝐘𝐁𝐄𝐑 ☢️_𖣘 -𝐁𝐎𝐓 ⚠️ 𝑻𝑬𝑨𝑴_ ☢️",
  description: "FREE SET-UP MESSENGER",
  commandCategory: "system",
  usages: "[Name module]",
  cooldowns: 1,
  envConfig: {
    autoUnsend: true,
    delayUnsend: 20
  }
};

module.exports.languages = {
  "en": {
    "moduleInfo": `╭──────•◈•──────╮\n |   MW Legends Discord Bot is now in Messenger!; | \n it's always in development \n |●𝗡𝗮𝗺𝗲: •—» %1 «—•\n |●𝗨𝘀𝗮𝗴𝗲: %3\n |●𝗗𝗲𝘀𝗰𝗿𝗶𝗽𝘁𝗶𝗼𝗻: %2\n |●𝗖𝗮𝘁𝗲𝗴𝗼𝗿𝘆: %4\n |●𝗪𝗮𝗶𝘁𝗶𝗻𝗴 𝘁𝗶𝗺𝗲: %5 seconds(s)\n |●𝗣𝗲𝗿𝗺𝗶𝘀𝘀𝗶𝗼𝗻: %6\n |𝗠𝗼𝗱𝘂𝗹𝗲 𝗰𝗼𝗱𝗲 𝗯𝘆\n |•—» ChatGPT + Omor TE. «-•\n╰──────•◈•──────╯`,
    "helpList": '[ There are %1 commands on this bot, Use: "%2help nameCommand" to know how to use! ]',
    "user": "User",
    "adminGroup": "Admin group",
    "adminBot": "Admin bot"
  }
};

const imgLinks = [
  "https://i.postimg.cc/0jRGknT9/FB-IMG-1744474199349.jpg",
  "https://i.postimg.cc/Y9KK7KC0/Polish-20250526-101350151.jpg",
  "https://i.postimg.cc/VNvjbDPq/Image-Download-26-05-2025-09-56-48.jpg",
  "https://i.postimg.cc/brgK1ZHS/Hitube-c-Rb-Pat-Cm-XZ-2025-05-26-10-05-46.jpg",
  "https://i.postimg.cc/MT84479j/Hitube-Bt4-Wyjgo-WZ-2025-05-26-10-05-58.jpg",
  "https://i.postimg.cc/YS8YKk3f/received-395252956651820.jpg",
  "https://i.postimg.cc/0N5ZJVXn/a844a740b33eba79b486744759914953-1.jpg",
  "https://i.postimg.cc/L6kG8BS4/received-1875128426597909.png",
  "https://i.postimg.cc/7ZxdGGP3/received-1258556092530363.png"
];

// Utility function to get a random image
const getRandomImage = () => imgLinks[Math.floor(Math.random() * imgLinks.length)];

module.exports.handleEvent = function ({ api, event, getText }) {
  const { commands } = global.client;
  const { threadID, messageID, body } = event;

  if (!body || body.indexOf("help") !== 0) return;
  const splitBody = body.trim().split(/\s+/);
  if (splitBody.length < 2 || !commands.has(splitBody[1].toLowerCase())) return;

  const command = commands.get(splitBody[1].toLowerCase());
  const prefix = global.config.PREFIX;
  return api.sendMessage(getText("moduleInfo",
    command.config.name,
    command.config.description,
    `${prefix}${command.config.name} ${command.config.usages || ""}`,
    command.config.commandCategory,
    command.config.cooldowns,
    command.config.hasPermssion == 0 ? getText("user") :
    command.config.hasPermssion == 1 ? getText("adminGroup") : getText("adminBot"),
    command.config.credits), threadID, messageID);
};

module.exports.run = function ({ api, event, args, getText }) {
  const { commands } = global.client;
  const { threadID, messageID } = event;
  const command = commands.get((args[0] || "").toLowerCase());
  const prefix = global.config.PREFIX;
  const { autoUnsend, delayUnsend } = global.configModule[this.config.name];

  const imagePath = __dirname + `/cache/help_random.jpg`;
  const imageURL = getRandomImage();

  const sendWithImage = (msgBody) => {
    const callback = () => {
      api.sendMessage({ body: msgBody, attachment: fs.createReadStream(imagePath) },
        threadID, () => fs.unlinkSync(imagePath), messageID);
    };
    request(encodeURI(imageURL)).pipe(fs.createWriteStream(imagePath)).on("close", callback);
  };

  if (args[0] === "all") {
    let groups = [], msg = "";
    for (const cmd of commands.values()) {
      const cat = cmd.config.commandCategory.toLowerCase();
      const group = groups.find(g => g.group === cat);
      if (group) group.cmds.push(cmd.config.name);
      else groups.push({ group: cat, cmds: [cmd.config.name] });
    }

    groups.forEach(g => {
      msg += `❄️ ${g.group.charAt(0).toUpperCase() + g.group.slice(1)} \n${g.cmds.join(' • ')}\n\n`;
    });

    const finalMsg = `✿🄲🄾🄼🄼🄰🄽🄳 🄻🄸🅂🅃✿\n\n${msg}✿══════════════✿\n│𝗨𝘀𝗲 ${prefix}help [Name?]\n│𝗨𝘀𝗲 ${prefix}help [Page?]\n│𝗡𝗔𝗠𝗘 𝗢𝗪𝗡𝗘𝗥 : │Ullash ッ\n│𝗧𝗢𝗧𝗔𝗟 : ${commands.size}\n————————————`;
    return sendWithImage(finalMsg);
  }

  if (!command) {
    const allCmds = Array.from(commands.keys()).sort();
    const page = parseInt(args[0]) || 1;
    const perPage = 15;
    const totalPages = Math.ceil(allCmds.length / perPage);
    const cmdsOnPage = allCmds.slice((page - 1) * perPage, page * perPage);

    let msg = `╭──────•◈•──────╮\n |      MW Legends ⚓🏴‍☠️ \n |   🄲🄾🄼🄼🄰🄽🄳 🄻🄸🅂🅃\n╰──────•◈•──────╯\n\n`;
    for (const name of cmdsOnPage) msg += `•—»[ ${name} ]«—•\n`;
    msg += `\n╭──────•◈•──────╮\n│𝗨𝘀𝗲 ${prefix}help [Name?]\n│𝗨𝘀𝗲 ${prefix}help [Page?]\n│𝗡𝗔𝗠𝗘 𝗢𝗪𝗡𝗘𝗥 : │ Omor TE\n│𝗧𝗢𝗧𝗔𝗟 : [${allCmds.length}]\n│📄🄿🄰🄶🄴📃 :  [${page}/${totalPages}]\n╰──────•◈•──────╯`;
    return sendWithImage(msg);
  }

  // If valid command is found
  const msg = getText("moduleInfo",
    command.config.name,
    command.config.description,
    `${command.config.usages || ""}`,
    command.config.commandCategory,
    command.config.cooldowns,
    command.config.hasPermssion == 0 ? getText("user") :
    command.config.hasPermssion == 1 ? getText("adminGroup") : getText("adminBot"),
    command.config.credits);

  return sendWithImage(msg);
};
