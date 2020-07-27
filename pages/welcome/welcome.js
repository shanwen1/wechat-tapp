// pages/welcome/welcome.js
Page({
  /*点击按钮后该函数执行 */

  OnTap: function () {
   //界面跳转，该页面不会被销毁,不能跳转到tabBar页面
  //  wx.navigateTo({
  //    url: '../posts/posts',
  //  })
   
 //界面跳转，该页面会被销毁，不能跳转到tabBar页面
  // wx.redirectTo({
  //   url: '../posts/posts',
  
  // })
  // 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
    wx.switchTab({
      url: '../posts/posts',
    })


  },
  /*** 冒泡事件：当一个组件上的事件被触发后，该事件会向父节点传递。
       非冒泡事件：当一个组件上的事件被触发后，该事件不会向父节点传递。 */

  onContainerTap:function(){
  },

  onSubTap:function(){
  },

  /**
   * 页面的初始数据
   */
  data: {

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