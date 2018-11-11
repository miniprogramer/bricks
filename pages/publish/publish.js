// pages/publish/publish.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      imgs: [
      ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },

  bindAdd: function(e) {
    var vm = this
    wx.chooseImage({
      count: 3 - vm.data.imgs.length,
      success(res) {
        vm.data.imgs = vm.data.imgs.concat(res.tempFilePaths)
        vm.setData({
          imgs: vm.data.imgs
        })
        // const name = tempFilePaths[0].name
        // wx.uploadFile({
        //   url: 'https://ddxce.com/singleupload',
        //   filePath: tempFilePaths[0],
        //   name: 'file',
        //   formData: {
        //     filenames: name
        //   },
        //   success(res) {
        //     console.log(res.data)
        //   },
        //   fail(res) {
        //     console.info('fail');
        //   }
        // })
      }
    })
  },
  bindRemove: function (e) {
    var vm = this
    var imgs = vm.data.imgs
    wx.showModal({
      title: '提示',
      content: '是否移除该图片',
      success(res) {
        if (res.confirm) {
          imgs.remove(e.currentTarget.dataset.name[0])
          vm.setData({
            imgs: imgs
          })
        }
      }
    })
  },
  publishMessage: function(e) {
    var vm = this
    wx.showLoading({
        title: '正在上传',
        success(res) {
          app.uploadFiles({
            paths: vm.data.imgs,
            success(res) {
              var time = new Date().getTime()
              app.pushData({
                key: "pubish-" + app.globalData.userInfo.nickName + "-" + time,
                value: JSON.stringify({
                  username: app.globalData.userInfo.nickName,
                  text: e.detail.value.textarea,
                  imgs: res.fileIds,
                  time: time
                }),
                callback(res) {
                  wx.hideLoading()
                  wx.switchTab({
                    url: '../index/index',
                  })
                }
              })
             },
             fail(res) {
              wx.hideLoading()
              wx.showModal({
                 title: '提示',
                 content: '发布失败'
               })
             }
          })
        }
    })
  }
})