/******************************

#!name=Picsart Pro ✨
#!desc=Unlock Picsart Pro
#!author=🅚Ⓐ🅦Ⓞ🅐Ⓣ
#!openUrl=https://apps.apple.com/app/id587366035
#!icon=https://raw.githubusercontent.com/KawOat9/icons/main/Picsart.png
#!category=🔐APP

*******************************

[rewrite_local]

https://api.picsart.com/gw-v2/shop/subscription/apple/purchases url script-required-body https://raw.githubusercontent.com/KawOat9/Scripts/main/PicsartPro.js


[mitm] 
hostname = api.picsart.com

*******************************/

const APP_NAME = "✨ Picsart Pro ✨";
const ID = "picsart";
const COOLDOWN = 10 * 60 * 1000; // 10 นาที

// --- ฟังก์ชันแจ้งเตือนแบบป้องกัน Spam ---
function showNotification() {
    let now = Date.now();
    let last = $persistentStore.read(ID + "_time") || 0;
    if (now - last > COOLDOWN) {
        $notification.post(APP_NAME, "💖 ปลดล็อกฟีเจอร์ Picsart Pro เรียบร้อย✨");
        $persistentStore.write(now.toString(), ID + "_time");
	 // $persistentStore.write("0", ID + "_time"); //ลบค่า cache
    }
}
// 主脚本函数...

let objc = {
  "status": "success",
    "response": [
        {
            "status": "SUBSCRIPTION_RENEWED",
            "is_trial": false,
            "order_id": "2000001108782321",
            "expire_date": 32662137600000,
            "purchase_date": 1704758400000,
            "subscription_id": "com.picsart.studio.subscription_pro_3_yearly",
            "original_order_id": "2000000756285050",
            "plan_meta": {
                "permissions": [
                    "premium_tools_standard",
                    "premium_tools_ai"
                ],
                "auto_renew_product_id": "com.picsart.studio.subscription_mac_tier1_pro_yearly",
                "level": 2000,
                "storage_limit_in_mb": 102400,
                "id": "com.picsart.studio.subscription_pro_3_yearly",
                "frequency": "yearly",
                "type": "renewable",
                "scope_id": "full",
                "product_id": "com.picsart.studio.subscription_pro_3_yearly",
                "tier_id": "pro"
            },
            "limitation": {
                "max_count": 10,
                "limits_exceeded": false
            },
            "is_eligible_for_introductory": false,
            "reason": "ok"
        }
    ]
}
// เรียกแจ้งเตือน
showNotification();
$done({ response: {body: JSON.stringify(objc),status: 200} });