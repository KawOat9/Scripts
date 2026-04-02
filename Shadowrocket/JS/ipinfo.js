const url = "https://ipinfo.io/json";
const headers = {
  "User-Agent":
    "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1"
};

$httpClient.get({ url, headers }, (error, response, data) => {
  if (error) {
    $notification.post("🔎 IPInfo", "⚠️ Connect Error", "โปรดตรวจสอบเครือข่าย");
    $done({});
    return;
  }

  try {
    const d = JSON.parse(data);

    // Adjust the fields according to the ipinfo.io API response structure
    const flag = getFlagEmoji(d.country);
    const type = d.hostname ? "🏠 บ้าน (Residential)" : "🏢 Data Center"; // Assuming `hostname` indicates residential type
    const score = d.fraudScore ?? 0;  // ipinfo.io does not provide fraud score, you might need a different check here
    const { level, icon, color } = getRiskLevel(score);
    const bar = getColoredProgressBar(score, color);

    const latLon = d.loc.split(',');  // ipinfo.io provides 'loc' as a comma-separated string of latitude and longitude
    const lat = latLon[0] ?? "N/A";
    const lon = latLon[1] ?? "N/A";

    const msg =
      `🌐 IP: ${d.ip}\n` +
      `🏢 ISP: ${d.org || "N/A"}\n` +
      `📍 Location: ${flag} ${d.country || ""} ${d.region || ""}\n` +
      `🗺️ Coordinates: ${lat}, ${lon}\n` +
      `💻 Type: ${type}\n` +
      `⚡ Risk: ${score} (${level}) ${icon}\n` +
      `📊 Risk Bar: ${bar}`;

    $notification.post("🔎 IPInfo", "", msg);
    $done({});

  } catch (e) {
    $notification.post("🔎 IPInfo", "❌ Parse Error", e.message);
    $done({});
  }
});

// ฟังก์ชันความเสี่ยงพร้อมสี
function getRiskLevel(score) {
  if (score <= 25) return { level: "Low", icon: "✅", color: "🟩" };
  if (score <= 50) return { level: "Medium", icon: "⚠️", color: "🟨" };
  if (score <= 75) return { level: "High", icon: "⚠️", color: "🟥" };
  return { level: "Critical", icon: "‼️", color: "🛑" };
}

// ฟังก์ชัน Progress Bar สีตาม Risk
function getColoredProgressBar(score, color) {
  const totalBlocks = 10;
  const filledBlocks = Math.round((score / 100) * totalBlocks);
  const emptyBlocks = totalBlocks - filledBlocks;
  const emptySymbol = "⬜";
  return color.repeat(filledBlocks) + emptySymbol.repeat(emptyBlocks);
}

// ฟังก์ชันแปลง Country Code เป็น Emoji
function getFlagEmoji(code) {
  if (!code) return "🌍";
  return String.fromCodePoint(
    ...code.toUpperCase().split("").map(c => 127397 + c.charCodeAt())
  );
}