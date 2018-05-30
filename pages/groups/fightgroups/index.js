var t = getApp(),
  e = t.requirejs("core");
Page({

  /*** 页面的初始数据*/
  data: {
    teams: [
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
    ],
    goodsdata: {
      id: '1',
      thumb_url: '',
      title: '潘思',
      price: '11',
      groupnum: '22',
      groupsprice: '33',
      isindex: '1',
      goodsnum: '44',
      units: '55',
      sales: '66',
      description: '描述'
    }
  },
  /*** 生命周期函数--监听页面加载*/
  onLoad: function (options) {
    var that = this;
    that.getGoodsData(options.id);
  },
  getGoodsData: function (gid) {
    var t = this;
    var i = {
      id: gid
    };
    e.get("groups/goods/fightGroups", i, function (e) {
      if (7e4 == e.error)
        return void wx.redirectTo({
          url: "/pages/commission/register/index"
        });
      console.log('参团页面返回信息', e)
      t.setData({ goodsdata: e.goods })
      t.setData({ teams: e.teams })

    })
  },

  toCanGroups: function (event) {
    console.log('参团链接', event.target.dataset)
    return void wx.redirectTo({
      url: "/pages/groups/orders/confirm?id=" + event.target.dataset.id + "&teamid=" + event.target.dataset.teamid +"&type=groups"
    });
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
  onPullDownRefresh: function (){
  },
  /*** 页面上拉触底事件的处理函数*/
  onReachBottom: function () {
  },
  /*** 用户点击右上角分享*/
  onShareAppMessage: function () {
  }
})