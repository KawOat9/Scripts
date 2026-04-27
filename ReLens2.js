/*
#!name=ReLens ✨
#!desc=Relens Forever
#!category=🔐APP
#!author=🅚Ⓐ🅦Ⓞ🅐Ⓣ
#!icon=https://raw.githubusercontent.com/KawOat9/icons/main/ReLens.png
𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹
[rewrite_local]
^https:\/\/buy\.itunes\.apple\.com\/verifyReceipt url script-response-body https://raw.githubusercontent.com/KawOat9/Scripts/main/ReLens2.js

[mitm]
hostname = buy.itunes.apple.com

*/
//🔔 通知模块（含失败日志显示，不干扰原脚本）
(function() {
    const A = "✨🎟️ReLens✨";
    const M_OK = "หมดอายุ: 2099-09-09"; // ข้อความสำเร็จ
    const M_ERR = "❌ ปลดล็อคล้มเหลว"; // ข้อความผิดพลาด
    const EN = true; // แสดงผลเป็นภาษาอังกฤษ
    const CD = 10; // Cooldown time (10 นาที)
    const K = "n_" + A.replace(/[^\w]/g, "").toLowerCase() + "_t";
    const P = typeof $prefs !== "undefined";
    const S = typeof $persistentStore !== "undefined";

    // ฟังก์ชั่นอ่านค่า
    function r(k) {
        try {
            if (P) return $prefs.valueForKey(k);
            if (S) return $persistentStore.read(k);
        } catch (e) {}
        return null;
    }

    // ฟังก์ชั่นเขียนค่า
    function w(k, v) {
        try {
            if (P) return $prefs.setValueForKey(String(v), k);
            if (S) return $persistentStore.write(String(v), k);
        } catch (e) {}
    }

    // ฟังก์ชั่นตรวจสอบเวลาของ Cooldown
    function can() {
        let t = parseInt(r(K) || "0", 10) || 0;
        return CD === 0 || Date.now() - t > CD * 6e4;
    }

    // ฟังก์ชั่นบันทึกเวลา
    function mark() {
        w(K, Date.now());
    }

    // ฟังก์ชั่นแจ้งเตือน
    function send(sub, msg) {
        console.log(`[${A}] ${sub} | ${msg}`);
        if (!EN) return;
        try {
            if (typeof $notify === "function") $notify(A, sub, msg);
            else if (typeof $notification !== "undefined" && $notification.post)
                $notification.post(A, sub, msg);
        } catch (e) {
            console.log("[NotifyErr]", e);
        }
    }

    try {
        if ($response && $response.body) {
            const objc = JSON.parse($response.body);

            // ตรวจสอบการซื้อ Lifetime Membership
            if (objc.receipt.in_app[0].expires_date === "2099-09-09 09:09:09 Etc/GMT") {
                send("✅ ปลดล็อคสำเร็จ!", M_OK);
                mark(); // บันทึกเวลาเพื่อลดการแจ้งเตือนซ้ำ
            } else {
                console.log(`[${A}] ⏳ ผู้ใช้ยังไม่ได้ซื้อ Lifetime Membership`);
                send("⚠️ ตรวจไม่พบการซื้อ Lifetime Membership");
            }

        } else {
            send("⚠️ ตรวจไม่พบ $response.body");
        }
    } catch (err) {
        send(M_ERR, String(err));
        console.log(`[${A}] ❌ ${err}`);
    }
})();

// 主脚本函数...
var objc = JSON.parse($response.body);

objc = {
    "status": 0,
    "receipt": {
        "receipt_type": "Production",
        "app_item_id": 944665061,
        "receipt_creation_date": "2023-06-06 16:06:26 Etc/GMT",
        "bundle_id": "com.risingcabbage.pro.camera",
        "in_app": [{
            "quantity": "1",
            "purchase_date_ms": "1686065612000",
            "expires_date": "2099-09-09 09:09:09 Etc/GMT",
            "expires_date_pst": "2099-09-09 06:06:06 America/Los_Angeles",
            "is_in_intro_offer_period": "false",
            "transaction_id": "490001314520000",
            "is_trial_period": "false",
            "original_transaction_id": "490001314520000",
            "product_id": "com.risingcabbage.pro.camera.relensproforever",
            "in_app_ownership_type": "PURCHASED"
        }],
        "original_purchase_date": "2023-06-06 16:00:00 Etc/GMT",
        "adam_id": 944665061,
        "receipt_creation_date_pst": "2023-06-06 06:06:26 America/Los_Angeles",
        "request_date": "2023-06-06 16:06:27 Etc/GMT",
        "request_date_pst": "2023-06-06 06:06:27 America/Los_Angeles",
        "application_version": "5"
    },
    "Author": "Crack",
    "latest_receipt_info": [{
        "quantity": "1",
        "purchase_date_ms": "1686065612000",
        "expires_date": "2099-09-09 09:09:09 Etc/GMT",
        "product_id": "com.risingcabbage.pro.camera.relensproforever",
        "in_app_ownership_type": "PURCHASED"
    }],
    "environment": "Production",
    "pending_renewal_info": [{
        "product_id": "com.risingcabbage.pro.camera.relensproforever",
        "original_transaction_id": "490001314520000",
        "auto_renew_status": "1"
    }],
    "warning": "仅供学习，禁止转载或售卖"
}

// หากผู้ใช้ซื้อ Lifetime Membership ที่หมดอายุปี 2099 ไม่แสดงการแจ้งเตือน
if (objc.receipt.in_app[0].expires_date === "2099-09-09 09:09:09 Etc/GMT") {
    $done({body: JSON.stringify(objc)}); // ส่งข้อมูลกลับ
} else {
    $done({body: JSON.stringify(objc)}); // ส่งข้อมูลกลับแบบปกติ
}