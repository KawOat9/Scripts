/*
#!name=Imgur ✨
#!desc=Imgur
#!category=🔐APP
#!author=🅚Ⓐ🅦Ⓞ🅐Ⓣ
#!icon=
𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹
[rewrite_local]
^https:\/\/api\.imgur\.com\/3\/account\/me url script-response-body https://raw.githubusercontent.com/KawOat9/Scripts/main/Imgur.js

[mitm]
hostname = api.imgur.com
*/

// Imgur Pro
try {
  let obj = JSON.parse($response.body);

  if (obj.success && obj.data) {
    obj.data.is_subscribed = true;
    obj.data.pro_expiration = true;
    obj.data.is_founders_club = true;
  }

  $done({
    body: JSON.stringify(obj)
  });

} catch (err) {
  console.log("Imgur Pro 修改失败: " + err);
  $done({});
}