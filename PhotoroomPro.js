/*
#!name=Photoroom ✨
#!desc=Unlock Photoroom App (Pro + Business + Ultra)
#!category=🔐APP
#!author=🅚Ⓐ🅦Ⓞ🅐Ⓣ
#!icon=https://raw.githubusercontent.com/KawOat9/icons/main/Photoroom.png
𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹
[rewrite_local]
^https:\/\/api\.revenuecat\.com\/.+\/(receipts$|subscribers\/.+$) url script-response-body https://raw.githubusercontent.com/KawOat9/Scripts/main/PhotoroomPro.js
^https:\/\/api\.(revenuecat|rc-backup)\.com\/.+\/(receipts$|subscribers\/?(.*?)*$) url script-request-header https://raw.githubusercontent.com/KawOat9/Scripts/main/PhotoroomPro.js

[mitm] 
hostname = api.revenuecat.com
*/
// -------- แจ้งเตือน --------
const cooldownMs = 10 * 60 * 1000;
const notifyKey = "PhotoroomPro_notify_key";
const now = Date.now();
let lastNotifyTime = $persistentStore.read(notifyKey) ? parseInt($persistentStore.read(notifyKey)) : 0;
if (now - lastNotifyTime > cooldownMs) {
    $notification.post("✨ ᯓ🏃🏻‍♀️‍➡️Photoroom ✨", "✅ ปลดล็อคสำเร็จ!", "หมดอายุ: ⓿❾-⓿❾-❷⓿❾❾");
    $persistentStore.write(now.toString(), notifyKey);
}
/*
 * Unlock Photoroom App (Pro + Business)
 * โดยการยัดไส้ JSON Response
 */

var body = JSON.parse($response.body);

// ข้อมูลปลอมที่เราเตรียมไว้ (จากที่คุณส่งมา)
var obj = {
  "request_date_ms": 1704070861000,
  "request_date": "2024-01-01T01:01:01Z",
  "subscriber": {
    "last_seen": "2024-01-01T01:01:01Z",
    "original_application_version": "9692",
    "first_seen": "2024-01-01T01:01:01Z",
    "non_subscriptions": {},
    "subscriptions": {
      "com.background.pro.yearly": {
        "expires_date": "9692-01-01T01:01:01Z",
        "original_purchase_date": "2024-01-01T01:01:01Z",
        "purchase_date": "2024-01-01T01:01:01Z"
      },
      "com.background.business.yearly": {
        "expires_date": "9692-01-01T01:01:01Z",
        "original_purchase_date": "2024-01-01T01:01:01Z",
        "purchase_date": "2024-01-01T01:01:01Z"
      },
      "com.background.ultra.yearly": {
        "expires_date": "9692-01-01T01:01:01Z",
        "original_purchase_date": "2024-01-01T01:01:01Z",
        "purchase_date": "2024-01-01T01:01:01Z"
      }
    },
    "entitlements": {
      "pro": {
        "purchase_date": "2024-01-01T01:01:01Z",
        "product_identifier": "com.background.pro.yearly",
        "original_purchase_date": "2024-01-01T01:01:01Z",
        "expires_date": "9692-01-01T01:01:01Z"
      },
      "business": {
        "purchase_date": "2024-01-01T01:01:01Z",
        "product_identifier": "com.background.business.yearly",
        "original_purchase_date": "2024-01-01T01:01:01Z",
        "expires_date": "9692-01-01T01:01:01Z"
      },
      "ultra": {
        "purchase_date": "2024-01-01T01:01:01Z",
        "product_identifier": "com.background.ultra.yearly",
        "original_purchase_date": "2024-01-01T01:01:01Z",
        "expires_date": "9692-01-01T01:01:01Z"
      }
    },
    "original_purchase_date": "2024-01-01T01:01:01Z",
    "original_app_user_id": "FakeID_By_User",
    "other_purchases": {}
  }
};

// ส่งค่ากลับไปแทนที่ของเดิม
$done({body: JSON.stringify(obj)});