var t = getApp(),
  e = t.requirejs("core");
const util = require('../../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    selected: true,
    selected1: false,
    id:"",
    detail:'',
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 500,
    circular: true,
    storeRecommand: [],
    indicatorDotsHot: false,
    autoplayHot: true,
    intervalHot: 5000,
    durationHOt: 1000,
    circularHot: true,
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0,
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var id = options.id
    that.setData({ id: id})
    // console.log(id)
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
    that.getDetailData();
    // var sjc = 1508232147;
    // console.log(util.formatTime(sjc, 'Y/M/D h:m:s'));
  },
  
  getDetailData: function () {
    var t = this;
    var teamid = t.data.id

    // console.log('队伍ID',teamid)
    e.get("/groups/team/detail", {teamid:teamid}, function (e) {
      //  var sjc= util.formatTime(e.orders[0].paytime, 'Y/M/D h:m:s')

      var aa = e.orders
      for (var x in aa) {
        console.log(x)
      }
    console.log('拼团成功',e)
    t.setData({ goods: e.goods })
    t.setData({ detail: e.orders })
    t.setData({ background:e.goods.thumb_url })
    
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
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
  },
  selected: function (e) {
    this.setData({
      selected1: false,
      selected: true
    })
  },
  selected1: function (e) {
    this.setData({
      selected: false,
      selected1: true
    })
  }
})