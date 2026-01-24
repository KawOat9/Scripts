/*
 * Baidu Netdisk SVIP Crack (Network Layer)
 * Adapted for Shadowrocket
 * Updated: Fix for "TH" Region Non-VIP Response
 */

const url = $request.url;
const body = $response.body;

if (!body) {
    $done({});
}

let obj = JSON.parse(body);

// 1. API: /api/loginStatus
if (url.indexOf('/api/loginStatus') !== -1 && obj.login_info) {
    obj.login_info.vip_type = 2;
    obj.login_info.vip_identity = 2;
    obj.login_info.vip_level = 10;
    obj.login_info.vip_point = 99999;
}

// 2. API: /api/user/info (Standard Info)
if (url.indexOf('/api/user/info') !== -1 && obj.user_info) {
    obj.user_info.vip_type = 2;
    obj.user_info.is_vip = 1;
    obj.user_info.is_svip = 1;
    obj.user_info.vip_level = 10;
    obj.user_info.is_plus_buy = 1;
    obj.user_info.is_evip = 1;
}

// 3. API: /membership/user (Main Membership Data)
if (url.indexOf('/membership/user') !== -1) {
    obj.user_tag = "{\"has_buy_record\":1,\"has_buy_vip_svip_record\":1,\"last_buy_record_creat_time\":1688356106,\"is_vip\":1,\"is_svip\":1,\"last_vip_type\":1,\"last_vip_svip_end_time\":4102415999,\"is_svip_sign\":0,\"notice_user_type\":1,\"notice_user_status\":0,\"is_first_act\":0,\"is_first_charge\":0}";
    
    obj.current_product = {
        "product_id": "12187135090581539740",
        "detail_cluster": "svip",
        "cluster": "vip",
        "product_type": "vip2_1y_auto"
    };

    obj.current_product_v2 = obj.current_product;
    obj.previous_product = [];
    obj.current_mvip_v2 = {};
    
    const fakeProduct = {
        "product_id": "12187135090581539740",
        "start_time": 1688356106,
        "end_time": 4102415999,
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

    obj.reminder = {
        "svip": { "leftseconds": 9999999999, "nextState": "normal" },
        "reminderSVip": { "leftseconds": 9999999999, "nextState": "normal" }
    };
    
    obj.level_info = {
        "current_value": 99999,
        "current_level": 10,
        "history_value": 99999,
        "history_level": 10,
        "v10_id": "888888",
        "last_manual_collection_time": 0
    };
}

// 4. API: /api/quota (Storage)
if (url.indexOf('/api/quota') !== -1) {
   obj.expire = false;
   if(obj.quota) obj.quota = 32985348833280; 
   if(obj.total) obj.total = 32985348833280;
}

// 5. API: Handle Generic/Regional Member Info (ส่วนที่เพิ่มใหม่สำหรับแก้ไขปัญหาของคุณ)
// ดักจับ JSON ที่มีโครงสร้าง data.member_info (เหมือนที่คุณส่งมา)
if (obj.data && obj.data.member_info) {
    // แก้ไขข้อมูลสมาชิกหลัก
    obj.data.member_info.is_vip = 1;
    obj.data.member_info.vip_level = 10;
    obj.data.member_info.is_vip_level = 10;
    obj.data.member_info.vip_end_time = 4102415999;
    obj.data.member_info.vip_left_time = 99999999;
    obj.data.member_info.vip_end_time_without_grace = 4102415999;
    
    // แก้ไขข้อมูล Volume (พื้นที่)
    if (obj.data.volume_member_info) {
        obj.data.volume_member_info.is_vip = 1;
        obj.data.volume_member_info.volume_end_time = 4102415999;
    }
    
    // ปรับ Country Info (ถ้าจำเป็น เพื่อหลอกเรื่อง Speed Limit)
    if (obj.data.cur_country) {
        obj.data.cur_country.support_vip = 1;
        obj.data.cur_country.upload_speed_ratio = 1; // ลองปลดล็อคความเร็ว
    }
}

$done({ body: JSON.stringify(obj) });
