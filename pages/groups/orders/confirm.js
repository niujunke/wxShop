var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
  return typeof t
}
  : function (t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  },
  e = getApp(),
  a = e.requirejs("core"),
  i = e.requirejs("foxui"),
  d = e.requirejs("biz/diyform"),
  r = e.requirejs("jquery");
Page({
  data: {
    icons: e.requirejs("icons"),
    list: {},
    goodslist: {a:121},
    goodsdata: {},
    groupsset: {}, //拼团基础设置
    data: {
      dispatchtype: 0
    },
    showPicker: false,
    pvalOld: [0, 0, 0],
    pval: [0, 0, 0],
    areas: [],
    noArea: true,
    isdeduct:0,  //积分抵扣
    credit: 0,  //积分抵扣
    creditmoney: 0,  //余额抵扣
    creditdeduct: {},
    member: {},
    credit: {},
    message: '',  //买家留言
    id: '',  //页面商品提交信息
    teamid: '',  //页面商品提交信息
    goodstype: '',  //页面商品提交信息
    heads: ''  //页面商品提交信息
  },
  onLoad: function (t) {
    var i = this,
      d = {};
    console.log('页面参数 ', t)
    this.setData({
      options: t,
      id: t.id,
      teamid: t.teamid,
      goodstype: t.type,
      heads: t.heads,
      areas: e.getCache("cacheset").areas
    }),
      e.url(t),

      //调试数据 start
      // a.get("order/create", { mid:2189,id:205,optionid:409,total:1}, function (t) {
     a.get("groups/orders/confirm", i.data.options, function (t) {
       if(t.error !=0){
         return void a.alert(t.message);
         wx.redirectTo({
           url: '/pages/groups'
         })
       }
      i.setData({
        show: true,
        list: t.list,
        groupsset: t.set,
        goodsdata: t.list.goods,
        creditdeduct: t.list.creditdeduct,
        member: t.list.member,
        credit: t.list.credit,
        price: t.list.price,
        
      })
      
      //console.log('打印list ', this.data.goodsdata)
      //调试数据 end

        /*0 == t.error ? (r.each(t.goods, function (t, e) {
          r.each(e.goods, function (t, e) {
            d[e.id] = e
          })
        }), i.setData({
          list: t,
          show: true,
          goodslist: d,
          diyform: {
            f_data: t.f_data,
            fields: t.fields
          }
        }), e.setCache("goodsInfo", {
          goodslist: d,
          merchs: t.merchs
        }, 1800)) : (a.toast(t.message, "loading"), setTimeout(function () {
          wx.navigateBack()
        }, 1e3))*/
        
      }),
      e.setCache("coupon", "")
  },
  onShow: function () {
    var i = this,
      d = e.getCache("orderAddress"),
      s = e.getCache("orderShop");
    d && (this.setData({
      "list.address": d
    }), i.caculate(i.data.list)),
      s && this.setData({
        "list.carrierInfo": s
      });
    var o = e.getCache("coupon");
    "object" == (void 0 === o ? "undefined" : t(o)) && 0 != o.id ? (this.setData({
      "data.couponid": o.id,
      "data.couponname": o.name
    }), a.post("order/create/getcouponprice", {
      couponid: o.id,
      goods: this.data.goodslist,
      goodsprice: this.data.list.goodsprice,
      discountprice: this.data.list.discountprice,
      isdiscountprice: this.data.list.isdiscountprice
    }, function (t) {
      0 == t.error ? (delete t.$goodsarr, i.setData({
        coupon: t
      }), i.caculate(i.data.list)) : a.alert(t.message)
    }, true)) : (this.setData({
      "data.couponid": 0,
      "data.couponname": null,
      coupon: null
    }), r.isEmptyObject(i.data.list) || i.caculate(i.data.list))
  },
  toggle: function (t) {
    var e = a.pdata(t),
      i = e.id,
      d = e.type,
      r = {};
    r[d] = 0 == i || void 0 === i ? 1 : 0,
      this.setData(r)
  },
  phone: function (t) {
    a.phone(t)
  },
  dispatchtype: function (t) {
    var e = a.data(t).type;
    this.setData({
      "data.dispatchtype": e
    }),
      this.caculate(this.data.list)
  },
  /*caculate: function (t) {
    var e = this;
    a.post("order/create/caculate", {
      goods: this.data.goodslist,
      dflag: this.data.data.dispatchtype,
      addressid: this.data.list.address ? this.data.list.address.id : 0
    }, function (a) {
      t.dispatch_price = a.price,
        t.enoughdeduct = a.deductenough_money,
        t.enoughmoney = a.deductenough_enough,
        t.taskdiscountprice = a.taskdiscountprice,
        t.discountprice = a.discountprice,
        t.isdiscountprice = a.isdiscountprice,
        e.data.data.deduct && (a.realprice -= a.deductcredit),
        e.data.data.deduct2 && (a.realprice -= a.deductcredit2),
        e.data.coupon && void 0 !== e.data.coupon.deductprice && (a.realprice -= e.data.coupon.deductprice),
        t.realprice = a.realprice,
        e.setData({
          list: t
        })
    }, true)
  }, */
  submit: function () {
    var t = this.data,
      e = this,
      i = this.data.diyform;

    if (!t.submit) {
      //if (d.verify(this, i)) {
        t.list.carrierInfo = t.list.carrierInfo || {};
        var s = {
          aid: t.list.address ? t.list.address.id : 0,
          message: t.message, 
          realname: t.list.member.realname,
          mobile: t.list.member.mobile,
          id: t.id,
          teamid: t.teamid,
          goodstype: t.goodstype,
          heads: t.heads
        };
        
        console.log('数据提交参数 ', t.list.isvirtual)
        
        if (1 == t.goodsdata.dispatchtype || 1 == t.goodsdata.isverify) {
          if ("" == r.trim(t.list.member.realname))
            return void a.alert("请填写联系人!");
          if ("" == r.trim(t.list.member.mobile))
            return void a.alert("请填写联系方式!");
        } else if (!s.aid){
          return void a.alert("地址没有选择!");
        }
        e.setData({
          submit: true
        }),
          a.post("groups/orders/confirm", s, function (t) {
            if (e.setData({
              submit: false
            }), 0 != t.error)
              return void a.alert(t.message);
            console.log('提交返回 ', t)
            wx.redirectTo({
              url: "/pages/groups/pay/index?orderid=" + t.orderid+'&teamid='+t.teamid
            })
          }, true)
      //}
    }
  },
  /*submitxxx: function () {
    var t = this.data,
      e = this,
      i = this.data.diyform;
    if (!t.submit) {
      if (d.verify(this, i)) {
        t.list.carrierInfo = t.list.carrierInfo || {};
        var s = {
          id: t.options.id ? t.options.id : 0,
          goods: t.goodslist,
          giftid: "",
          gdid: t.options.gdid,
          dispatchtype: t.data.dispatchtype,
          fromcart: t.list.fromcart,
          carrierid: 1 == t.data.dispatchtype && t.list.carrierInfo ? t.list.carrierInfo.id : 0,
          addressid: t.list.address ? t.list.address.id : 0,
          carriers: 1 == t.data.dispatchtype || t.list.isvirtual || t.list.isverify ? {
            carrier_realname: t.list.member.realname,
            carrier_mobile: t.list.member.mobile,
            realname: t.list.carrierInfo.realname,
            mobile: t.list.carrierInfo.mobile,
            storename: t.list.carrierInfo.storename,
            address: t.list.carrierInfo.address
          }
            : "",
          remark: t.data.remark,
          deduct: t.data.deduct,
          deduct2: t.data.deduct2,
          couponid: t.data.couponid,
          invoicename: t.list.invoicename,
          submit: true,
          packageid: t.list.packageid,
          diydata: t.diyform.f_data
        };
        if (1 == t.data.dispatchtype || t.list.isvirtual || t.list.isverify) {
          if ("" == r.trim(t.list.member.realname))
            return void a.alert("请填写联系人!");
          if ("" == r.trim(t.list.member.mobile))
            return void a.alert("请填写联系方式!");
          s.addressid = 0
        } else if (!s.addressid)
          return void a.alert("地址没有选择!");
        e.setData({
          submit: true
        }),
          a.post("order/create/submit", s, function (t) {
            if (e.setData({
              submit: false
            }), 0 != t.error)
              return void a.alert(t.message);
            wx.navigateTo({
              url: "/pages/order/pay/index?id=" + t.orderid
            })
          }, true)
      }
    }
  },*/
  dataChange: function (t) {
    var e = this.data.data,
      a = this.data.list;
    switch (t.target.id) {
      case "remark":
        e.message = t.detail.value;
        break;
      case "deduct":
        e.deduct = t.detail.value,
          a.realprice += e.deduct ? -a.deductmoney : a.deductmoney;
        break;
      case "deduct2":
        e.deduct2 = t.detail.value,
          a.realprice += e.deduct2 ? -a.deductcredit2 : a.deductcredit2
    }
    this.setData({
      data: e,
      list: a
    })
  },
  listChange: function (t) {
    var e = this.data.list;
    switch (t.target.id) {
      case "invoicename":
        e.invoicename = t.detail.value;
        break;
      case "realname":
        e.member.realname = t.detail.value;
        break;
      case "mobile":
        e.member.mobile = t.detail.value
    }
    this.setData({
      list: e
    })
  },
  url: function (t) {
    var e = a.pdata(t).url;
    wx.redirectTo({
      url: e
    })
  },
  onChange: function (t) {
    return d.onChange(this, t)
  },
  DiyFormHandler: function (t) {
    return d.DiyFormHandler(this, t)
  },
  selectArea: function (t) {
    return d.selectArea(this, t)
  },
  bindChange: function (t) {
    return d.bindChange(this, t)
  },
  onCancel: function (t) {
    return d.onCancel(this, t)
  },
  onConfirm: function (t) {
    return d.onConfirm(this, t)
  },
  getIndex: function (t, e) {
    return d.getIndex(t, e)
  }
})