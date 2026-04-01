const url = "https://my.ippure.com/v1/info";
const headers = {
  "User-Agent":
    "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1"
};

$httpClient.get({ url, headers }, (error, response, data) => {
  if (error) {
    const htmlError = `
      <h2>🔎 IPPure - Connect Error</h2>
      <p>โปรดตรวจสอบเครือข่าย</p>
    `;
    $done({ response: { status: 200, headers: { "Content-Type": "text/html;charset=utf-8" }, body: htmlError } });
    return;
  }

  try {
    const d = JSON.parse(data);

    const flag = getFlagEmoji(d.countryCode);
    const type = d.isResidential ? "บ้าน (Residential) 🏠" : "Data Center 🏢";
    const score = d.fraudScore ?? 0;
    const risk = getRiskLevel(score);

    const html = `
      <html>
      <head>
        <meta charset="UTF-8">
        <title>IP-Pure Info</title>
        <style>
          body { font-family: Arial, sans-serif; background-color: #f0f2f5; padding: 20px; }
          .card { background: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); max-width: 500px; margin: auto; }
          h1 { text-align: center; }
          p { font-size: 16px; line-height: 1.5; }
          .risk-low { color: green; font-weight: bold; }
          .risk-medium { color: orange; font-weight: bold; }
          .risk-high { color: red; font-weight: bold; }
          .risk-critical { color: darkred; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="card">
          <h1>🔎 IP-Pure Info</h1>
          <p><strong>IP:</strong> ${d.ip}</p>
          <p><strong>ISP:</strong> ${d.asOrganization || "N/A"}</p>
          <p><strong>Location:</strong> ${flag} ${d.countryCode || ""} ${d.region || ""}</p>
          <p><strong>Type:</strong> ${type}</p>
          <p><strong>Risk:</strong> <span class="${getRiskClass(score)}">${score} (${risk})</span></p>
        </div>
      </body>
      </html>
    `;

    $done({
      response: {
        status: 200,
        headers: { "Content-Type": "text/html;charset=utf-8" },
        body: html
      }
    });

  } catch (e) {
    const htmlError = `
      <h2>🔎 IPPure - Parse Error</h2>
      <p>${e.message}</p>
    `;
    $done({ response: { status: 200, headers: { "Content-Type": "text/html;charset=utf-8" }, body: htmlError } });
  }
});

function getRiskLevel(score) {
  if (score <= 25) return "Low ✅";
  if (score <= 50) return "Medium 🟡";
  if (score <= 75) return "High ⚠️";
  return "Critical ‼️";
}

function getRiskClass(score) {
  if (score <= 25) return "risk-low";
  if (score <= 50) return "risk-medium";
  if (score <= 75) return "risk-high";
  return "risk-critical";
}

function getFlagEmoji(code) {
  if (!code) return "🌍";
  return String.fromCodePoint(
    ...code.toUpperCase().split("").map(c => 127397 + c.charCodeAt())
  );
}