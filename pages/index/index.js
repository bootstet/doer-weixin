//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    hidden:true,
    locationList:[],
    latitude:"",
    longitude:"",
    addressDesc:""
  },
  
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  
  onLoad: function () {
    console.log(this.latitude, this.longitude)
    var that = this;
    wx.getLocation({
      type: 'wgs84',
      success: res=> {
        console.log(res);
        that.setData({
          latitude:res.latitude,
          longitude:res.longitude
        })
        // this.loadCity(res.latitude, res.longitude);
      },
    })
    
    wx.chooseLocation({
      success: res => {
        console.log(res);
        console.log(2222)
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
        this.loadCity(res.latitude, res.longitude);
      },
    })
   
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  loadCity:function(latitude,longitude){
    let page = this
    wx.request({
      url: 'https://api.map.baidu.com/geocoder/v2/?ak=4PjeL7Hp9jEcIaP74oriLBL0XZ20tgXC&location=' + latitude + ',' + longitude + '&output=json',  
      data:{},
      header:{
        'Content-Type': 'application/json'  
      },
      success:res=>{
        console.log(1111, res.data.result.formatted_address);
        page.setData({
          addressDesc: res.data.result.formatted_address
        })
      }
    })
  },

  getUserInfo: function(e) {
    console.log(e)
    
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  }
})
