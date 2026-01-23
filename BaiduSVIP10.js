/*
 * Baidu Netdisk SVIP Crack (Network Layer)
 * Adapted for Shadowrocket
 * Covers: Login Status, User Info, Membership Info
 */

const url = $request.url;
const body = $response.body;

if (!body) {
    $done({});
}

let obj = JSON.parse(body);

// 1. API: /api/loginStatus
if (url.indexOf('/api/loginStatus') !== -1 && obj.login_info) {
    obj.login_info.vip_type = 2; // SVIP
    obj.login_info.vip_identity = 2;
    obj.login_info.vip_level = 10;
    obj.login_info.vip_point = 99999;
}

// 2. API: /api/user/info
if (url.indexOf('/api/user/info') !== -1 && obj.user_info) {
    obj.user_info.vip_type = 2;
    obj.user_info.is_vip = 1;
    obj.user_info.is_svip = 1;
    obj.user_info.vip_level = 10;
    obj.user_info.is_plus_buy = 1;
    obj.user_info.is_evip = 1;
}

// 3. API: /membership/user
if (url.indexOf('/membership/user') !== -1) {
    // Fake Reminder
    obj.reminder = {
        "svip": {
            "leftseconds": 9999999999,
            "nextState": "normal"
        },
        "reminderSVip": {
            "leftseconds": 9999999999,
            "nextState": "normal"
        }
    };
    
    // Fake Level Info
    obj.level_info = {
        "current_value": 99999,
        "current_level": 10,
        "history_value": 99999,
        "history_level": 10,
        "v10_id": "999999",
        "last_manual_collection_time": 0
    };

    // Fake Product Infos (Current Subscription)
    const fakeProduct = {
        "product_id": "5310897792128633390",
        "start_time": 1600000000,
        "end_time": 4092599349, // Year 2099
        "buy_time": 1600000000,
        "cluster": "vip",
        "detail_cluster": "svip",
        "auto_upgrade_to_svip": 0,
        "product_name": "svip2_nd",
        "status": 0,
        "function_num": 0,
        "buy_description": "",
        "product_description": "",
        "cur_svip_type": "year"
    };

    obj.product_infos = [fakeProduct];
    
    obj.current_product = {
        "cluster": "vip",
        "detail_cluster": "svip",
        "product_type": "vip2_1y_auto",
        "product_id": "5310897792128633390"
    };
    
    obj.current_product_v2 = obj.current_product;
}

// 4. API: /api/quota (Optional: Fake Storage Space if needed)
if (url.indexOf('/api/quota') !== -1) {
   obj.expire = false;
   if(obj.quota) obj.quota = 32985348833280; // 30TB
   if(obj.total) obj.total = 32985348833280;
}

$done({ body: JSON.stringify(obj) });
