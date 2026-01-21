/*
#!name=BaiduCloud SVIP ✨
#!desc=Baidu Netdisk SVIP (ปรับปรุงเวลาปี 2099)
#!author=🅚Ⓐ🅦Ⓞ🅐Ⓣ
#!category=🔐APP
#!openUrl=https://apps.apple.com/app/id547166701
#!icon=https://raw.githubusercontent.com/KawOat9/icons/main/baiducloud.png
𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹
[rewrite_local]
^https?:\/\/pan\.baidu\.com\/rest\/\d\.\d\/membership\/user url script-response-body https://raw.githubusercontent.com/KawOat9/Scripts/main/BaiduSVIP.js

[mitm]
hostname = pan.baidu.com

*/

const APP_NAME = "✨ Baidu Netdisk SVIP ✨";
const ID = "baidu_svip";
const COOLDOWN = 10 * 60 * 1000; // 10 นาที

// --- ฟังก์ชันแจ้งเตือนแบบป้องกัน Spam ---
function showNotification() {
    let now = Date.now();
    let last = $persistentStore.read(ID + "_time") || 0;
    if (now - last > COOLDOWN) {
        $notification.post(APP_NAME, "💖 ปลดล็อกฟีเจอร์ SVIP เรียบร้อย", "ยินดีต้อนรับท่านสมาชิก SVIP ✨");
        $persistentStore.write(now.toString(), ID + "_time");
    }
}

// --- ฟังก์ชันหลักในการแก้ไขข้อมูล (Recursive Patch) ---
if ($response.body) {
	showNotification(); // เรียกใช้งานการแจ้งเตือนที่นี่
    let obj = JSON.parse($response.body);
    obj = {
  "product_infos": [
    {
      "product_id": "5210897752128663390",
      "status": "0",
      "buy_time": "1384234467",
      "cluster": "offlinedl",
      "end_time": 4102415999,
      "start_time": 1384234467,
      "function_num": 2,
      "buy_description": "离线下载套餐(永久)",
      "product_description": "离线下载套餐(永久)",
      "detail_cluster": "offlinedl",
      "product_name": "offlinedl_permanent"
    },
    {
      "cur_svip_type": "month",
      "product_name": "svip2_nd",
      "product_description": "",
      "buy_description": "",
      "function_num": 0,
      "start_time": 1688356160,
      "buy_time": 0,
      "product_id": "",
      "auto_upgrade_to_svip": 0,
      "end_time": 4102415999,
      "cluster": "vip",
      "detail_cluster": "svip",
      "status": 0
    },
    {
      "product_name": "contentvip_nd",
      "product_description": "",
      "buy_description": "",
      "function_num": 0,
      "start_time": 1688356160,
      "buy_time": 0,
      "product_id": "",
      "auto_upgrade_to_svip": 0,
      "end_time": 4102415999,
      "cluster": "contentvip",
      "detail_cluster": "contentvip",
      "status": 0
    }
  ],
  "center_skip_config": {
    "action_type": 0,
    "action_url": "https://pan.baidu.com/buy/center?tag=8"
  },
  "last_privilege_card_v2": {},
  "current_privilege_card": [],
  "current_product_v2": {
    "product_id": "12187135090581539740",
    "detail_cluster": "svip",
    "cluster": "vip",
    "product_type": "vip2_1y_auto"
  },
  "request_id": 269895149694452300,
  "current_privilege_card_v2": {},
  "up_product_infos": [],
  "last_privilege_card": [],
  "level_info": {
    "history_value": 3470,
    "last_manual_collection_time": 0,
    "current_level": 1,
    "current_value": 970,
    "history_level": 3,
    "v10_id": ""
  },
  "user_tag": "{\\\"has_buy_record\\\":1,\\\"has_buy_vip_svip_record\\\":1,\\\"last_buy_record_creat_time\\\":1688356106,\\\"is_vip\\\":0,\\\"is_svip\\\":1,\\\"last_vip_type\\\":1,\\\"last_vip_svip_end_time\\\":4102415999,\\\"is_svip_sign\\\":0,\\\"notice_user_type\\\":2,\\\"notice_user_status\\\":3,\\\"is_first_act\\\":0,\\\"is_first_charge\\\":0}",
  "currenttime": 1690687707,
  "previous_product": [],
  "current_mvip_v2": {},
  "current_product": {
    "product_id": "12187135090581539740",
    "detail_cluster": "svip",
    "cluster": "vip",
    "product_type": "vip2_1y_auto"
  },
  "reminder": {
    "reminderWithContent": {
      "title": "已拥有超级会员",
      "notice": "5T大空间、极速下载等特权已拥有~"
    },
    "advertiseContent": {
      "url": "https://yun.baidu.com/buy/center?tag=8&from=reminderpush1",
      "title": "您的超级会员将于2099-12-31到期",
      "notice": "5T大空间、极速下载等特权已拥有~"
    },
    "svip": {
      "leftseconds": 390692,
      "nextState": "normal"
    }
  },
  "current_mvip": [],
  "previous_product_v2": {}
};
    $done({ body: JSON.stringify(obj) });
} else {
    $done({});
}

/*
//1
**************************
百度网盘 解锁在线视频倍率/清晰度

***************************
QuantumultX:

[rewrite_local]
https:\/\/pan\.baidu\.com\/rest\/\d\.\d\/membership\/user url script-response-body https://raw.githubusercontent.com/NobyDa/Script/master/Surge/JS/BaiduCloud.js

[mitm]
hostname = pan.baidu.com

***************************
Surge4 or Loon:

[Script]
http-response https:\/\/pan\.baidu\.com\/rest\/\d\.\d\/membership\/user requires-body=1,max-size=0,script-path=https://raw.githubusercontent.com/NobyDa/Script/master/Surge/JS/BaiduCloud.js

[MITM]
hostname = pan.baidu.com

**************************

if ($response.body) {
    $done({
        body: JSON.stringify({
            "product_infos": [{
                "product_id": "5310897792128633390",
                "start_time": 1417260485,
                "end_time": 2147483648,
                "buy_time": "1417260485",
                "cluster": "offlinedl",
                "detail_cluster": "offlinedl",
                "product_name": "gz_telecom_exp"
            }, {
                "product_name": "svip2_nd",
                "product_description": "超级会员",
                "function_num": 0,
                "start_time": 1553702399,
                "buy_description": "",
                "buy_time": 0,
                "product_id": "1",
                "auto_upgrade_to_svip": 0,
                "end_time": 1872502399,
                "cluster": "vip",
                "detail_cluster": "svip",
                "status": 0
            }],
            "currenttime": 1573473597,
            "reminder": {
                "reminderWithContent": [],
                "advertiseContent": []
            },
            "request_id": 7501873289383874371
        })
    });
} else {
    $done({});
}

//2
**************************
百度网盘 解锁在线视频倍率/清晰度
author:@Nobyda
***************************
QuantumultX:

[rewrite_local]
https:\/\/pan\.baidu\.com\/rest\/\d\.\d\/membership\/user url script-response-body https://raw.githubusercontent.com/chengkongyiban/shadowrocket/main/scripts/bdcloud.js

[mitm]
hostname = pan.baidu.com

***************************
Surge4 or Loon:

[Script]
http-response https:\/\/pan\.baidu\.com\/rest\/\d\.\d\/membership\/user requires-body=1,max-size=0,script-path=https://raw.githubusercontent.com/chengkongyiban/shadowrocket/main/scripts/bdcloud.js

[MITM]
hostname = pan.baidu.com

**************************
if ($response.body) {
    $done({
        body: JSON.stringify({
            "product_infos": [{
                "product_id": "5310897792128633390",
                "start_time": 2147483648,
                "end_time": 2877706811,
                "buy_time": "1417260485",
                "cluster": "offlinedl",
                "detail_cluster": "offlinedl",
                "product_name": "gz_telecom_exp"
            }, {
                "product_name": "svip2_nd",
                "product_description": "超级会员",
                "function_num": 0,
                "start_time": 1672502399,
                "buy_description": "",
                "buy_time": 0,
                "product_id": "1",
                "auto_upgrade_to_svip": 0,
                "end_time": 1791302400,
                "cluster": "vip",
                "detail_cluster": "svip",
                "status": 0
            }],
            "currenttime": 1672502399,
            "reminder": {
                "reminderWithContent": [],
                "advertiseContent": []
            },
            "request_id": 7501873289383874371
        })
    });
} else {
    $done({});
}
**************************/