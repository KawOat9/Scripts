const url = "https://my.ippure.com/v1/info";
const headers = {
  "User-Agent":
    "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1"
};

$httpClient.get({ url, headers }, (error, response, data) => {
  if (error) {
    $notification.post("🔎 IPPure", "⚠️ Connect Error", "โปรดตรวจสอบเครือข่าย");
    $done({});
    return;
  }

  try {
    const d = JSON.parse(data);

    const flag = getFlagEmoji(d.countryCode);
    const type = d.isResidential ? "🏠 บ้าน (Residential)" : "🏢 Data Center";
    const score = d.fraudScore ?? 0;
    const { level, icon } = getRiskLevel(score);

    const lat = d.latitude ?? "N/A";
    const lon = d.longitude ?? "N/A";

    const msg =
      `🌐 IP: ${d.ip}\n` +
      `🏢 ISP: ${d.asOrganization || "N/A"}\n` +
      `📍 Location: ${flag} ${d.countryCode || ""} ${d.region || ""}\n` +
      `🗺️ Coordinates: ${lat}, ${lon}\n` +
      `💻 Type: ${type}\n` +
      `⚡ Risk: ${score} (${level}) ${icon}`;

    $notification.post("🔎 IPPure Info", "", msg);
    $done({});

  } catch (e) {
    $notification.post("🔎 IPPure", "❌ Parse Error", e.message);
    $done({});
  }
});

function getRiskLevel(score) {
  if (score <= 25) return { level: "Low", icon: "✅🟢" };
  if (score <= 50) return { level: "Medium", icon: "🟡" };
  if (score <= 75) return { level: "High", icon: "⚠️🔴" };
  return { level: "Critical", icon: "‼️🛑" };
}

function getFlagEmoji(code) {
  if (!code) return "🌍";
  return String.fromCodePoint(
    ...code.toUpperCase().split("").map(c => 127397 + c.charCodeAt())
  );
}