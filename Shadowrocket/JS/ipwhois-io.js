// IP Info for Shadowrocket (ipwho.is Version)

const url = "https://ipwho.is/";
const headers = {
  "User-Agent":
    "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1"
};

$httpClient.get({ url, headers }, (error, response, data) => {
  if (error) {
    $notification.post("🌐 IP Info", "Connect Error", "โปรดตรวจสอบเครือข่าย");
    $done({});
    return;
  }

  try {
    const d = JSON.parse(data);

    if (d.success === false) {
      $notification.post("🌐 IP Info", "API Error", d.message || "Unknown error");
      $done({});
      return;
    }

    const flag = d.flag?.emoji || "🌍";
    const type = d.type === "residential" ? "บ้าน (Residential) 🏠" : "Data Center 🏢";

    const msg =
      `IP: ${d.ip}\n` +
      `ISP: ${d.isp || d.connection?.isp || "N/A"}\n` +
      `Loc: ${flag} ${d.country_code} ${d.region || ""}\n`;

    // แจ้งเตือน
    $notification.post("🌐 IPWho.is Info", "", msg);

    // ส่ง response เปล่าให้ browser หยุดโหลด
    $done({
      response: {
        status: 200,
        headers: { "Content-Type": "text/plain; charset=utf-8" },
        body: "✅ ตรวจสอบ IP เรียบร้อย\nดูผลลัพธ์ที่ Notification"
      }
    });

  } catch (e) {
    $notification.post("🌐 IP Info", "Parse Error", e.message);
    $done({});
  }
});