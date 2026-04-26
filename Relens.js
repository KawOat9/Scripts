/*
#!name=ReLens ✨
#!desc=relenspro forever
#!category=🔐APP
#!author=🅚Ⓐ🅦Ⓞ🅐Ⓣ
#!icon=https://raw.githubusercontent.com/KawOat9/icons/main/Bazaart.png
𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹
[rewrite_local]
^https:\/\/buy\.itunes\.apple\.com\/verifyReceipt url script-response-body https://raw.githubusercontent.com/KawOat9/Scripts/main/Relens.js

[mitm]
hostname = buy.itunes.apple.com

*/
//🔔 通知模块（含失败日志显示，不干扰原脚本）
(function(){const A="✨🎟️ReLens✨",M_OK="หมดอายุ: 2099-09-09",M_ERR="❌ ปลดล็อคล้มเหลว",EN=true,CD=10,K="n_"+A.replace(/[^\w]/g,"").toLowerCase()+"_t",P=typeof $prefs!=="undefined",S=typeof $persistentStore!=="undefined";function r(k){try{if(P)return $prefs.valueForKey(k);if(S)return $persistentStore.read(k);}catch(e){}return null}function w(k,v){try{if(P)return $prefs.setValueForKey(String(v),k);if(S)return $persistentStore.write(String(v),k);}catch(e){}}function can(){let t=parseInt(r(K)||"0",10)||0;return CD===0||Date.now()-t>CD*6e4}function mark(){w(K,Date.now())}function send(sub,msg){console.log(`[${A}] ${sub} | ${msg}`);if(!EN)return;try{if(typeof $notify==="function")$notify(A,sub,msg);else if(typeof $notification!=="undefined"&&$notification.post)$notification.post(A,sub,msg);}catch(e){console.log("[NotifyErr]",e)}}try{if($response&&$response.body){if(can()){send("✅ ปลดล็อคสำเร็จ!",M_OK);mark()}else console.log(`[${A}] ⏳ Cooldown(${CD}min)`)}else{send("⚠️ ตรวจไม่พบ $response.body")}}catch(err){send(M_ERR,String(err));console.log(`[${A}] ❌ ${err}`)}})();

// 主脚本函数...
var objc = JSON.parse($response.body);

objc = {
	"status": 0,
	"receipt": {
		"receipt_type": "Production",
		"app_item_id": 944665061,
		"receipt_creation_date": "2023-06-06 16:06:26 Etc/GMT",
		"bundle_id": "com.risingcabbage.pro.camera.relensproforever2025",
		"in_app": [{
			"quantity": "1",
			"purchase_date_ms": "1686065612000",
			"expires_date": "2099-09-09 09:09:09 Etc/GMT",
			"expires_date_pst": "2099-09-09 06:06:06 America/Los_Angeles",
			"is_in_intro_offer_period": "false",
			"transaction_id": "490001314520000",
			"is_trial_period": "false",
			"original_transaction_id": "490001314520000",
			"purchase_date": "2023-06-06 16:06:06 Etc/GMT",
			"product_id": "com.risingcabbage.pro.camera.relensproforever2025",
			"original_purchase_date_pst": "2023-06-06 06:06:07 America/Los_Angeles",
			"in_app_ownership_type": "PURCHASED",
			"original_purchase_date_ms": "1686065613000",
			"web_order_line_item_id": "490000123456789",
			"expires_date_ms": "4092599349000",
			"purchase_date_pst": "2023-06-06 06:06:06 America/Los_Angeles",
			"original_purchase_date": "2023-06-06 16:06:07 Etc/GMT"
		}],
		"original_purchase_date": "2023-06-06 16:00:00 Etc/GMT",
		"adam_id": 944665061,
		"receipt_creation_date_pst": "2023-06-06 06:06:26 America/Los_Angeles",
		"request_date": "2023-06-06 16:06:27 Etc/GMT",
		"request_date_pst": "2023-06-06 06:06:27 America/Los_Angeles",
		"version_external_identifier": 888888888,
		"request_date_ms": "1686065635000",
		"original_purchase_date_pst": "2023-06-06 06:00:00 America/Los_Angeles",
		"application_version": "5",
		"original_purchase_date_ms": "1686065430000",
		"receipt_creation_date_ms": "1686065634000",
		"original_application_version": "7",
		"download_id": 666666666666666600
	},
	"Author": "Crack",
	"latest_receipt_info": [{
		"quantity": "1",
		"purchase_date_ms": "1686065612000",
		"expires_date": "2099-09-09 09:09:09 Etc/GMT",
		"expires_date_pst": "2099-09-09 06:06:06 America/Los_Angeles",
		"is_in_intro_offer_period": "false",
		"transaction_id": "490001314520000",
		"is_trial_period": "false",
		"original_transaction_id": "490001314520000",
		"purchase_date": "2023-06-06 16:06:06 Etc/GMT",
		"product_id": "com.risingcabbage.pro.camera.relensproforever2025",
		"original_purchase_date_pst": "2023-06-06 06:06:07 America/Los_Angeles",
		"in_app_ownership_type": "PURCHASED",
		"original_purchase_date_ms": "1686065613000",
		"web_order_line_item_id": "490000123456789",
		"expires_date_ms": "4092599349000",
		"purchase_date_pst": "2023-06-06 06:06:06 America/Los_Angeles",
		"original_purchase_date": "2023-06-06 16:06:07 Etc/GMT"
	}],
	"latest_receipt": "Crack",
	"environment": "Production",
	"pending_renewal_info": [{
		"product_id": "com.risingcabbage.pro.camera.relensproforever2025",
		"original_transaction_id": "490001314520000",
		"auto_renew_product_id": "com.risingcabbage.pro.camera.relensproforever2025",
		"auto_renew_status": "1"
	}],
	"warning": "仅供学习，禁止转载或售卖"
}
$done({body : JSON.stringify(objc)});