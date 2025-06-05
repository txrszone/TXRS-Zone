const fs = require("fs-extra");
const request = require("request");

module.exports.config = {
  name: "mwmeme",
  version: "10.5.0",
  hasPermssion: 0,
  credits: "OMOR TE",
  description: "Get Random Modern Warships Meme (Image/Video)",
  commandCategory: "ModernWarships",
  usages: "/mwmeme",
  cooldowns: 5
};

module.exports.run = async ({ api, event }) => {
  const imageLinks = [
    "https://i.postimg.cc/MKVXGB2K/FB-IMG-1748861685846.jpg",
   "https://i.postimg.cc/mDgTNc5M/FB-IMG-1748861673272.jpg",
  "https://i.postimg.cc/wvwTS5m0/FB-IMG-1748861651145.jpg",
 "https://i.postimg.cc/rsgWZtVk/FB-IMG-1748861589902.jpg",
"https://i.postimg.cc/6ppzKtgc/FB-IMG-1748855776596.jpg",
"https://i.postimg.cc/L5M5k4jM/FB-IMG-1748861829020.jpg",
"https://i.postimg.cc/76JJMQcS/FB-IMG-1748861812682.jpg",
"https://i.postimg.cc/T3xj2GsF/FB-IMG-1748861744514.jpg",
"https://i.postimg.cc/G3MxjZHs/FB-IMG-1748861725207.jpg",
"https://i.postimg.cc/DfQtyfp3/FB-IMG-1748861717322.jpg",
"https://i.postimg.cc/rsxDr0bT/IMG-20250603-121416.jpg",
"https://i.postimg.cc/SN1X34hc/IMG-20250603-005215.jpg",
"https://i.postimg.cc/4dpVRS5s/FB-IMG-1748861884278.jpg",
"https://i.postimg.cc/Hnf29yBk/FB-IMG-1748861865724.jpg",
"https://i.postimg.cc/6Q6kSH84/FB-IMG-1748855701752.jpg",
"https://i.postimg.cc/JzQwpwzW/FB-IMG-1748855720095.jpg",
"https://i.postimg.cc/pXn11wk6/FB-IMG-1748855730590.jpg",
"https://i.postimg.cc/PqHcDSWF/FB-IMG-1748855752755.jpg",
"https://i.postimg.cc/L4QrWBSn/FB-IMG-1748855776596.jpg",
"https://i.postimg.cc/GhJSCFwF/FB-IMG-1748855538807.jpg",
"https://i.postimg.cc/ZYNMfkwD/FB-IMG-1748855594151.jpg",
"https://i.postimg.cc/G2WSczmQ/FB-IMG-1748855628374.jpg",
"https://i.postimg.cc/R0bDYvr2/FB-IMG-1748855642088.jpg",
"https://i.postimg.cc/GmKNkkXL/FB-IMG-1748855691179.jpg",
"https://i.postimg.cc/kggwPLyC/FB-IMG-1748854791532.jpg",
"https://i.postimg.cc/jdXv9RPv/FB-IMG-1748854975662.jpg",
"https://i.postimg.cc/NGRd6603/FB-IMG-1748854983062.jpg",
"https://i.postimg.cc/fbF8K5mN/FB-IMG-1748855117998.jpg",
"https://i.postimg.cc/8CsyMxF4/FB-IMG-1748855132380.jpg",
"https://i.postimg.cc/yYb3W5Hs/FB-IMG-1748854764352.jpg",
"https://i.postimg.cc/J4nBr8Sp/FB-IMG-1748854769313.jpg",
"https://i.postimg.cc/YqqQvYLf/FB-IMG-1748854777766.jpg",
"https://i.postimg.cc/sfJpfwxg/FB-IMG-1748854781882.jpg",
"https://i.postimg.cc/Y08gXqZW/FB-IMG-1748854786320.jpg",
"https://i.postimg.cc/NMsjd7cd/FB-IMG-1748854160577.jpg",
"https://i.postimg.cc/BQktJKTv/FB-IMG-1748854233403.jpg",
"https://i.postimg.cc/BbwbL8RM/FB-IMG-1748854285199.jpg",
"https://i.postimg.cc/HnLjk0vr/FB-IMG-1748854686532.jpg",
"https://i.postimg.cc/5twX72F2/FB-IMG-1748854725373.jpg",
"https://i.postimg.cc/XqZ3PsDk/FB-IMG-1748854105530.jpg",
"https://i.postimg.cc/JnzRNrNg/FB-IMG-1748854113932.jpg",
"https://i.postimg.cc/xdR0NJzM/FB-IMG-1748854120098.jpg",
"https://i.postimg.cc/FKmrKg7h/FB-IMG-1748854130123.jpg",
"https://i.postimg.cc/zXbX2GsY/FB-IMG-1748854147170.jpg",
"https://i.postimg.cc/nL8k9MJF/FB-IMG-1748853904481.jpg",
"https://i.postimg.cc/0QDhKh33/FB-IMG-1748853979693.jpg",
"https://i.postimg.cc/fL1TM4dr/FB-IMG-1748854013776.jpg",
"https://i.postimg.cc/YSnCyLCk/FB-IMG-1748854061174.jpg",
"https://i.postimg.cc/L6Lh6sNB/FB-IMG-1748854084653.jpg",
"https://i.postimg.cc/Qdc7Pb2D/Screenshot-2024-05-30-21-39-36-899-com-Shooter-Modern-Warships.jpg",
"https://i.postimg.cc/rszWPLkZ/Image-Download-02-06-2025-02-43-31.jpg",
 "https://i.postimg.cc/fbjx3KCC/Image-Download-02-06-2025-02-43-47.jpg",
  "https://i.postimg.cc/dVCRFvTz/Image-Download-02-06-2025-02-43-53.jpg",
   "https://i.postimg.cc/vTS7YZhd/Image-Download-02-06-2025-02-44-07.jpg",
    "https://i.postimg.cc/prG8sjvN/Image-Download-02-06-2025-01-15-49.jpg",

    // ⬆️ Add more image URLs here
  ];

  const videoLinks = [
    "https://github.com/user-attachments/assets/a101c76d-8520-4302-b26b-496e8a79ec05",
   "https://github.com/user-attachments/assets/1a8c4037-e6f9-4cd8-8ce4-5916208be1b0",
  "https://github.com/user-attachments/assets/81896e1f-13e9-47b9-8c6e-59bcec476946",
 "https://github.com/user-attachments/assets/874a200e-51c6-4ab2-bc8f-ad915acbff45",
"https://github.com/user-attachments/assets/9779ed56-8c50-4fa5-be4a-b659a2363ca6",
"https://github.com/user-attachments/assets/29701060-5515-4715-9fb3-6ee9b8261823",
"https://github.com/user-attachments/assets/7a1d6c1e-9cb3-4822-9492-8cea168f9c8d",
"https://github.com/user-attachments/assets/369ab040-09a9-44eb-9172-b21a31efc890",
"https://github.com/user-attachments/assets/97020c1b-8674-497b-a5df-0c4ae6e5a1bf",
"https://github.com/user-attachments/assets/c4c45bf2-710d-4fd7-8eb6-7297cc7a1e2e",
"https://github.com/user-attachments/assets/736610cd-b261-4ed2-bbdb-fc9ecb76ab30",
"https://github.com/user-attachments/assets/c8f6001b-9a2a-4942-b87a-d8138620935c",
"https://github.com/user-attachments/assets/9586d152-f56b-42f0-b2f4-5b8711116ee6",
"https://github.com/user-attachments/assets/d6b6dc6f-7e4d-47f2-8fff-d72bd1d9df75",
"https://github.com/user-attachments/assets/bbd83cee-aaae-4c1b-adb8-93050c3dd502",
"https://github.com/user-attachments/assets/711190cd-1e96-4866-83e9-ba72dd5ef043",
"https://github.com/user-attachments/assets/552a6cd9-1366-45c6-8111-012d272bed99",
"https://github.com/user-attachments/assets/75032dfa-342a-4b7d-a8a9-b3da43fccb14",
"https://github.com/user-attachments/assets/8236c6b7-863c-4810-9df0-56a8e3480c4b",
"https://github.com/user-attachments/assets/5b0dd35c-a7fe-40f5-bdfc-aca37ea74a55",
"https://github.com/user-attachments/assets/28a4f2f8-6b73-4017-8043-422211b645ec",
"https://github.com/user-attachments/assets/26966aad-5c93-48e8-a7e4-b3f7d81eab8b",
"https://github.com/user-attachments/assets/9520ba8e-42c4-4c22-a6d1-0a7c13e49fc5",
"https://github.com/user-attachments/assets/b11ad109-957a-46da-9311-e9dcaf99d70c",
"https://github.com/user-attachments/assets/bb63691e-2bf0-43e9-b22b-ee53eba8b02e",
"https://github.com/user-attachments/assets/35c74e47-c4f4-4b27-893a-7634a3de97ec",
"https://github.com/user-attachments/assets/d3f7f94f-089f-44a5-99f8-091e4df8a7c7",
"https://github.com/user-attachments/assets/190ed861-88c1-41f4-a396-07ad0bf07cad",
"https://github.com/user-attachments/assets/de90b11c-7548-434e-8f47-9fa4746ba876",
"https://github.com/user-attachments/assets/d9e3f0c3-0fc6-4a33-b7c9-fcd6bf4a3d73",
"https://github.com/user-attachments/assets/2d0ef4c7-dcb0-4a57-b983-23a28cde92e1",
"https://github.com/user-attachments/assets/f52e885d-c0fd-422e-95e7-4aab6c7d852b",
"https://github.com/user-attachments/assets/97011ec5-9e8a-4579-a8da-e81c20a7a1bf",
"https://github.com/user-attachments/assets/65550fc1-2f43-4943-b07d-6f17d89764ed",
 "https://github.com/user-attachments/assets/1ca1cd69-c3fd-4bb3-9aaf-d2ecc02d7cb5",
  "https://github.com/user-attachments/assets/f3285fc7-3631-49b5-97dc-3c1a793c6c43",
   "https://github.com/user-attachments/assets/35e463ae-1b7a-4b2e-b4f9-671d1d366002",
    "https://github.com/user-attachments/assets/5603e538-8995-411e-99dc-01f1da47cf5e",
    
    // ⬆️ Add more video URLs here (Must be direct MP4 links)
  ];

  const totalMemes = imageLinks.length + videoLinks.length;

  // Send confirmation message
  api.sendMessage(`📦 Random Modern Warships Meme is loading...\n🖼️♻️ Total memes in stock: ${totalMemes}`, event.threadID, async (err, info) => {
    if (err) return console.error(err);

    // Unsend confirmation message after 45 seconds = 45000 milliseconds
    setTimeout(() => {
      api.unsendMessage(info.messageID);
    }, 45000);

    // Randomly choose image or video section
    const isVideo = Math.random() < 0.5 && videoLinks.length > 0;
    const chosenLinks = isVideo ? videoLinks : imageLinks;
    const chosenUrl = chosenLinks[Math.floor(Math.random() * chosenLinks.length)];
    const ext = isVideo ? ".mp4" : ".jpg";
    const filePath = `${__dirname}/cache/mwmeme${ext}`;
    fs.ensureDirSync(__dirname + "/cache");

    // Download and send meme
    request(encodeURI(chosenUrl))
      .pipe(fs.createWriteStream(filePath))
      .on("close", () => {
        api.sendMessage({
          attachment: fs.createReadStream(filePath)
        }, event.threadID, () => fs.unlinkSync(filePath));
      })
      .on("error", (err) => {
        console.error("Download error:", err);
        api.sendMessage("⚠️ Failed to fetch meme.", event.threadID);
      });
  });
};
      
