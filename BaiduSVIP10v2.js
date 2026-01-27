/*************************
 * Baidu Pan SVIP Patch (Clean)
 * - Remove ads
 * - Force 1080p streaming
 * - Fake SVIP / quota
 *************************/

const TB_30 = 32985348833280; // 30TB (bytes)

// ===== helper =====
function setStreaming1080(url) {
  const u = new URL(url);
  if (/^M3U8/.test(u.searchParams.get("type"))) {
    u.searchParams.set("type", "M3U8_AUTO_1080"); // ปลอมให้ขอ 1080p
  }
  return u.toString();
}

// ===== router =====
const url = $request.url;

// --- 1) ลบ config โฆษณา / หน้า home ---
if (url.includes("api/getsyscfg")) {
  let obj = JSON.parse($response.body);

  const removeKeys = [
    "advertise_", "splash_", "ad_", "ai_",
    "home_card_area", "push_active_area",
    "commerce_", "magictrick"
  ];

  for (const k in obj) {
    if (removeKeys.some(x => k.includes(x)) && obj[k]?.cfg_list) {
      obj[k].cfg_list = []; // จุดนี้ = ลบ config โฆษณา
    }
  }

  $done({ body: JSON.stringify(obj) });
}

// --- 2) ลบ splash / entry ad ---
else if (url.includes("afd/entry")) {
  let obj = JSON.parse($response.body);
  obj.res.ad = [];        // ปลอม: ไม่มีโฆษณา
  obj.res.splash = {};   // ปลอม: ไม่มี splash
  $done({ body: JSON.stringify(obj) });
}

// --- 3) feed เหลือเฉพาะที่จำเป็น ---
else if (url.includes("feed/cardinfos")) {
  let obj = JSON.parse($response.body);
  if (obj.data?.cards) {
    obj.data.cards = obj.data.cards.filter(
      c => c.source === "product" || c.source === "recent"
    );
  }
  $done({ body: JSON.stringify(obj) });
}

// --- 4) streaming บังคับ 1080p ---
else if (url.includes("api/streaming")) {
  // จุดนี้ = ปลอม request ให้เป็น 1080p
  $done({ url: setStreaming1080(url) });
}

// --- 5) ปลอมสถานะ SVIP ---
else if (url.includes("membership/user")) {
  // ทั้ง block นี้ = FAKE MEMBER RESPONSE
  let fake = {
    error_code: 0,
    svip: { status: 2 },
    vipv2: { status: 1 },
    level_info: { current_level: 10 },
    reminder: {
      advertiseContent: {
        title: "您的超级会员将于2099-12-31到期"
      }
    }
  };
  $done({ body: JSON.stringify(fake) });
}

// --- 6) ปลอม quota (30TB) ---
else if (url.includes("api/quota")) {
  let obj = JSON.parse($response.body);
  obj.expire = false;     // ปลอม: ไม่มีวันหมดอายุ
  obj.quota  = TB_30;     // ปลอมพื้นที่
  obj.total  = TB_30;
  $done({ body: JSON.stringify(obj) });
}

else {
  $done({});
}