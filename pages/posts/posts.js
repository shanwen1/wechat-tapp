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
  },/*  */
  /**
   * 生命周期函数--监听页面加载
   * 发送网络请求，获取数据
   */

  onPostTap:function(event){
    //获取当前标签中的data-PostId属性中的值

    //target指的是当前点击的组件     view
    //currentTarget指的是事件捕获组件 view
   var postid=event.currentTarget.dataset.postid;
    console.log(event);
    //跳转到下一个页面，id传过去，根据Id查找数据
    //当前页面不销毁
    wx.navigateTo({
      url: 'post-detail/post-detail?id='+postid,
    })
  },


  onSwiperTap: function (event){
    
    //target指的是当前点击的组件     image
    //currentTarget指的是事件捕获组件 swiper
    var postid = event.target.dataset.postid;

    //跳转到下一个页面，id传过去，根据Id查找数据
    //当前页面不销毁
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postid,
    })
  },

  onLoad: function(options) {
    
    //把所有的数据传入data函数中
    this.setData({post_key:postData.postList});
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
  },
  /**
   * 生命周期函数--监听页面显示
   */
  
  onShow: function() {
    wx.hideHomeButton();
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
  }

})