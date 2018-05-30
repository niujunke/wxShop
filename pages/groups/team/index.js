var t = getApp(),
  e = t.requirejs("core");
Page({
  data: {
    winWidth: 0,
    winHeight: 0,
    openId: '',
    // tab切换  
    currentTab: 0,
    type: 0,
    con2: "",
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
          active: false
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
          active: true
        }
      ],
      "position": "bottom"
    },
    list1: [
      {
        ordersn: "32423435345",
        statusstr: "团购进行中",
        title: "名字",
        price: "50.00",
        total: "2",
        yunprice: "20",
        images: "/static/images/football.png",
        title: "测试",
        price: "55",
        total: "1"
      }
    ],
    list2: [
      {
        ordersn: "32423435345",
        statusstr: "团购进行中",
        title: "名字",
        price: "50.00",
        total: "2",
        yunprice: "20",
        images: "/static/images/football.png",
        title: "测试",
        price: "55",
        total: "1"
      }
    ],
    list3: [
      {
        ordersn: "32423435345",
        statusstr: "团购进行中",
        title: "名字",
        price: "50.00",
        total: "2",
        yunprice: "20",
        images: "/static/images/football.png",
        title: "测试",
        price: "55",
        total: "1"
      }
    ],
    list1Num:'',
    list2Num:'',
    list3Num:''
  },
  onLoad: function (e) {
    var that = this;
    that.getListData();

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
  getListData: function () {
    var t = this;
    var i = {};
    e.get("groups/team/getMyGroupslist", i, function (e) {
      if (7e4 == e.error)
        return void wx.redirectTo({
          url: "/pages/commission/register/index"
        });
      console.log('我的团', e)
      t.setData({ list1: e.list1, list2: e.list2, list3: e.list3 })
      t.setData({ list1Num: e.list1Num, list2Num: e.list2Num, list3Num: e.list3Num })
    })
  },
  /*** 点击tab切换 */
  swichNav: function (e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  }
})
