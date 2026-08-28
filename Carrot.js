/******************************

#!name=CARROTWeathe ✨
#!desc=Unlock Premium Family
#!author=🅚Ⓐ🅦Ⓞ🅐Ⓣ
#!openUrl=https://apps.apple.com/app/id961390574
#!icon=https://raw.githubusercontent.com/KawOat9/icons/main/Carrot.png
#!category=🔐APP

*******************************

[rewrite_local]
https://carrotweather.herokuapp.com/parse/functions/findSubscriptionsForUserId url script-response-body https://raw.githubusercontent.com/KawOat9/Scripts/main/Carrot.js

[mitm]
hostname = carrotweather.herokuapp.com

*******************************/

// 🔔 ส่วนที่ 1: ระบบแจ้งเตือน (Notification)
(function(){const A="✨🌤️CARROT Weathe✨",M_OK="หมดอายุ: 2099-09-09",M_ERR="❌ ปลดล็อคล้มเหลว",EN=true,CD=10,K="n_"+A.replace(/[^\w]/g,"").toLowerCase()+"_t",P=typeof $prefs!=="undefined",S=typeof $persistentStore!=="undefined";function r(k){try{if(P)return $prefs.valueForKey(k);if(S)return $persistentStore.read(k);}catch(e){}return null}function w(k,v){try{if(P)return $prefs.setValueForKey(String(v),k);if(S)return $persistentStore.write(String(v),k);}catch(e){}}function can(){let t=parseInt(r(K)||"0",10)||0;return CD===0||Date.now()-t>CD*6e4}function mark(){w(K,Date.now())}function send(sub,msg){console.log(`[${A}] ${sub} | ${msg}`);if(!EN)return;try{if(typeof $notify==="function")$notify(A,sub,msg);else if(typeof $notification!=="undefined"&&$notification.post)$notification.post(A,sub,msg);}catch(e){console.log("[NotifyErr]",e)}}try{if($response&&$response.body){if(can()){send("✅ ปลดล็อคสำเร็จ!",M_OK);mark()}else console.log(`[${A}] ⏳ Cooldown(${CD}min)`)}else{send("⚠️ ตรวจไม่พบ $response.body")}}catch(err){send(M_ERR,String(err));console.log(`[${A}] ❌ ${err}`)}})();

// 🔔 ส่วนที่ 2: สคริปต์ปลดล็อก (Unlock Script)
var body = $response.body;
var obj = JSON.parse(body);

obj = {
    "result": {
      "serverDate": {
        "__type": "Date",
        "iso": "2026-03-08T08:16:11.477Z"
      },
      "subscriptions": [
        {
          "userId": "6FFEA015-FEDE-440A-B669-0D45AFCF9478",
          "orderId": "30001933369528",
          "packageName": "com.grailr.CARROTweather",
          "appPurchaseTime": "1701601075000",
          "appStartingVersion": "5.12.9.0",
          "receipt": "MIT",
          "productId": "com.grailr.carrotWeather.premiumFamily1year",
          "purchaseTime": 1771832880000,
          "originalPurchaseTime": 1771832880000,
          "expirationTime": "1803368881000",
          "in_app_ownership_type": "PURCHASED",
          "expirationReason": null,
          "isInBillingRetryPeriod": null,
          "autoRenewStatus": 1,
          "cancellationDate": null,
          "cancellationReason": null,
          "priceConsentStatus": null,
          "gracePeriodExpiresTime": null,
          "isTrialPeriod": null,
          "status": 0,
          "service": "apple",
          "environment": "Production",
          "createdAt": "2026-02-23T07:48:07.554Z",
          "updatedAt": "2026-02-08T07:24:51.399Z",
          "deviceId": [
            "WfjT0vx1hx",
            "pPsiN1AKdt"
          ],
          "lastNotification": "DID_CHANGE_RENEWAL_STATUS",
          "lastNotificationDate": {
            "__type": "Date",
            "iso": "2026-02-24T11:47:39.182Z"
          },
          "objectId": "m5JpZFig4u",
          "__type": "Object",
          "className": "Subscription"
        }
      ]
    }
  };

body = JSON.stringify(obj);
$done({body});