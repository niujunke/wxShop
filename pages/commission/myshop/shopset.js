var uploadFileUrl ='https://xcx.yiscio.com/app/index.php?i=8&c=entry&m=fy_lesson&do=mobile&r=app.commission.myshopset.uploadxx';

Page({

  del1: function (res) {
    var self = this
    self.setData({
      imageSrc1: ''
    })

  },
  del2: function (res) {
    var self = this
    self.setData({
      imageSrc2: ''
    })

  },
  chooseImage1: function () {
    var self = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log('图片路径', res.tempFilePaths[0])

        var imageSrc1 = res.tempFilePaths[0]

        wx.uploadFile({
          url: uploadFileUrl,
          filePath: imageSrc1,
          name: 'file',
          header: { "Content-Type": "multipart/form-data" },
          formData: {
            'user': 'test'
          },
          success: function (res) {
            console.log('上传程序返回', res)
            wx.showToast({
              title: '上传成功',
              icon: 'success',
              duration: 1000
            })

            self.setData({
              imageSrc1
            })
          },
          fail: function ({ errMsg }) {
            console.log('uploadImage fail, errMsg is', errMsg)
          }
        })

      },
      fail: function ({ errMsg }) {
        console.log('chooseImage fail, err is', errMsg)
      }
    })
  },
  chooseImage2: function () {
    var self = this
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album'],
      success: function (res) {
        console.log('chooseImage success, temp path is', res.tempFilePaths[0])

        var imageSrc2 = res.tempFilePaths[0]

        wx.uploadFile({
          url: uploadFileUrl,
          filePath: imageSrc2,
          name: 'data',
          success: function (res) {
            console.log('uploadImage success, res is:', res)
            wx.showToast({
              title: '上传成功',
              icon: 'success',
              duration: 1000
            })

            self.setData({
              imageSrc2
            })
          },
          fail: function ({ errMsg }) {
            console.log('uploadImage fail, errMsg is', errMsg)
          }
        })

      },
      fail: function ({ errMsg }) {
        console.log('chooseImage fail, err is', errMsg)
      }
    })
  }
})
