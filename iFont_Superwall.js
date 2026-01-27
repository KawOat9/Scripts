/*
 * iFont Premium Unlock (Adapty)
 * Product: Lifetime (Remove Ads)
 * ID: uk.co.codingcorner.iFont.removeAds
 */

const body = JSON.parse($response.body);

if (body && body.data) {
    // กำหนดวันที่ซื้อ (ย้อนหลัง)
    const purchaseDate = "2023-01-01T00:00:00.000Z";
    
    // สร้างสิทธิ์ Premium (Lifetime)
    const premiumAccess = {
        "id": "premium",
        "is_active": true,
        "is_lifetime": true,
        "expires_at": null,
        "starts_at": purchaseDate,
        "will_renew": false,
        "vendor_product_id": "uk.co.codingcorner.iFont.removeAds",
        "store": "app_store",
        "active_introductory_offer_type": null,
        "active_promotional_offer_type": null,
        "is_in_grace_period": false,
        "unsubscribed_at": null,
        "billing_issue_detected_at": null
    };

    // สร้างข้อมูล Subscriptions (บางแอปเช็คตรงนี้ด้วย)
    const subscriptionInfo = {
        "uk.co.codingcorner.iFont.removeAds": {
            "is_active": true,
            "is_lifetime": true,
            "expires_at": null,
            "starts_at": purchaseDate,
            "will_renew": false,
            "vendor_product_id": "uk.co.codingcorner.iFont.removeAds",
            "store": "app_store",
            "is_sandbox": false
        }
    };

    // ยัดข้อมูลใส่เข้าไปในตำแหน่งที่ถูกต้อง
    if (!body.data.attributes) body.data.attributes = {};
    
    // Inject Access Levels
    body.data.attributes.access_levels = {
        "premium": premiumAccess
    };
    
    // Inject Subscriptions
    body.data.attributes.subscriptions = subscriptionInfo;
}

$done({ body: JSON.stringify(body) });
