// pages/saleing/saleing.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userPhoto:"../../image/img3.png",
    userName:"快乐的猫",
    orderCount:[
      {
        name : "订单开始时间",
        infor: "2019-07-20 14:24:30"
      },
      { 
        name: "逾期累积费用",
        infor: "￥156.6"
      }
    ]
  },
  overOrder:function(){
    wx.navigateTo({
      url: '../sales2/sales2',
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