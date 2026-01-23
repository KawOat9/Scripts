/****************************************
 * Baidu Pan SVIP V10 - Shadowrocket
 * - 去广告
 * - 首页精简
 * - 1080P
 * - SVIP V10 (Stealth)
 ****************************************/

function modifyURLParam(url, key, value) {
  const u = new URL(url);
  const old = u.searchParams.get(key);
  if (old && /^M3U8.*\d$/.test(old)) {
    u.searchParams.set(key, value);
  }
  return u.toString();
}

/* ===== Request ===== */
if ($request.url.includes("api/streaming")) {
  const newUrl = modifyURLParam($request.url, "type", "M3U8_AUTO_1080");
  $done({ url: newUrl });
  return;
}

/* ===== Response ===== */
let obj = {};
try { obj = JSON.parse($response.body); } catch (e) {}

/* --- 系统配置去广告 --- */
if ($request.url.includes("api/getsyscfg")) {
  const keys = [
    "advertise_", "splash_", "ad_", "ai_",
    "commerce_", "magictrick", "push_active_area"
  ];
  for (const k in obj) {
    if (keys.some(i => k.includes(i)) && obj[k]?.cfg_list) {
      obj[k].cfg_list = [];
    }
  }
  $done({ body: JSON.stringify(obj) });
  return;
}

/* --- 启动广告 --- */
if ($request.url.includes("afd/entry")) {
  obj.res && (obj.res.ad = [], obj.res.splash = {});
  $done({ body: JSON.stringify(obj) });
  return;
}

/* --- 首页信息流 --- */
if ($request.url.includes("feed/cardinfos")) {
  if (obj.data?.cards) {
    obj.data.cards = obj.data.cards.filter(i =>
      i.source === "product" || i.source === "recent"
    );
  }
  $done({ body: JSON.stringify(obj) });
  return;
}

/* --- SVIP V10 Stealth --- */
if ($request.url.includes("membership/user")) {
  obj = {
    error_code: 0,
    user_type: "svip",
    status_data: "超级会员至：2099-12-31",

    vip: { status: 1 },
    vipv2: { status: 1 },
    svip: { status: 2, is_sign_user: true },

    level_info: {
      current_level: 10,
      history_level: 10,
      current_value: 88888,
      history_value: 88888,
      daily_value: 0,
      accumulated_day: 9999,
      v10_id: "svip_v10"
    },

    guide_data: {
      title: "SVIP V10",
      content: "已解锁全部超级会员权益",
      button: { text: "SVIP V10", action_url: "" }
    },

    v10_guide: {
      get_next_value_gap: false,
      tips: "SVIP V10",
      button: { text: "SVIP V10", action_url: "" }
    }
  };

  $done({ body: JSON.stringify(obj) });
  return;
}

$done({});