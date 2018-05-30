var t = getApp(),
  e = t.requirejs("core");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    product:'',
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
          active: true
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

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.getCatedata();
  },
  getCatedata: function () {
    var t = this;
    e.get("groups/category/get_list", {}, function (e) {
      if (7e4 == e.error)
        return void wx.redirectTo({
          url: "/pages/commission/register/index"
        });
      console.log('分类所有', e.list)
      t.setData({ product: e.list })
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

  }
})