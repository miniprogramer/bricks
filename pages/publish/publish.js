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
      success(res) {
        const tempFilePaths = res.tempFilePaths
        vm.data.imgs.push(tempFilePaths)
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
  publishMessage: function(e) {
    var vm = this
    var json = {
      key: "pubish-" + app.globalData.userInfo.nickName + "-" + new Date().getTime(),
      value: {
        text: e.detail.value.textarea,
        imgs: vm.data.imgs
      }
    };
    wx.showModal({
      title: '结果',
      content: JSON.stringify(json),
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})