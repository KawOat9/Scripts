// IP Info for Shadowrocket (ipwho.is / iOS Notification)

const url = "https://ipwho.is/";

$httpClient.get(url, (error, response, data) => {
  if (error) {
    $notification.post("🌐 IP Info", "Connect Error", "เชื่อมต่อไม่ได้");
    return $done({});
  }

  try {
    const d = JSON.parse(data);
    if (!d.success) throw new Error("API Error");

    const flag = getFlagEmoji(d.country_code);
    const proxy =
      d.proxy || d.vpn || d.tor ? "Yes ⚠️" : "No ✅";

    const msg =
      `IP: ${d.ip}\n` +
      `ISP: ${d.isp || "N/A"}\n` +
      `Loc: ${flag} ${d.country_code} ${d.region || ""}\n` +
      `Type: ${d.connection?.type || "N/A"}\n` +
      `Proxy/VPN: ${proxy}`;

    $notification.post("🌐 IP Info", "", msg);

    // ปิดหน้า Browser ไม่ให้หมุน
    $done({
      response: {
        status: 200,
        headers: { "Content-Type": "text/plain; charset=utf-8" },
        body: "✅ ตรวจสอบ IP แล้ว\nดูผลลัพธ์ที่ Notification"
      }
    });

  } catch (e) {
    $notification.post("🌐 IP Info", "Parse Error", e.message);
    $done({});
  }
});

function getFlagEmoji(code) {
  if (!code) return "🌍";
  return String.fromCodePoint(
    ...code.toUpperCase().split("").map(c => 127397 + c.charCodeAt())
  );
}