// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    contbox: [
      {
        indexForm: [
          {
            title: "开始时间",
            msginfor: "2019-07-20 10：48：30"
          },
          {
            title: "归还状态",
            msginfor: "未归还"
          },
          {
            title: "订单状态",
            msginfor: "已延期"
          },
          {
            title: "租赁单价",
            msginfor: "39.8/天"
          },
          {
            title: "租赁总价",
            msginfor: "￥166.6/天"
          }
        ]
      },
      {
        indexForm: [
          {
            title: "开始时间",
            msginfor: "2019-07-19 10：48：30"
          },
          {
            title: "归还状态",
            msginfor: "未归还"
          },
          {
            title: "订单状态",
            msginfor: "已延期"
          },
          {
            title: "租赁单价",
            msginfor: "39.8/天"
          },
          {
            title: "租赁总价",
            msginfor: "---"
          }
        ]
      }
    ],
    tapName: function (event) {
      console.log(event)
    }
  },
  goFinal:function(){
    wx.navigateTo({
      url: '../orderXq/orderXq',
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