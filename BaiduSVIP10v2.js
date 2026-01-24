/***************


^https:\/\/pan\.baidu\.com\/api\/streaming\?app_id=\d+&type=M3U8_HQ_1080 url script-request-header https://raw.githubusercontent.com/KawOat9/Scripts/main/BaiduSVIP10v2.js
^https:\/\/pan\.baidu\.com\/rest\/.*\/membership\/user url script-response-body https://raw.githubusercontent.com/KawOat9/Scripts/main/BaiduSVIP10v2.js


hostname = pan.baidu.com, afd.baidu.com


****************/

const version = "V1.0.2";
function modifyURLParam(p, p2, p3) {
  const v12 = new URL(p);
  const v13 = v12.searchParams.get(p2);
  const v14 = /^M3U8.*\d$/;
  if (v14.test(v13)) {
    v12.searchParams.set(p2, p3);
  }
  return v12.toString();
}
if ($request.url.indexOf("api/getsyscfg") != -1) {
  var obj = JSON.parse($response.body);
  const propertiesToDelete = ["switch_config_area", "advertise_", "splash_", "ad_", "ai_", "my_person_service", "home_card_area", "push_active_area", "freeFlow_area", "app_launch_area", "active_sigin_text", "commerce_", "magictrick", "personal_activity_area", "bdpan_feed_home_config_area_v12"];
  for (const key in obj) {
    if (propertiesToDelete.some(p8 => key.includes(p8))) {
      if (obj[key]) {
        obj[key].cfg_list = [];
      }
    }
  }
  if (obj.bottom_area?.cfg_list.length > 0) {
    obj.bottom_area.cfg_list = obj.bottom_area.cfg_list.filter(p9 => p9.node_key !== "home_page");
  }
  if (obj.my_settings?.cfg_list.length > 0) {
    obj.my_settings.cfg_list = obj.my_settings.cfg_list.filter(p10 => p10.cfg_category_key == "setting_service_area" || p10.cfg_category_key == "setting_function_area");
  }
  $done({
    body: JSON.stringify(obj)
  });
} else if ($request.url.indexOf("afd/entry") != -1) {
  var obj = JSON.parse($response.body);
  obj.res.ad &&= [];
  obj.res.splash &&= {};
  $done({
    body: JSON.stringify(obj)
  });
} else if ($request.url.indexOf("api/quota") != -1) {
  var obj = JSON.parse($response.body);
  obj.expire = false;
   if(obj.quota) obj.quota = 32985348833280; // 30TB
   if(obj.total) obj.total = 32985348833280;
  $done({
    body: JSON.stringify(obj)
  });
} else if ($request.url.indexOf("feed/cardinfos") != -1) {
  var obj = JSON.parse($response.body);
  if (obj.data?.cards.length > 0) {
    obj.data.cards = obj.data.cards.filter(p11 => p11.source == "product" || p11.source == "recent");
  }
  $done({
    body: JSON.stringify(obj)
  });
} else if ($request.url.indexOf("api/streaming") != -1) {
  const modifiedURL = modifyURLParam($request.url, "type", "M3U8_AUTO_1080");
  const vO = {
    url: modifiedURL
  };
  $done(vO);
} else if ($request.url.indexOf("membership/user") != -1) {
  var obj = JSON.parse($response.body);
  if (obj.data?.benefit_list) {
    delete obj.data.benefit_list;
    delete obj.data.benefit_totalnum;
  }
  if (obj.product_infos) {
    obj = {
      product_infos: [{
        product_id: "5210897752128663390",
        end_time: 4102415999,
        buy_time: "1384234467",
        cluster: "offlinedl",
        status: "0",
        start_time: 1384234467,
        function_num: 2,
        buy_description: "离线下载套餐(永久)",
        product_description: "离线下载套餐(永久)",
        detail_cluster: "offlinedl",
        product_name: "offlinedl_permanent"
      }, {
        cur_svip_type: "month",
        product_name: "svip2_nd",
        product_description: "",
        function_num: 0,
        start_time: 1688356160,
        buy_description: "",
        buy_time: 0,
        product_id: "",
        auto_upgrade_to_svip: 0,
        end_time: 4102415999,
        cluster: "vip",
        detail_cluster: "svip",
        status: 0
      }, {
        product_name: "contentvip_nd",
        product_description: "",
        function_num: 0,
        start_time: 1688356160,
        buy_description: "",
        buy_time: 0,
        product_id: "",
        auto_upgrade_to_svip: 0,
        end_time: 4102415999,
        cluster: "contentvip",
        detail_cluster: "contentvip",
        status: 0
      }],
      center_skip_config: {
        action_type: 0,
        action_url: "https://pan.baidu.com/buy/center?tag=8"
      },
      last_privilege_card_v2: {},
      current_privilege_card: [],
      current_product_v2: {
        product_id: "12187135090581539740",
        detail_cluster: "svip",
        cluster: "vip",
        product_type: "vip2_1y_auto"
      },
      request_id: 269895149694452300,
      current_privilege_card_v2: {},
      up_product_infos: [],
      last_privilege_card: [],
      level_info: {
        history_value: 3470,
        current_level: 9,
        last_manual_collection_time: 0,
        current_value: 970,
        history_level: 9,
        v10_id: ""
      },
      user_tag: "{\\\"has_buy_record\\\":1,\\\"has_buy_vip_svip_record\\\":1,\\\"last_buy_record_creat_time\\\":1688356106,\\\"is_vip\\\":0,\\\"is_svip\\\":1,\\\"last_vip_type\\\":1,\\\"last_vip_svip_end_time\\\":4102415999,\\\"is_svip_sign\\\":0,\\\"notice_user_type\\\":2,\\\"notice_user_status\\\":3,\\\"is_first_act\\\":0,\\\"is_first_charge\\\":0}",
      currenttime: 1690687707,
      previous_product: [],
      current_mvip_v2: {},
      current_product: {
        product_id: "12187135090581539740",
        detail_cluster: "svip",
        cluster: "vip",
        product_type: "vip2_1y_auto"
      },
      reminder: {
        reminderWithContent: {
          title: "已拥有超级会员",
          notice: "5T大空间、极速下载等特权已拥有~"
        },
        advertiseContent: {
          url: "https://yun.baidu.com/buy/center?tag=8&from=reminderpush1",
          title: "您的超级会员将于2099-12-31到期",
          notice: "5T大空间、极速下载等特权已拥有~"
        },
        svip: {
          leftseconds: 390692,
          nextState: "normal"
        }
      },
      current_mvip: [],
      previous_product_v2: {}
    };
  } else {
    if (obj.identity_icon) {
      obj = {
        vip: {
          emotional_tips_back: {
            first: "",
            daily: ["一起走过的每一天，我给了陪伴，而你给了我成长。"]
          },
          emotional_tip_front: "陪你走过的每一天",
          guide_tip: ["墨鱼提醒：已享会员权限！"],
          expired_tip: "不再享有视频备份、在线解压等特权",
          expire_remind_tip: "将不再享有视频备份、在线解压等特权",
          status: 0
        },
        vipv2: {
          status: 1
        },
        identity_icon: {
          vip: "https://internal-amis-res.cdn.bcebos.com/images/2019-8/1566452237582/78b88bf113b7.png",
          common: "https://internal-amis-res.cdn.bcebos.com/images/2019-8/1566452539056/bf72cf66fae1.png",
          svip: "https://internal-amis-res.cdn.bcebos.com/images/2019-8/1566452115696/38c1d743bfe9.png",
          contentvip: ""
        },
        request_id: 270055727479044860,
        svip: {
          emotional_tips_back: {
            first: "很高兴你在x年x月x日成为超级会员，愿美好时光与你相伴。",
            daily: ["据说超级会员，法力无边"]
          },
          expire_remind_tip: "将不再享有极速下载、5T空间等特权",
          emotional_tip_front: "陪你走过的每一天",
          identity_icon_list: ["https://internal-amis-res.cdn.bcebos.com/images/2019-8/1566452115696/38c1d743bfe9.png", ""],
          status: 2,
          expired_tip: "不再享有极速下载、5T空间等特权",
          guide_tip: ["超级会员尊享5T空间和极速下载特权"],
          is_sign_user: false
        },
        error_code: 0
      };
    } else {
      if (obj.tips_data_list) {
        obj = {
          tips_data_list: [],
          status_data: "超级会员至：2099-12-31",
          guide_data: {
            action_url: "",
            title: "超级会员SVIP",
            title_action_url: "",
            content: "已拥有极速下载+视频倍速等54项特权",
            button: {
              text: "等级提升",
              action_url: "https://t.me/ddgksf2021"
            }
          },
          user_status: 2,
          tips_data: {},
          user_type: "svip",
          request_id: 270614190566302800,
          level_info: {
            last_manual_collection_time: 0,
            current_max_points: 500,
            current_value: 1490,
            history_level: 3,
            accumulated_uncollected_points: 0,
            v10_id: "",
            daily_value: 0,
            accumulated_day: 0,
            history_value: 3470,
            current_level: 2,
            accumulated_lost_points: 0,
            default_daily_value: 5
          },
          v10_guide: {
            get_next_value_gap: true,
            tips: "升级还需要1510成长值，可享更多权益",
            button: {
              text: "立即加速",
              action_url: "https://t.me/ddgksf2021"
            },
            ab_test: false
          },
          status_data_arr: ["超级会员至：2099-12-31"],
          new_guide_data: {
            action_url: "",
            title: "SVIP V2",
            title_action_url: "",
            button: {
              text: "等级提升",
              action_url: "https://t.me/ddgksf2021"
            },
            sub_card_list: [{
              content: "已解锁倍速超清权益",
              icon_url: "https://staticsns.cdn.bcebos.com/amis/2022-3/1646383463592/%E5%8A%A0%E9%80%9F%E5%8D%87%E7%BA%A7.png",
              action_url: "https://t.me/ddgksf2021"
            }]
          }
        };
      } else if (obj.recommend_list) {
        obj = {
          error_code: 0
        };
      }
    }
  }
  $done({body: JSON.stringify(obj)});
} else {
  $done({});
}