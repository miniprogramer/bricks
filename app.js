//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  },
  pullData: function (key, callback) {
    wx.request({
      url: 'https://ddxce.com/getkv',
      method: 'POST',
      data: {
        key: key
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        callback(res)
      }
    })
  },
  pullDataList: function (callback) {
    wx.request({
      url: 'https://ddxce.com/prefixkv',
      method: 'POST',
      data: {
        prefix: callback.prefix
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        callback.success(res)
      },
      fail(res) {
        callback.fail(res)
      }
    })
  },
  pushData: function (req) {
    wx.request({
      url: 'https://ddxce.com/setkv',
      method: 'POST',
      data: {
        key: req.key,
        value: req.value
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      complete(res) {
        req.callback(res.data)
      }
    })
  },
  downloadFile: function (fileId, callback) {
    wx.downloadFile({
      url: 'https://ddxce.com/file/' + fileId,
      complete(res) {
        if (res.statusCode === 200) {
          callback(res.tempFilePath)
        } else {
          callback("")
        }
      }
    })
  },
  uploadFile: function(path, callback) {
    wx.uploadFile({
      url: 'https://ddxce.com/singleupload',
      filePath: path,
      name: 'file',
      formData: {
        filenames: path.name
      },
      complete(res) {
        callback(res)
      }
    })
  },
  uploadFiles: function (callback) {
    var app = this
    var dfsUploadFiles = function(paths, deep, fileIds, callback) {
      if (deep >= paths.length) {
        callback.success({
          statusCode: 200,
          fileIds: fileIds,
          msg: "finished"
        })
        return
      }
      app.uploadFile(paths[deep], function (res) {
        if (res.statusCode == 200) {
          fileIds.push(JSON.parse(res.data).fileid)
          dfsUploadFiles(paths, deep + 1, fileIds, callback)
        } else {
          callback.fail({
            statusCode: -1,
            "msg": "upload fail in imgs[" + deep + "]"
          })
        }
      })
    }
    dfsUploadFiles(callback.paths, 0, [], callback)
  }
})
Array.prototype.indexOf = function (val) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == val) return i;
  }
  return -1;
};
Array.prototype.remove = function (val) {
  var index = this.indexOf(val);
  if (index > -1) {
    this.splice(index, 1);
  }
};