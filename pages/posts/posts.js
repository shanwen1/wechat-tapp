// pages/posts/posts.js
//引入posts-data.js，只能写相对路径，
// var postData=require("/data/posts-data.js");
var postData = require("../../data/posts-data.js");

Page({

  /**
   * 页面的初始数据(初始数据:不需要从网络加载的数据，默认小程序中自带的数据)
   */
  data: {

  },
  data1: {
    // 
    //网页中获取数据的方式(DOM)
    // var date_ele=document.getElementById("id");
    // date_ele.text=date;
    //小程序中没有DOM节点
    //小程序使用数据绑定获取数据 Angular JS
  },
  /**
   * 生命周期函数--监听页面加载
   * 发送网络请求，获取数据
   */
  onLoad: function(options) {
    
    //把所有的数据传入data函数中
    this.setData({post_key: postData.postList});
    console.log("posts page is onLoad");
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    console.log("posts page is onReady");
  },
  /**
   * 生命周期函数--监听页面显示
   */
  
  onShow: function() {
    wx.hideHomeButton();
    console.log("posts page is onShow");
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    console.log("posts page is onHide");
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    console.log("posts page is onUnload");
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    console.log("onPullDownRefresh");
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    console.log("onReachBottom");
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    console.log("onShareAppMessage");
  }

})