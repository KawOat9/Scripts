var url = $request.url;
var host = url.split("/")[2];

function safeParse(str) {
    try { return JSON.parse(str) || {}; }
    catch { return {}; }
}
var obj = (typeof $response !== "undefined" && $response?.body) ? safeParse($response.body) : {};
obj.receipt = obj.receipt || {}; 

var remoteUrl = "https://he2o.vercel.app/Resource/Script/list.json";

$httpClient.get(remoteUrl, (err, resp, data) => {
    if (!data) return $done({ body: JSON.stringify(obj) });
    let allData = safeParse(data);
    const products = allData.products?.list || [];
    if (allData.products?.hosts?.includes(host) && products.length) {
        obj.latest_receipt_info = [];
        obj.pending_renewal_info = [];
        obj.receipt.in_app = [];

        products.forEach(item => {
            if (!item.product_id || !item.name) return;

            const inapp = {
                "quantity": "1",
                "product_id": item.product_id,
                "expires_date": "2100-08-01 23:59:59 Etc/GMT",
                "expires_date_pst": "2100-08-01 23:59:59 America/Los_Angeles",
                "expires_date_ms": "4133865599000",
                "in_app_ownership_type": "PURCHASED"
            };
            const renew = {
                "product_id": item.product_id,
                "auto_renew_product_id": item.product_id,
                "auto_renew_status": "1"
            };

            obj.latest_receipt_info.push(inapp);
            obj.pending_renewal_info.push(renew);
            obj.receipt.in_app.push(inapp);

            console.log(`✅ ${item.name} 已解锁内购 🎉`);
        });

        return $done({ body: JSON.stringify(obj) });
    }
	
//────────────── 分隔线 ────────────── 分隔线 ─────────────────────── 分隔线 ───────

    else if (allData.ua_mappings?.hosts?.includes(host)) {
        if (typeof $response === "undefined") {
            delete $request.headers["x-revenuecat-etag"];
            delete $request.headers["X-RevenueCat-ETag"];
            return $done({ headers: $request.headers });
        }
        if (!obj.subscriber) obj.subscriber = { subscriptions: {}, entitlements: {} };
        obj.subscriber.subscriptions = {};
        obj.subscriber.entitlements = {};

        const UA = $request.headers['user-agent'];
        const dataTemplate = {
            "expires_date": "2100-08-01T23:59:59Z",
            "original_purchase_date": "2022-08-01T23:59:59Z",
            "purchase_date": "2022-08-01T23:59:59Z",
            "ownership_type": "PURCHASED",
            "store": "app_store"
        };
        const UAMappings = allData.ua_mappings.list || {};
        for (const key in UAMappings) {
            if (new RegExp(`^${key}`, 'i').test(UA)) {
                const { name, id, applestore_name } = UAMappings[key];
                obj.subscriber.subscriptions[id] = dataTemplate;
                obj.subscriber.entitlements[name] = { ...dataTemplate, product_identifier: id };
                console.log(`✅ ${applestore_name} 已解锁内购 🎉`);
                break;
            }
        }

        return $done({ body: JSON.stringify(obj) });
    }

    return $done({ body: JSON.stringify(obj) });
});