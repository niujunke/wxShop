
var t = getApp(),
 a = t.requirejs("core"),
 s = t.requirejs("wxParse/wxParse")

Page({
  data: {
    cate: "tray",
    page: 1,
    loading: false,
    loaded: false,
    list: [],
    approot: t.globalData.approot,
    detail: {
      price: "",
      password: "",
      leave_message: "",
      goods_id:''
    }

  },
  onLoad: function (t) {
    this.getRegulation()
    this.getType()
    
  },
  onShow(){
    this.setData({
      cate: 'tray'
    })
  },
  myTab: function (t) {
    var e = this,
      i = a.pdata(t).cate;
      console.log(i)
    e.setData({
      cate: i,
      page: 1
    })
    if(i=='my')
    {
      e.getList()
    }
      
  },
  getList()
  {
    var t=this
    a.get("transfer/transferList", {}, function (e) {
      var list = {
        goodsList: e.datas

      };
 
      for (var i = 0; i < list.goodsList.length;i++)
      {
        list.goodsList[i].expense_pwd=list.goodsList[i].expense_pwd.substr(0, list.goodsList[i].expense_pwd.length-4) + "**" + list.goodsList[i].expense_pwd.substr(-2)

      }
      t.setData(list)
     })
  },
  getRegulation() {
    var t = this
    a.get("transfer/getRegulation", {}, function (e) {
      console.log(e)
      if(e.error==0)
      {
        var article  = e.datas.content
        //WxParse.wxParse('article','html',article, t, 5);   // 实例化对象
        s.wxParse("article", "html", article, t, 5)
      }
     
    
    })
  },
  forStr(str)
  {
     str=str.replace(/&nbsp;/g,"");
     str=str.replace(/&lt;/g,"");
     str=str.replace(/p&gt;/g,"");
     str=str.replace(/br\/&gt;/g,"");
     str = str.replace(/\//g, "");
     return str
  },
  getType: function () {
    var t = this;
    a.loading(),
      this.setData({
        loading: true
      }),
      a.get("transfer/getGoodsType", {}, function (e) {
        
        var i = {
          loading: false,
          array: e.parent
      
        };
        console.log(e)
        t.getGoods(e.parent[0].id)
          t.setData(i),
          a.hideLoading()
      })
  },
  getGoods (id) {
    var t = this;
      a.get("transfer/getGoods", {
        type:id
        }, function (e) {
        console.log(e)
         if(e.datas.length==0)
         {
           wx.showToast({
             title: '当前分类不是卡密商品',
             icon: 'none',
             duration: 2000
           })
         }
        
         var i = {
           goods: e.datas,
           goods_id: e.datas.length ? e.datas[0].id : '',
           costprice: e.datas.length ? e.datas[0].costprice:'',
           shorttitle:e.datas.length?e.datas[0].shorttitle:''
         };
         t.setData(i)  
         
     })
  },
  transferChange(e)
  {
    console.log('picker发送选择改变，携带值为', e)
    console.log('id，携带值为', this.data.array[e.detail.value].id)
    let id = this.data.array[e.detail.value].id
    console.log(id)
    this.getGoods(id)
    this.setData({
      index: e.detail.value
    })
  },
  goodsChange(e) {

   // console.log('id，携带值为', this.data.array[e.detail.value].id)
    var id = this.data.goods[e.detail.value].id

    this.setData({
      goodindex: e.detail.value,
      goods_id:id,
      costprice: this.data.goods[e.detail.value].costprice,
      shorttitle:this.data.goods[e.detail.value].shorttitle
    })
    console.log('成本价' + this.data.costprice)
  },
  onChange: function (e) {
    var t = this,
      a = t.data.detail,
      r = e.currentTarget.dataset.type,
      s = e.detail.value;
      a[r] = s,
      t.setData({
        detail: a
      })
  },
  submit: function () {
    var t = this,
      i = t.data.detail,
      str = t.data.shorttitle;
    str = str.charAt(0) == '/' && str.substr(-1)=='/'?str.slice(1,-1):str
    var r = new RegExp(str);
     
    i.goods_id = t.data.goods_id
    i.price = t.data.costprice
    //console.log(r.test(i.password))
    if (t.data.goods.length==0)
    {
      wx.showToast({
        title: '请选择卡密商品',
        icon: 'none',
        duration: 2000
      })
      return
    }
    
    if ("" == i.password || !i.password)
    {
      wx.showToast({
        title: '请填服务密码',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if ( !t.data.shorttitle || t.data.shorttitle!=='') 
    {
      if (!r.test(i.password))
      {
        wx.showToast({
          title: '服务密码格式不正确',
          icon: 'none',
          duration: 2000
        })
        return
      }
     
    }

        a.post("transfer/add", i, function (i) {
          console.log(i)
          if(i.error==0)
          {
            wx.showToast({
              title: '保存成功',
              icon: 'none',
              duration: 2000
            })
            t.getList()
            var d= {
                 "price": "",
                 "password": "",
                 "leave_message": "",
                 "goods_id":''
            }
            t.setData({
              cate:'my',
              detail:d
            })
          }
          else
          {
            wx.showToast({
              title: i.massage,
              icon: 'none',
              duration: 2000
            })
          }
         
        
            // setTimeout(function () {
             
            // }, 1e3)
        })
    }
  
})