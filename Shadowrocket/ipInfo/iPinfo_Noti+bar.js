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
    const bar = getProgressBar(score);

    const lat = d.latitude ?? "N/A";
    const lon = d.longitude ?? "N/A";

    const msg =
      `🌐 IP: ${d.ip}\n` +
      `🏢 ISP: ${d.asOrganization || "N/A"}\n` +
      `📍 Location: ${flag} ${d.countryCode || ""} ${d.region || ""}\n` +
      `🗺️ Coordinates: ${lat}, ${lon}\n` +
      `💻 Type: ${type}\n` +
      `⚡ Risk: ${score} (${level}) ${icon}\n` +
      `📊 Risk Bar: ${bar}`;

    $notification.post("🔎 IPPure Info", "", msg);
    $done({});

  } catch (e) {
    $notification.post("🔎 IPPure", "❌ Parse Error", e.message);
    $done({});
  }
});

// ฟังก์ชันความเสี่ยง
function getRiskLevel(score) {
  if (score <= 25) return { level: "Low", icon: "✅🟢" };
  if (score <= 50) return { level: "Medium", icon: "🟡" };
  if (score <= 75) return { level: "High", icon: "⚠️🔴" };
  return { level: "Critical", icon: "‼️🛑" };
}

// ฟังก์ชัน Progress Bar (เต็ม 10 แท่ง)
function getProgressBar(score) {
  const totalBlocks = 10;
  const filledBlocks = Math.round((score / 100) * totalBlocks);
  const emptyBlocks = totalBlocks - filledBlocks;
  return "█".repeat(filledBlocks) + "░".repeat(emptyBlocks);
}

// ฟังก์ชันแปลง Country Code เป็น Emoji
function getFlagEmoji(code) {
  if (!code) return "🌍";
  return String.fromCodePoint(
    ...code.toUpperCase().split("").map(c => 127397 + c.charCodeAt())
  );
}