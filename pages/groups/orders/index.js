var t = getApp(),
  e = t.requirejs("core");
var app = getApp();
Page({
  data: {
    winWidth: 0,
    winHeight: 0,
    openId: '',
    // tab切换  
    currentTab: 0,
    type: 0,
    con2: "",
    con1:"",
    ordernull:true,
    orders: [
      {
      }
    ],
    con1: [

    ],
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
          active: true
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

  },
  onLoad: function (e) {
    var that = this;
    that.getGroupsIndex();
    /** 
     * 获取系统信息 
     */
    wx.getSystemInfo({

      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      },


    });

  },
  getGroupsIndex: function (status=0) {
    var t = this;
    e.get("groups/orders/get_list", {status:status}, function (e) {
      console.log('拼团订单', e.result.list)
      if (e.result.list.length==0){
        t.setData({ con1: e.result.list,ordernull:true })
      }else{
        t.setData({ con1: e.result.list, ordernull: false })
      }
      
    })
  },
  /** 
   * 点击tab切换 
   */
  swichNav: function (e) {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 200
    })

    var t = this;
    var status =   e.target.dataset.current
    if (t.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      t.setData({
        currentTab: e.target.dataset.current
      })
    }
    t.getGroupsIndex(status);

  },

  
})
