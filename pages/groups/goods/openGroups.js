var t = getApp(),
  e = t.requirejs("core");
Page({
  info1: "",
  data: {
    groupsoods: [
      {
        id: '1',
        avatar: "/static/images/football.png",
        nickname: '潘思',
        hour: '11',
        minite: '22',
        second: '33',
        num: '1',
        goodid: '44',
        teamid: '55'
      },
      {
        id: '21',
        avatar: "/static/images/football.png",
        nickname: '苏凯',
        hour: '11',
        minite: '22',
        second: '33',
        num: '1',
        goodid: '44',
        teamid: '55'
      }
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    //console.log('商品ID ', options.id)
    that.getGoodsData(options.id);
  },
  getGoodsData: function (gid) {
    var t = this;
    var i = {
      id: gid
    };
    e.get("groups/goods/openGroups", i, function (e) {
      if (7e4 == e.error)
        return void wx.redirectTo({
          url: "/pages/commission/register/index"
        });
      console.log('拼团操作商品信息', e)
      t.setData({ goodsdata: e.goods })
      t.setData({ groupsoods: e.teams })

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