//index.js
Page({
  data: {

    tabBar: {
      "color": "#9E9E9E",
      "selectedColor": "#f00",
      "backgroundColor": "#fff",
      "borderStyle": "#ccc",
      "num": 4,
      "list": [
        {
          "pagePath": "/page/index/index",
          "text": "主页",
          "iconPath": "../../images/1.png",
          "selectedIconPath": "../../images/1-2.png",
          //"selectedColor": "#4EDF80",  
          active: true
        },
        {
          "pagePath": "/page/kj/list",
          "text": "开奖查询",
          "iconPath": "../../images/2.png",
          "selectedIconPath": "../../images/2-2.png",
          active: false
        },
        {
          "pagePath": "/page/news/index",
          "text": "彩经新闻",
          "iconPath": "../../images/3.png",
          "selectedIconPath": "../../images/3-2.png",
          active: false
        },
        {
          "pagePath": "/page/line/index",
          "text": "预测分析",
          "iconPath": "../../images/4.png",
          "selectedIconPath": "../../images/4-2.png",
          active: false
        }
      ],
      "position": "bottom"
    },
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 500,
    circular: true,
    storeRecommand: [],
    indicatorDotsHot: false,
    autoplayHot: true,
    intervalHot: 5000,
    durationHOt: 1000,
    circularHot: true,
    background: [
      {
        images: "/static/images/jd3.jpg",
      },
      {
        images: "/static/images/jd3.jpg",
      }
    ],

  },
  //图片自适应
  imagesHeight: function (t) {
    var a = t.detail.width,
      e = t.detail.height,
      o = t.target.dataset.type,
      i = {},
      s = this;
    console.log(t)
    wx.getSystemInfo({
      success: function (t) {
        i[o] = t.windowWidth / a * e,
          (!s.data[o] || s.data[o] && i[o] < s.data[o]) && s.setData(i)
        console.log(i)
      }
    })
  },
  tapName: function(event){
    // console.log(event)
    
  }
  //底部调用
})