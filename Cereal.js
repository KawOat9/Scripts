/*************************************

#!name=Cereal Translator ✨
#!desc=Unlock Premium Subscription
#!category=🔐APP
#!author=🅚Ⓐ🅦Ⓞ🅐Ⓣ
#!openUrl=https://apps.apple.com/app/id6466264767
#!icon=https://raw.githubusercontent.com/KawOat9/icons/main/Cereal.png

**************************************

[rewrite_local]
^https?:\/\/youxifanyizhushou\.com\/ios\/api\/product\/user\/remain\/ios url script-response-body https://raw.githubusercontent.com/KawOat9/Scripts/main/Cereal.js

[mitm]
hostname = youxifanyizhushou.com

*************************************/


var ddm = JSON.parse($response.body);

ddm.data = [{
  "infinite" : true,
  "productPayType": 1,
  "times": 9999,
  "level": 5,
  "desc": "apple麦片永久",
  "expireTime": "2099-09-09 09:09:09"
}];

$done({ body: JSON.stringify(ddm) });