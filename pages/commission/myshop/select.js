var t = getApp(),
  e = t.requirejs("core");
var switch1Checked=0;
var switch2Checked = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showView: false,
    defaultSize: 'mini',
    switch1Checked: 0,
    switch2Checked: 0,
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
    ]
  },
  switch2Change: function (e) {
    console.log('开启自选 发生 change 事件，携带值为', e.detail.value)
    var that = this;
   //选中状态
    that.setData({ switch1Checked: e.detail.value })
    //下方展开
    that.setData({ showView: (!that.data.showView) })
  },
  switch2Change1: function (e) {
    var that = this;
    console.log('开启分类 发生 change 事件，携带值为', e.detail.value)
    //选中开启分类
    that.setData({ switch2Checked: e.detail.value })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.getshop();
    // 默认自选 操作选项 显示隐藏
    showView: (options.showView == "true" ? true : false)
  },

  getshop: function () {
    var t = this;
    e.get("commission/select", {}, function (e) {
      if (7e4 == e.error)
        return void wx.redirectTo({
          url: "/pages/commission/register/index"
        });
        //t.setData(e)
      console.log('自选商品默认信息', e)
      console.log('开启自选', e.shop.selectgoods)
      //开启自选按钮
      if (e.shop.selectgoods == '0'){
        t.setData({ switch1Checked: false })
        t.setData({ showView: false})
      } else if (e.shop.selectgoods == '1'){
        t.setData({ switch1Checked: true })
        t.setData({ showView: true})
      }
      //开启分类按钮
      if (e.shop.selectcategory == '0') {
        t.setData({ switch2Checked: false })
      } else if (e.shop.selectcategory == '1') {
        t.setData({ switch2Checked: true })
      }
      t.setData({ shopgoods: e.shopgoods })
      
    })
  },
  submit: function (t) {
    console.log('修改提交', this.data.switch2Checked)
    switch1Checked= this.data.switch1Checked ? 1: 0;
    switch2Checked = this.data.switch2Checked ? 1 : 0;
    console.log('修改提交2', switch2Checked)
    var i = {
      selectgoods: switch1Checked,
      selectcategory: switch2Checked
    };
    e.post("commission/select", i, function (t) {
      console.log('修改返回', t)
      if (0 == t.error)
        return void wx.redirectTo({
          url: 1 == t.check ? "/pages/commission/myshop/select" : "/pages/commission/index"
        });
      e.alert(t.message)
    })
  },
  delshopgoods: function (event) {
    //console.log('删除商品', event.target.id)
    var that = this;
    var goodsid = event.target.id;
    var isChecked = 0;
    var i = {
      goodsid: goodsid,
      isChecked: isChecked
    };
    e.post("commission/chkshopgoodsids", i, function (t) {
      console.log('删除返回', t)
      that.setData({ shopgoods: t.shopgoods })
    })
    
  },
  toselgoogds: function () {
    wx.navigateTo({
      url: 'selgoods'
    })
  },
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