//app.js
var e = require("utils/core.js");
App({
  onLaunch: function () {
    /*var testdata = { "openId": "olILr0Ae-CL3d7aqVb8JK5x6UfS0", "openid": "olILr0Ae-CL3d7aqVb8JK5x6UfS0", "nickName": "\u68a7\u6850\u6811\u4e0b", "gender": 1, "language": "zh_CN", "city": "Zhabei", "province": "Shanghai", "country": "China", "avatarUrl": "https:\/\/wx.qlogo.cn\/mmopen\/vi_32\/Q0j4TwGTfTLUyYMakib59FpiaEVQPVJR8V5QUsDrib1LEGqTds1WJtzia7E7N5vKYnia5Wg2orB4ibDYyryKKVWgK8HA\/0", "watermark": { "timestamp": 1506007801, "appid": "wxf34ebd2edac122d7" }, "id": "2189", "uniacid": "8" };
    this.setCache("userinfo", testdata, 7200);*/
    var e = this.getCache("userinfo");
    ("" == e || e.needauth) && this.getUserInfo(function (e) { }, function (e, t) {
      var t = t ? 1 : 0,
        e = e || "";
      //页面重定向
      t && wx.redirectTo({
        url: "/pages/message/auth/index?close=" + t + "&text=" + e
      })
    })
  },
  requirejs: function (e) {
    return require("utils/" + e + ".js")
  },
  getCache: function (e, t) {
    var i = +new Date / 1000,
      n = "";
    i = parseInt(i);
    try {
      n = wx.getStorageSync(e + this.globalData.appid),
        n.expire > i || 0 == n.expire ? n = n.value : (n = "", this.removeCache(e))
    } catch (e) {
      n = void 0 === t ? "" : t
    }
    return n = n || ""
  },
  setCache: function (e, t, i) {
    var n = +new Date / 1000,
      a = true,
      o = {
        expire: i ? n + parseInt(i) : 0,
        value: t
      };
    try {
      wx.setStorageSync(e + this.globalData.appid, o)
    } catch (e) {
      a = false
    }
    return a
  },
  removeCache: function (e) {
    var t = true;
    try {
      wx.removeStorageSync(e + this.globalData.appid)
    } catch (e) {
      t = false
    }
    return t
  },
  getUserInfo: function (t, i) {
    var n = this,
      a = n.getCache("userinfo");
    if (a && !a.needauth)
      return void (t && "function" == typeof t && t(a));
    wx.login({
      success: function (o) {
        //console.info('获取code', o.code)
        if (!o.code)
          return void e.alert("获取用户登录态失败:" + o.errMsg);
        e.post("wxapp/login", {
          code: o.code
        }, function (o) {
          return o.error ? void e.alert("获取用户登录态失败:" + o.message) : o.isclose && i && "function" == typeof i ? void i(o.closetext, true) : void wx.getUserInfo({
            success: function (i) {
              a = i.userInfo,
                e.get("wxapp/auth", {
                  data: i.encryptedData,
                  iv: i.iv,
                  sessionKey: o.session_key
                }, function (e) {
                  //console.info('获取openid', e.openId)
                  i.userInfo.openid = e.openId,
                    i.userInfo.id = e.id,
                    i.userInfo.uniacid = e.uniacid,
                    i.needauth = 0,
                    n.setCache("userinfo", i.userInfo, 7200),
                    t && "function" == typeof t && t(a)
                })
            },
            fail: function () {
              e.get("wxapp/check", {
                openid: o.openid
              }, function (e) {
                e.needauth = 1,
                  n.setCache("userinfo", e, 7200),
                  t && "function" == typeof t && t(a)
              })
            }
          })
        })
      },
      fail: function () {
        e.alert("获取用户信息失败!")
      }
    })
  },
  getSet: function () {
    var t = this;
    "" == t.getCache("sysset") && setTimeout(function () {
      var i = t.getCache("cacheset");
      e.get("cacheset", {
        version: i.version
      }, function (e) {
        e.update && t.setCache("cacheset", e.data),
          t.setCache("sysset", e.sysset, 7200)
      })
    }, 10)
  },
  url: function (e) {
    e = e || {};
    var t = {},
      i = "",
      n = "",
      a = this.getCache("usermid");
    i = e.mid || "",
      n = e.merchid || "",
      "" != a ? ("" != a.mid && void 0 !== a.mid || (t.mid = i), "" != a.merchid && void 0 !== a.merchid || (t.merchid = n)) : (t.mid = i, t.merchid = n),
      this.setCache("usermid", t, 7200)
  },
  globalData: {
    appid: "wx805a2f77ee5042fb",
    //api: "https://dmcj.zipimall.com/app/fy_lesson_api.php?i=8",
    api:"http://192.168.1.100:81/public_html/app/fy_lesson_api.php?i=8",
    approot: "https://dmcj.zipimall.com/addons/fy_lesson/",
    userInfo: null
  }
})