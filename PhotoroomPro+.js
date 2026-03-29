/*
#!name=Photoroom ✨
#!desc=Unlock Photoroom App (Pro + Business + Ultra)
#!category=🔐APP
#!author=🅚Ⓐ🅦Ⓞ🅐Ⓣ
#!icon=https://raw.githubusercontent.com/KawOat9/icons/main/Photoroom.png
𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹
[rewrite_local]
^https:\/\/api\.revenuecat\.com\/.+\/(receipts$|subscribers\/.+$) url script-response-body https://raw.githubusercontent.com/KawOat9/Scripts/main/PhotoroomPro+.js
^https:\/\/api\.(revenuecat|rc-backup)\.com\/.+\/(receipts$|subscribers\/?(.*?)*$) url script-request-header https://raw.githubusercontent.com/KawOat9/Scripts/main/PhotoroomPro+.js

[mitm] 
hostname = api.revenuecat.com
*/
// -------- แจ้งเตือน --------
const cooldownMs = 10 * 60 * 1000;
const notifyKey = "PhotoroomPro_notify_key";

const nowTs = Date.now();
let lastNotifyTime = $persistentStore.read(notifyKey)
  ? parseInt($persistentStore.read(notifyKey))
  : 0;

if (nowTs - lastNotifyTime > cooldownMs) {
  $notification.post("✨ Photoroom ✨", "✅ ปลดล็อค Ultra!", "หมดอายุ: 2099");
  $persistentStore.write(nowTs.toString(), notifyKey);
}

// -------- Main --------
const now = new Date().toISOString();
const expire = "2099-12-31T23:59:59Z";

const obj = {
  request_date: now,
  request_date_ms: nowTs,

  subscriber: {
    first_seen: now,
    last_seen: now,
    original_application_version: "1",
    original_purchase_date: now,
    original_app_user_id: "user_" + nowTs,

    non_subscriptions: {},
    other_purchases: {},

    subscriptions: {
      "com.photoroom.app.ultra1": {
        purchase_date: now,
        original_purchase_date: now,
        expires_date: expire,
        ownership_type: "PURCHASED",
        store: "app_store"
      }
    },

    entitlements: {
      ultra: {
        product_identifier: "com.photoroom.app.ultra1",
        purchase_date: now,
        original_purchase_date: now,
        expires_date: expire,
        ownership_type: "PURCHASED",
        store: "app_store"
      }
    }
  }
};

$done({ body: JSON.stringify(obj) });