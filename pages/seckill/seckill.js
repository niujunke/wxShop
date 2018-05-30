var t = getApp(),
  e = t.requirejs("core");
var app = getApp();
Page({

  /*** 页面的初始数据*/
  data: {
    countDownDay: 0,
    countDownHour: 0,
    countDownMinute: 0,
    countDownSecond: 0,
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0,
    times: [
      { time: "16", status: "0"},
      { time: "21", status: "1" }
    ],
    goods: [
      { goodsid: "16", hasoption: "12", id: "1", marketprice: "12", percent: "0", price: "10", thumb: "/static/images/football.png", title: "苹果", total: "100"  },
      { goodsid: "12", hasoption: "0", id: "2", marketprice: "15", percent: "0", price: "8", thumb: "/static/images/football.png", title: "三星", total: "100" },
    ],
    roomid: '',
    timeid: '',
    taskid: '',
    type: 0
  },
  /*** 生命周期函数--监听页面加载*/
  onLoad: function () {
    var that = this;
    that.getCatedata();
    
    /*** 获取系统信息 */
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
  },
  getCatedata: function () {
    var t = this;
    e.get("seckill/index", {}, function (e) {
      console.log('所有时间',e)
      t.setData({ times: e.times, roomid: e.roomid, timeid: e.timeid, taskid: e.taskid  })
      //console.log('分类所有', e)
      //console.log('信息1', t.data.roomid + '--' + t.data.timeid + '--' + t.data.taskid)
      //t.setData({ times: e.times })
      //t.getGoodsdata();
      t.getTimesdata(e.downtime_cur);
    })
  },
  /*getGoodsdata: function () {
    var t = this;
    var roomid = t.data.roomid;
    var timeid = t.data.timeid;
    var taskid = t.data.taskid;
    //console.log('信息2', t.data.roomid + '--' + t.data.timeid + '--' + t.data.taskid)
    e.get("seckill/get_goods", { roomid:roomid, timeid:timeid, taskid:taskid}, function (e) {
      console.log('单个时间',e)
      //t.setData({ times: e.times, roomid: e.roomid, timeid: e.timeid, taskid: e.taskid })
      //console.log('商品', e.goods)
      t.setData({ goods: e.goods })
    })
  },*/
  getTimesdata: function (endtime) {
    var t = this;
    var endtime = endtime;
    
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
       
      
    
  },
  /*滑动tab切换*/
  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
  },
  /*** 点击tab切换*/
  swichNav: function (e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  /*** 生命周期函数--监听页面初次渲染完成*/
  onReady: function () {
    var t = this;
    // var mycars = a
    
  },

  /*** 生命周期函数--监听页面显示*/
  onShow: function () {
  },

  /*** 生命周期函数--监听页面隐藏*/
  onHide: function () {
  },

  /*** 生命周期函数--监听页面卸载*/
  onUnload: function () {
  
  },

  /*** 页面相关事件处理函数--监听用户下拉动作*/
  onPullDownRefresh: function () {
  },
  /*** 页面上拉触底事件的处理函数*/
  onReachBottom: function () {
  },

  /*** 用户点击右上角分享*/
  onShareAppMessage: function () {
  }

})