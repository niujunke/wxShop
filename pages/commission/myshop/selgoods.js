var t = getApp(),
  e = t.requirejs("core");

Page({
  data: {
    content2: [
      {
        id: 1,
        name: '分类1',
        goods: [
          {
            id: 1,
            thumb: "/static/images/football.png",
            title: '篮球1',
            marketprice: '11'
          },
          {id: 1,thumb: "",title: '篮球2',marketprice: '12'}
        ]
      },
      {id: 2,name: '分类2',goods: [{id: 21,thumb: "",title: '足球1',marketprice: '21'}
      ]
      }
    ],
    goods: [],
    curNav: 1,
    curIndex: 0
  },
  switch2Change: function (event) {
    //console.log('switch2 发生 change 事件，携带值为', event.detail.value)
    console.log('当前商品ID和展开状态', event.target.dataset.gid + '状态' + event.detail.value )
    var that = this;
    var goodsid = event.target.dataset.gid;
    var isChecked = event.detail.value ? 1 : 0;
    var i = {
      goodsid: goodsid,
      isChecked: isChecked
    };
    e.post("commission/chkshopgoodsids", i, function (t) {
      console.log('修改返回', t)
    })

  },
  onLoad: function () {
    var that = this
    that.get_category();

    

  },
  get_category: function () {
   
    var t = this;
    e.get("commission/getcategory", {}, function (e) {
      if (7e4 == e.error)
        return void wx.redirectTo({
          url: "/pages/commission/register/index"
        });
      t.setData({ content2: e.category })
      console.log('分类返回', e)

      var content = e.category[0]
      //选中 默认当前分类
      t.setData({
        curNav: content.id,
        goods: content.goods
      })

    })
  },
  //事件处理函数
  switchRightTab: function (event) {
    var t = this;
    var id = event.target.dataset.id
    var index = parseInt(event.target.dataset.index);
    

    e.get("commission/getcategory", {}, function (e) {
      if (7e4 == e.error)
        return void wx.redirectTo({
          url: "/pages/commission/register/index"
        });
      t.setData({ content2: e.category })

    })

    var goods = this.data.content2[index].goods
    this.setData({
      curNav: id,
      goods: goods
    })
  }

})