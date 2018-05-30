var t = getApp(),
  e = t.requirejs("core");

let animationShowHeight = 300;

Page({
  /*** 页面的初始数据*/
  info1: "",
  data: {
    result: '',
    // input默认是1  
    num: 1,
    // 使用data数据对象设置样式名  
    imageHeight: 0,
    imageWidth: 0,
    shop: {
      name: '潘思',
      logo: '',
      img: '',
      goodscount: '33'
    },
    shopgoods: [
      {
        id: '1',
        thumb: "/static/images/football.png",
        title: '潘思',
        marketprice: '88',
      }, {
        id: '2',
        thumb: "/static/images/football.png",
        title: 'shabi',
        marketprice: '88',
      }
    ],
    indexrecommands: [
      {
        id: '3',
        thumb: "/static/images/football.png",
        title: '潘思',
        marketprice: '88',
      }, {
        id: '4',
        thumb: "/static/images/football.png",
        title: 'shabi',
        marketprice: '88',
      }
    ],
    image2: "/static/images/gouwu.png",
    laba: '/static/images/laba.png',
    redian: '/static/images/redian.jpg',
    img: '/static/images/football.png',
    img2: '/static/images/volleyball-1.png',
    img3: '/static/images/basketball-1.png',
    img4: '/static/images/frisbee-1.png',
    img5: '/static/images/che.png',
    mid: '',
  },
  imageLoad: function (e) {
    this.setData({ imageHeight: e.detail.height, imageWidth: e.detail.width });
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this
    //访问别人店铺用的参数
    that.setData({
      mid: options.mid
    }) 
    that.getshop();
    /*** 获取系统信息 */
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    })
  },
  getshop: function () {
    var t = this;
    e.get("commission/getmyshop", {}, function (e) {
      if (7e4 == e.error)
        return void wx.redirectTo({
          url: "/pages/commission/register/index"
        });
      console.log('获取小店信息', e)
      //console.log('开启自选', e.shop.selectgoods)
      t.setData({ shop: e.shop })
      t.setData({ shopgoods: e.shopgoods })
      t.setData({ indexrecommands: e.indexrecommands })
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
  /*** 生命周期函数--监听页面初次渲染完成*/
  onReady: function () {
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