module.exports.config = {
  name: "blackpink", // older version
  version: "1.0.0",
  hasPermssion: 0,
  credits: "OMOR TE",
  description: "Get Blackpink Photo",
  commandCategory: "Blackpink",
  usages: "blackpink",
  cooldowns: 3,
  dependencies: {
    "request":"",
    "fs-extra":"",
    "axios":""
  }
};

module.exports.run = async({api,event,args,client,Users,Threads,__GLOBAL,Currencies}) => {
const axios = global.nodemodule["axios"];
const request = global.nodemodule["request"];
const fs = global.nodemodule["fs-extra"];
  var link = [
"https://i.imgur.com/O1O8p75.jpg",
"https://i.imgur.com/c7wX46N.jpg",
"https://i.imgur.com/kCXO20v.jpg",
"https://i.imgur.com/LY9CBLZ.jpg",
"https://i.imgur.com/21C7m3c.jpg",
"https://i.imgur.com/rAVJRct.jpg",
"https://i.imgur.com/c02iRit.jpg",
"https://i.imgur.com/TvoAnua.jpg",
"https://i.imgur.com/Gpx5pHf.jpg",
"https://i.imgur.com/zg9kvzm.jpg",
"https://i.imgur.com/WpcezHL.jpg",
"https://i.imgur.com/qB6zkC4.jpg",
"https://i.imgur.com/9rcYQEQ.jpg",
"https://i.imgur.com/FhJs9ZZ.jpg",
"https://i.imgur.com/mrdy5Xj.jpg",
"https://i.imgur.com/wjma3bT.jpg",
"https://i.imgur.com/HSA2UXG.jpg",
"https://i.imgur.com/einh0qH.jpg",
"https://i.imgur.com/DosFGp6.jpg",
"https://i.imgur.com/NsixZ4K.jpg",
"https://i.imgur.com/Rfag5Rf.jpg",
"https://i.imgur.com/Ll4qHkX.jpg",
"https://i.imgur.com/Aafs9t4.jpg",
"https://i.imgur.com/l2bitnH.jpg",
"https://i.imgur.com/yKJ71iT.jpg",
"https://i.imgur.com/reIWRFK.jpg",
"https://i.imgur.com/M7mmOzW.jpg",
"https://i.imgur.com/AhdjhUE.jpg",
"https://i.imgur.com/HelWaOM.jpg",
"https://i.imgur.com/e7SyGlP.jpg",
"https://i.imgur.com/RwOsmOz.jpg",
"https://i.imgur.com/UoKm0jY.jpg",
"https://i.imgur.com/JMQFJ6G.jpg",
"https://i.imgur.com/GyzksZw.jpg",
"https://i.imgur.com/F1n62Ez.jpg",
"https://i.imgur.com/JYvVhIe.jpg",
"https://i.imgur.com/ur6tUm0.jpg",
"https://i.imgur.com/XhTWDVi.jpg",
"https://i.imgur.com/NvASHOq.jpg",
"https://i.imgur.com/YbqZtZt.jpg",
"https://i.imgur.com/6rnwnwF.jpg",
"https://i.imgur.com/MJ9A4uM.jpg",
"https://i.imgur.com/dFTv62t.jpg",
"https://i.imgur.com/zyK3rpz.jpg",
"https://i.imgur.com/PyyXxIL.jpg",
"https://i.imgur.com/uz1khCy.jpg",
"https://i.imgur.com/dm9iK8w.jpg",
"https://i.imgur.com/JvKifua.jpg",
"https://i.imgur.com/CsByMZ1.jpg",
"https://i.imgur.com/pE9Oua1.jpg",
"https://i.imgur.com/Rto3nAw.jpg",
"https://i.imgur.com/7mt9YnY.jpg",
"https://i.imgur.com/pGbTR9B.jpg",
"https://i.imgur.com/0MUdRd8.jpg",
"https://i.imgur.com/FrFF4FK.jpg",
"https://i.imgur.com/ZXSWvJm.jpg",
"https://i.imgur.com/QsCzbI7.jpg",
"https://i.imgur.com/rSySknj.jpg",
"https://i.imgur.com/DvEWRgb.jpg",
  ];
	 var callback = () => api.sendMessage({body:`Blaclpink group photos \nThe image is available: ${link.length}`,attachment: fs.createReadStream(__dirname + "/cache/5.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/5.jpg"));	
      return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/5.jpg")).on("close",() => callback());
   };
