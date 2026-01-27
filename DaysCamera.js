/*
 * Days Camera VIP Unlock (Blind Attempt)
 * App: https://apps.apple.com/app/id1476205977
 * Note: Override encrypted response with plain JSON
 */

const url = $request.url;
let body = $response.body;

// ฟังก์ชันสำหรับจำลองข้อมูล VIP
const vipData = {
    "isVip": true,
    "is_vip": true,
    "vipType": 1,
    "vip_type": 1,
    "level": 1,
    "status": 1,
    "expireTime": 4102415999000, // ปี 2099
    "expire_time": 4102415999000,
    "vipEndTime": 4102415999000,
    "endTime": 4102415999000
};

// ตรวจสอบ URL และยัดข้อมูล
if (url.indexOf("member/vip/info") !== -1) {
    // จำลอง Structure ที่น่าจะเป็นไปได้
    const fakeBody = {
        "code": 200,
        "msg": "success",
        "result": vipData, // บางทีมันเอาข้อมูลไว้ใน result
        "data": vipData,   // หรือบางทีไว้ใน data
        "success": true
    };
    
    $done({ body: JSON.stringify(fakeBody) });
} 
// แถม: ดักจับ Config เพื่อปิดโฆษณา (ถ้ามี)
else if (url.indexOf("ad/list") !== -1 || url.indexOf("advert") !== -1) {
    $done({ body: JSON.stringify({ "code": 200, "data": [], "result": [] }) });
} 
else {
    $done({});
}
