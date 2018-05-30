var t = getApp(),
  e = t.requirejs("core"),
  i = t.requirejs("foxui");
Page({
  data: {
    icons: t.requirejs("icons"),
    success: false,
    successData: {},
    list: {}

  },
  onLoad: function (e) {
    this.setData({
      options: e
    }),
      t.url(e)
  },
  onShow: function () {
    this.get_list()
  },
  get_list: function () {
    var t = this;
    e.get("groups/pay", t.data.options, function (i) {
      if (50018 == i.error)
        return void wx.navigateTo({
          url: "/pages/order/details/index?id=" + t.data.options.id
        });
      !i.wechat.success && "0.00" != i.order.price && i.wechat.payinfo && e.alert(i.wechat.payinfo.message + "\n不能使用微信支付!"),
        console.log('支付信息返回 ', i)
        t.setData({
          list: i,
          show: true
        })
    })
  },
  pay: function (t) {
    console.log('支付信息打印 ', t)
    var i = e.pdata(t).type,
      o = this,
      a = this.data.list.wechat;
    "wechat" == i ? e.pay(a.payinfo, function (t) {
      "requestPayment:ok" == t.errMsg && o.complete(i)
    }) : "credit" == i ? e.confirm("确认要支付吗?", function () {
      o.complete(i)
    }, function () { }) : "cash" == i ? e.confirm("确认要使用货到付款吗?", function () {
      o.complete(i)
    }, function () { }) : o.complete(i)
  },
  complete: function (t) {
    var o = this;
    console.log('支付后打印 1', t)
    e.post("groups/pay/complete", {
      orderid: this.data.list.order.id,
      type: t,
      teamid: this.data.list.teamid,
      isteam: this.data.list.isteam,
      ordersn: this.data.list.ordersn
    }, function (t) {
      if (0 == t.error){
        return wx.setNavigationBarTitle({
          title: "支付成功"
        }), void o.setData({
          success: true,
          successData: t
        });
      }
      console.log('支付后打印 2', t)
      i.toast(o, t.message)
    }, true, true)
  },
  shop: function (t) {
    0 == e.pdata(t).id ? this.setData({
      shop: 1
    }) : this.setData({
      shop: 0
    })
  },
  phone: function (t) {
    e.phone(t)
  }
})