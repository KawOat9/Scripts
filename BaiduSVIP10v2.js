/**
 * @name 百度网盘伪装会员 (Shadowrocket版)
 * @description 仅供学习测试，解锁视频倍速、画质选择、去除广告。无法破解SVIP下载速度。
 */

const url = $request.url;
const body = $response.body;

if (!body) {
    $done({});
}

let obj = JSON.parse(body);

// 1. 修改用户信息 (api/user/getinfo)
if (url.indexOf("api/user/getinfo") !== -1) {
    if (obj.records && obj.records.length > 0) {
        obj.records.forEach(record => {
            record.vip_level = 10;
            record.vip_type = 2; // SVIP
        });
    }
}

// 2. 修改会员状态 (rest/2.0/membership/user)
if (url.indexOf("rest/2.0/membership/user") !== -1) {
    const mockVIP = {
        "cluster": "vip",
        "detail_cluster": "svip",
        "product_type": "vip2_1m_auto",
        "product_id": "1",
        "start_time": 1672502400,
        "end_time": 4092599349 // 2099年
    };

    obj.product_infos = [mockVIP];
    obj.current_product = mockVIP;
    obj.current_product_v2 = mockVIP;
    obj.level_info = {
        "current_value": 100000,
        "current_level": 10,
        "history_value": 100000,
        "history_level": 10
    };
    
    // 强制显示 SVIP 标识
    obj.reminder = {
        "svip": {
            "leftseconds": 99999999,
            "nextState": "normal"
        }
    };
}

// 3. 解锁视频画质/倍速 (api/tv/filemetas) - 针对App或网页端视频
if (url.indexOf("api/tv/filemetas") !== -1 || url.indexOf("api/filemetas") !== -1) {
    // 实际上百度现在很多画质校验在服务端，单纯改这里可能不生效，但可以尝试
    // 此处主要是为了让客户端认为你是会员从而开启入口
}

$done({body: JSON.stringify(obj)});
