//index.js
var t = getApp(),
  a = t.requirejs("core"),
  e = (t.requirejs("icons"), t.requirejs("wxParse/wxParse"));
Page({
  data: {
    countDownDay: 0,
    countDownHour: 0,
    countDownMinute: 0,
    countDownSecond: 0,
    route: "home",
    icons: t.requirejs("icons"),
    shop: {},
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 500,
    circular: true,
    storeRecommand: [],
    total: 0,
    page: 1,
    loaded: false,
    loading: true,
    indicatorDotsHot: false,
    autoplayHot: true,
    intervalHot: 5000,
    durationHOt: 1000,
    circularHot: true,
    hotimg: "/static/images/hotdot.jpg",
    notification: "/static/images/notification.png",
    content2: [
    ],

  },
  getShop: function () {
    var t = this;
    a.get("shop/get_shopindex", {}, function (a) {
     // e.wxParse("wxParseData", "html", a.copyright, t, "5"),
       console.log(a)
        t.setData({
          shop: a,
        })
    })
    
  },
  onReachBottom: function () {
    this.data.loaded || this.data.storeRecommand.length == this.data.total || this.getRecommand()
  },
  getRecommand: function () {
    var t = this;
    t.setData({
      loading: true
    }),
      a.get("shop/get_recommand", {
        page: t.data.page
      }, function (a) {
        var e = {
          loading: false,
          total: a.total
        };
        t.setData({
          loading: false,
          total: a.total,
          show: true
        }),
          a.list || (a.list = []),
          a.list.length > 0 && (t.setData({
            storeRecommand: t.data.storeRecommand.concat(a.list),
            page: a.page + 1
          }), a.list.length < a.pagesize && (e.loaded = true))
        console.log(t.data.storeRecommand)
      })
  },
  scanCode: function () {
    var that = this
    wx.scanCode({
      success: function (res) {
        that.setData({
          result: res.result
        })
      },
      fail: function (res) {
      }
    })
  },
  onLoad: function (a) {
    console.log(t.url(a))
   // t.url(a)
  },
  onShow: function () {
    var a = t.getCache("sysset");
    wx.setNavigationBarTitle({
      title: a.shopname || "商城首页"
    }),
      this.getShop(),
      this.getRecommand()
  },
  onShareAppMessage: function () {
    return a.onShareAppMessage()
  },
  onReady: function () {
    var t = this;
    // var mycars = a
    
    a.get("shop/get_shopindex", {}, function (a) {
      var aa = a.sorts
      console.log('结束时间', aa)
      for (var x in aa) {
        if (aa[x].type == 'seckill') {
          // console.log('秒杀', aa[x])
          var endtime = aa[x].data.endtime
          console.log('秒杀结束', endtime)
          var totalSecond = endtime - Date.parse(new Date()) / 1000;

          var interval = setInterval(function () {
            // 秒数  
            var second = totalSecond;

            // 天数位  
            var day = Math.floor(second / 3600 / 24);
            var dayStr = day.toString();
            if (dayStr.length == 1) dayStr = '0' + dayStr;

            // 小时位  
            var hr = Math.floor((second - day * 3600 * 24) / 3600);
            var hrStr = hr.toString();
            if (hrStr.length == 1) hrStr = '0' + hrStr;

            // 分钟位  
            var min = Math.floor((second - day * 3600 * 24 - hr * 3600) / 60);
            var minStr = min.toString();
            if (minStr.length == 1) minStr = '0' + minStr;

            // 秒位  
            var sec = second - day * 3600 * 24 - hr * 3600 - min * 60;
            var secStr = sec.toString();
            if (secStr.length == 1) secStr = '0' + secStr;

            t.setData({
              countDownDay: dayStr,
              countDownHour: hrStr,
              countDownMinute: minStr,
              countDownSecond: secStr,
            });
            totalSecond--;
            if (totalSecond < 0) {
              clearInterval(interval);
              wx.showToast({
                // title: '活动开始',
              });
              t.setData({
                countDownDay: '00',
                countDownHour: '00',
                countDownMinute: '00',
                countDownSecond: '00',
              });
            }
          }.bind(this), 1000);

        }
      }
    })
  },
  imagesHeight: function (t) {
    var a = t.detail.width,
      e = t.detail.height,
      o = t.target.dataset.type,
      i = {},
      s = this;
    wx.getSystemInfo({
      success: function (t) {
        i[o] = t.windowWidth / a * e,
          (!s.data[o] || s.data[o] && i[o] < s.data[o]) && s.setData(i)
      }
    })
  }
})