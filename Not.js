const response = {
  "data": {
    "associateAppStoreTransactions": {
      "__typename": "SubscriptionOverview",
      "tier": "premium",
      "current": {
        "__typename": "Subscription",
        "productId": "notability_premium",
        "originalTransactionId": "100000000000000",
        "status": "active",
        "originalPurchaseDate": "2025-01-01T00:00:00Z",
        "expirationDate": "9999-12-31T23:59:59Z", // ตั้งเป็นตลอดชีพ
        "isInBillingRetryPeriod": false,
        "refundedDate": null,
        "refundedReason": null,
        "gracePeriodExpiresAt": null,
        "overDeviceLimit": false
      },
      "prior": null,
      "quotas": {
        "__typename": "SubscriptionFeatureQuotaView",
        "learnQuestions": {
          "__typename": "SubscriptionFeatureQuota",
          "isUsageExceeded": false,
          "usagePercentage": 0
        },
        "learnSummaries": {
          "__typename": "SubscriptionFeatureQuota",
          "isUsageExceeded": false,
          "usagePercentage": 0
        },
        "liveTranscription": {
          "__typename": "SubscriptionFeatureQuota",
          "isUsageExceeded": false,
          "usagePercentage": 0
        }
      }
    }
  }
};

$done({ body: JSON.stringify(response) });