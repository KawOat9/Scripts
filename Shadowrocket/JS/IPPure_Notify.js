// IP-Pure Node Info for Shadowrocket (Notification Version)

//const url = "https://my.ippure.com/v1/info";
const url = "https://my.123169.xyz/v1/info";
const headers = {
  "User-Agent":
    "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1"
};

$httpClient.get({ url, headers }, (error, response, data) => {
  if (error) {
    $notification.post("🔎 IPPure", "Connect Error", "โปรดตรวจสอบเครือข่าย");
    $done({}); // จบการทำงานแบบไม่ส่งข้อมูลกลับ
    return;
  }

  try {
    const d = JSON.parse(data);

    const flag = getFlagEmoji(d.countryCode);
    const type = d.isResidential ? "บ้าน (Residential) 🏠" : "Data Center 🏢";
    const score = d.fraudScore ?? 0;
    const risk = getRiskLevel(score);

    const msg =
      `IP: ${d.ip}\n` +
      `ISP: ${d.asOrganization || "N/A"}\n` +
      `Loc: ${flag} ${d.countryCode || ""} ${d.region || ""}\n` +
      `Type: ${type}\n` +
      `Risk: ${score} (${risk})`;

    // ส่งแจ้งเตือน
    $notification.post("🔎 IPPure Info", "", msg);
    
    // คืนค่าหน้าเว็บเปล่าๆ เพื่อให้ Browser หยุดหมุน
    $done({
        response: {
            status: 200,
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: "✅ ตรวจสอบเรียบร้อย\nดูผลลัพธ์ที่ Notification ด้านบน"
        }
    });

  } catch (e) {
    $notification.post("🔎 IPPure", "Parse Error", e.message);
    $done({});
  }
});

function getRiskLevel(score) {
  if (score <= 25) return "Low ✅";
  if (score <= 50) return "Medium 🟡";
  if (score <= 75) return "High ⚠️";
  return "Critical ‼️";
}

function getFlagEmoji(code) {
  if (!code) return "🌍";
  return String.fromCodePoint(
    ...code.toUpperCase().split("").map(c => 127397 + c.charCodeAt())
  );
}
