var t = getApp(),
  e = t.requirejs("core");
Page({
  /*** 页面的初始数据*/
  data: {
    indicatorDots: false,
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
    tabBar: {
      "color": "#9E9E9E",
      "selectedColor": "#f00",
      "backgroundColor": "#fff",
      "borderStyle": "#ccc",
      "num": 4,
      "list": [
        {
          "pagePath": "/pages/groups/index",
          "text": "拼团首页",
          "iconPath": "/static/images/shouyeaa.png",
          "selectedIconPath": "/static/images/shouyea.png",
          active: true
        },
        {
          "pagePath": "/pages/groups/category/index",
          "text": "活动列表",
          "iconPath": "/static/images/fenleia.png",
          "selectedIconPath": "/static/images/fenleiaa.png",
          active: false
        },
        {
          "pagePath": "/pages/groups/orders/index",
          "text": "我的订单",
          "iconPath": "/static/images/jiantoua.png",
          "selectedIconPath": "/static/images/jiantouaa.png",
          active: false
        },
        {
          "pagePath": "/pages/groups/team/index",
          "text": "我的团",
          "iconPath": "/static/images/renshana.png",
          "selectedIconPath": "/static/images/renshanaa.png",
          active: false
        }
      ],
      "position": "bottom"
    },
    background: [
      {
        images: "/static/images/jd3.jpg",
      },
      {
        images: "/static/images/jd3.jpg",
      }
    ],
    category: [
      {
        id: '1',
        thumb: "/static/images/football.png",
        name: '潘思',
      },
      {
        id: '2',
        thumb: "/static/images/football.png",
        name: '潘思2',
      }
    ],
    groupsoods: [
        {
        id: '1',
        thumb: "/static/images/football.png",
        title: '潘思',
        price: '11',
        groupnum: '22',
        groupsprice: '33',
        isindex: '1',
        goodsnum: '44',
        units: '55',
        sales: '66',
        description: '描述'
      },
        {
        id: '2',
        thumb: "/static/images/football.png",
        title: '潘思2',
        price: '111',
        groupnum: '22',
        groupsprice: '33',
        isindex: '1',
        goodsnum: '44',
        units: '55',
        sales: '66',
        description: '描述'
        },
    ]
  },
  /*** 生命周期函数--监听页面加载*/
  onLoad: function (options) {
    var that = this;
    that.getGroupsIndex();
  },
  getGroupsIndex: function () {
    var t = this;
    e.get("groups", {}, function (e) {
      if (7e4 == e.error)
        return void wx.redirectTo({
          url: "/pages/commission/register/index"
        });
      console.log('拼团首页', e)
      t.setData({ category: e.category })
      t.setData({ groupsoods: e.recgoods })
      t.setData({ background: e.advs })

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