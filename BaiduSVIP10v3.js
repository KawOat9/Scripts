/*
 * Baidu Netdisk SVIP Crack (Network Layer)
 * Adapted for Shadowrocket
 * Covers: Login Status, User Info, Membership Info
 * Fix: "You are not SVIP" text removal
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
    // --- แก้ไข User Tag: บังคับ vip=1 และปิดสถานะแจ้งเตือน ---
    // notice_user_type: 1 = Active
    // notice_user_status: 0 = Normal (No warning)
    obj.user_tag = "{\"has_buy_record\":1,\"has_buy_vip_svip_record\":1,\"last_buy_record_creat_time\":1688356106,\"is_vip\":1,\"is_svip\":1,\"last_vip_type\":1,\"last_vip_svip_end_time\":4102415999,\"is_svip_sign\":0,\"notice_user_type\":1,\"notice_user_status\":0,\"is_first_act\":0,\"is_first_charge\":0}";
    
    // --- ตั้งค่าสินค้าปัจจุบัน ---
    obj.current_product = {
        "product_id": "12187135090581539740",
        "detail_cluster": "svip",
        "cluster": "vip",
        "product_type": "vip2_1y_auto"
    };

    obj.current_product_v2 = obj.current_product;
    
    // เคลียร์ข้อมูลเก่า
    obj.previous_product = [];
    obj.current_mvip_v2 = {};
    
    // --- Fake Product Info ---
    const fakeProduct = {
        "product_id": "12187135090581539740",
        "start_time": 1688356106,
        "end_time": 4102415999, // ปี 2099
        "buy_time": 1688356106,
        "cluster": "vip",
        "detail_cluster": "svip",
        "auto_upgrade_to_svip": 0,
        "product_name": "svip2_nd",
        "status": 0,
        "function_num": 0,
        "buy_description": "SVIP Year",
        "product_description": "SVIP",
        "cur_svip_type": "year"
    };
    obj.product_infos = [fakeProduct];

    // --- Fake Reminder ---
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
    
    // --- Fake Level Info ---
    obj.level_info = {
        "current_value": 99999,
        "current_level": 10,
        "history_value": 99999,
        "history_level": 10,
        "v10_id": "888888",
        "last_manual_collection_time": 0
    };
}

// 4. API: /api/quota (30TB)
if (url.indexOf('/api/quota') !== -1) {
   obj.expire = false;
   if(obj.quota) obj.quota = 32985348833280; 
   if(obj.total) obj.total = 32985348833280;
}

$done({ body: JSON.stringify(obj) });
