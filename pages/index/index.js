//index.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    designInfo: [
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
    this.refreshData()
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
    this.refreshData()
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
  refreshData: function() {
    var vm = this
    app.pullDataList({
      prefix: "pubish",
      success(res) {
        var kvs = res.data.kvs
        var infos = []
        for (var i = 0; i < kvs.length; ++i) {
          infos.push(JSON.parse(kvs[i].value))
        }
        vm.setData({
          designInfo: infos
        })
      }
    })
  }
})
