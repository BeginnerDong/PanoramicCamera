// pages/topay/topay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    payMoney:"39.8",
    payFs:[
      "1、收费标准66.6元/天，支付24小时的费用，结算时间为下单的第二天进行结算。",
      "2、用户没有结算，则在归还物品时，进行补缴费用。"
    ]
  },
  closepay:function(){
    wx.navigateTo({
      url: '../star/star'
    })
  },
  gopay: function () {
    wx.navigateTo({
      url:"../payEwm/payEwm"
    })
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

  }
})