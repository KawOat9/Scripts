// https://raw.githubusercontent.com/KawOat9/KawOat9/main/Apple_mobile_device_types.txt

// Apple Mobile Device Types with Icons
const devices = {
    " iPhone 15 Pro Max": "iPhone16,2",
    " iPhone XS Max": "iPhone11,6",
    " iPhone 8 Plus": "iPhone10,2",
    " iPad Air 5th Gen (WiFi)": "iPad13,16",
    " Apple Watch Series 6 44mm (GPS)": "Watch6,2"
};

// เลือกอุปกรณ์
const device = args.widgetParameter || "iPhone16,2";
const deviceName = Object.keys(devices).find(key => devices[key] === device) || "unknown";

// API-URL
const url = `https://api.ipsw.me/v4/device/${encodeURIComponent(device)}?type=ipsw`;

const widget = new ListWidget();
const updates = await fetchUpdates();
await createWidget(updates);

if (!config.runsInWidget) {
    await widget.presentSmall();
}
Script.setWidget(widget);
Script.complete();

async function createWidget(updates) {
    widget.setPadding(20, 15, 10, 15);

    // ชื่ออุปกรณ์พร้อม Emoji และตัวหนา
    const title = widget.addText(`➜${deviceName}`);
    title.font = Font.boldSystemFont(14);
    title.textColor = Color.dynamic(new Color("#000"), new Color("#fff"));
    widget.addSpacer(10);

    updates.forEach((update) => {
        const row = widget.addStack();
        row.layoutHorizontally();

        // เวอร์ชัน firmware ตัวหนา + emoji
        const versionText = row.addText(`◍ ${update.version} (${update.build})`);
        versionText.font = Font.boldSystemFont(13);
        versionText.textColor = update.signed ? new Color("#00CD66") : new Color("#E50000");

        row.addSpacer();

        // สถานะ signed/unsigned พร้อม emoji
        const statusSigned = row.addText(update.signed ? "✓" : "✗");
        statusSigned.font = Font.boldSystemFont(14);
        statusSigned.textColor = update.signed ? new Color("#00CD66") : new Color("#E50000");

        widget.addSpacer(4);
    });
}

async function fetchUpdates() {
    const req = new Request(url);
    const apiResult = await req.loadJSON();

    if (!apiResult || !apiResult.firmwares) return [];

    const updates = apiResult.firmwares.map((firmware) => ({
        version: firmware.version.replace(/^9\.9\./, ""),
        build: firmware.buildid,
        signed: firmware.signed,
    }));

    const signedUpdates = updates.filter(u => u.signed);
    const unsignedUpdates = updates.filter(u => !u.signed);

    return [...signedUpdates, ...unsignedUpdates].slice(0, 5);
}