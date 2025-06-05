const fs = require("fs");
module.exports.config = {
	name: "gali",
    version: "1.0.1",
	hasPermssion: 0,
	credits: "OMOR TE, MW Legends", 
	description: "no prefix",
	commandCategory: "no prefix",
	usages: "abal",
    cooldowns: 10, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	if (event.body.indexOf("Hello")==0 || event.body.indexOf("Hi")==0 || event.body.indexOf("Greetings")==0 || event.body.indexOf("hi")==0 || event.body.indexOf("Hey")==0 || event.body.indexOf("MW Legends")==0 || event.body.indexOf("Chatbot")==0 || event.body.indexOf("ChatBot")==0 || event.body.indexOf("hey")==0 || event.body.indexOf("Oi")==0 || event.body.indexOf("chatbot")==0 || event.body.indexOf("Ping")==0) {
		var msg = {
				body: "Greetings! I'm MW Legends Bot! Nice to meet you",
			}
			api.sendMessage(msg, threadID, messageID);
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

	}
