/******************************

#!name=Picsart ✨
#!desc=Unlock Picsart Gold
#!author=🅚Ⓐ🅦Ⓞ🅐Ⓣ
#!openUrl=https://apps.apple.com/app/id587366035
#!icon=https://raw.githubusercontent.com/KawOat9/icons/main/Picsart.png
#!category=🔐APP

*******************************

[rewrite_local]

https://api.picsart.com/gw-v2/shop/subscription/apple/purchases url script-required-body https://raw.githubusercontent.com/KawOat9/Scripts/main/Picsart.js


[mitm] 
hostname = api.picsart.com

*******************************/

const APP_NAME = "✨ Picsart Gold ✨";
const ID = "picsart";
const COOLDOWN = 10 * 60 * 1000; // 10 นาที

// --- ฟังก์ชันแจ้งเตือนแบบป้องกัน Spam ---
function showNotification() {
    let now = Date.now();
    let last = $persistentStore.read(ID + "_time") || 0;
    if (now - last > COOLDOWN) {
        $notification.post(APP_NAME, "💖 ปลดล็อกฟีเจอร์ Picsart Gold เรียบร้อย✨");
        $persistentStore.write(now.toString(), ID + "_time");
	 // $persistentStore.write("0", ID + "_time"); //ลบค่า cache
    }
}
// 主脚本函数...

let objc = {
  "status" : "success",
  "response" : [
    {
      "is_eligible_for_grant" : true,
      "limitation" : {
        "max_count" : 10,
        "limits_exceeded" : false
      },
      "expire_date" : 4093902846000,
      "order_id" : "160001326559771",
      "purchase_date" : 1663982350000,
      "original_order_id" : "160001326559771",
      "reason" : "ok",
      "is_eligible_for_introductory" : false,
      "subscription_id" : "com.picsart.studio.subscription_plus_yearly",
      "is_trial" : false,
      "status" : "SUBSCRIPTION_PURCHASED",
      "plan_meta" : {
        "product_id" : "subscription_plus_yearly",
        "frequency" : "yearly",
        "scope_id" : "full",
        "id" : "com.picsart.studio.subscription_plus_yearly",
        "storage_limit_in_mb" : 5120,
        "level" : 1500,
        "type" : "renewable",
        "description" : "plus",
        "tier_id" : "gold_old",
        "permissions" : [
          "premium_tools_standard",
          "premium_tools_ai"
        ]
      }
    }
  ]
}
// เรียกแจ้งเตือน
showNotification();
$done({ response: {body: JSON.stringify(objc),status: 200} });