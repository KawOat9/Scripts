/*
 * ShellBoxKit Pro Crack (Lifetime)
 * Unlock: ssh_pro
 */

const body = JSON.parse($response.body);

// กำหนดสิทธิ์ให้เป็น Pro ถาวร
const proData = {
  "entitlements": {
    "ssh_pro": {
      "grace_period_expires_date": null,
      "purchase_date": "2023-01-01T00:00:00Z",
      "product_identifier": "ShellBoxKit.Lifetime",
      "expires_date": null
    }
  },
  "original_purchase_date": "2023-01-01T00:00:00Z",
  "original_app_user_id": "ep1c_cr@ck",
  "subscriptions": {},
  "non_subscriptions": {
    "ShellBoxKit.Lifetime": [{
      "id": "lifetime_purchase",
      "is_sandbox": false,
      "original_purchase_date": "2023-01-01T00:00:00Z",
      "purchase_date": "2023-01-01T00:00:00Z",
      "store": "app_store",
      "store_transaction_id": "1000000000000000"
    }]
  }
};

// แทนที่ข้อมูลเดิมด้วยข้อมูล Pro
if (body && body.subscriber) {
    body.subscriber.entitlements = proData.entitlements;
    body.subscriber.original_purchase_date = proData.original_purchase_date;
    body.subscriber.non_subscriptions = proData.non_subscriptions;
    // บางแอปเช็ค subscriptions ด้วย (แต่เคสนี้เป็น Lifetime มักเช็คที่ entitlements หรือ non_subscriptions)
}

$done({ body: JSON.stringify(body) });
