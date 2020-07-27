// pages/posts/post-detail/post-detail.js
var postsData = require("../../../data/posts-data.js");

//获取全局的app
var app=getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlayingMusic:false,
    currentPostId:0
    //headImgSrc:"..."
    // author:"..."
    // collected:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    

    //获取点击的新闻列表的id
    var postId = options.id;
    this.data.currentPostId = postId;
    //根据id获取对应的数据,id相当于数组的下标
    var postData = postsData.postList[postId];//{headImgSrc:"/images/post/crab.png",author: "蔡徐坤"}
    //传入一个js对象
    this.setData(postData);

    //存储所有新闻的收藏状态
    // var postsCollected={
    //    0:true,
    //    1:false,
    // };

    //从缓存中获取所有文章的收藏状态
    var postsCollected = wx.getStorageSync("posts_collected");
    //判断是否为空,
    if (postsCollected) {
      //根据id获取对应的状态 
      var postCollected = postsCollected[postId]; //true
      this.setData({
        //把状态设置给collected
        collected: postCollected
      })
    } else {
      //缓存中没有数据，将postsCollected赋值为空对象
      var postsCollected = {}
      // 将当前新闻数据的收藏状态设置为false,因为第一次打开收藏状态为false
      postsCollected[postId] = false;
      wx.setStorageSync("posts_collected", postsCollected);
    }

    //如果全局的播放状态为true,isPlyingMusic设置为true
    if (app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId===postId){
      this.setData({
        isPlayingMusic:true
      })
    }

    //音乐播放监控
    this.setMusicMonitor();
  },

  setMusicMonitor:function(){
    var that = this;
    //音乐播放时的回调函数
    wx.onBackgroundAudioPlay(function () {
      that.setData({
        isPlayingMusic: true
      })
      app.globalData.g_isPlayingMusic=true;
      app.globalData.g_currentMusicPostId=that.data.currentPostId;
      
    });
    
    //音乐暂停时的回调函数
    wx.onBackgroundAudioPause(function () {
      that.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayingMusic = false;
      app.globalData.g_currentMusicPostId =null;
    });

  //音乐停止时的回调函数
    wx.onBackgroundAudioStop(function(){
      that.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayingMusic = false;
      app.globalData.g_currentMusicPostId = null;
      })
  },

  //      
  onCollectionTap: function (event) {
    // //获取.log(data);
    // var postsCollected={
    //    0:true,
    // };
    //获取所有文章的收藏状态
    var postsCollected = wx.getStorageSync("posts_collected");
    //获取当前文章的收藏状态
    var postCollected = postsCollected[this.data.currentPostId];
    //修改状态 收藏->未收藏  未收藏->收藏
    postCollected = !postCollected;
    //修改当前文章的状态
    postsCollected[this.data.currentPostId] = postCollected;

    // this.showModal(postsCollected, postCollected);
    this.showToast(postsCollected, postCollected);
  },

  showModal: function (postsCollected, postCollected) {
    //this：函数调用的上下文环境,this表示当前,success的调用方不是page
    var that = this;
    wx.showModal({
      title: '收藏',
      content: postCollected ? "收藏该文章" : "取消收藏",
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#333',
      confirmText: '确认',
      confirmColor: '#405f80',
      success: function (res) {
        if (res.confirm) {
          //更新所有的文章收藏状态
          wx.setStorageSync("posts_collected", postsCollected);
          //更新当前收藏按钮状态
          that.setData({
            collected: postCollected
          })
        }
      },
    })
  },
  showToast: function (postsCollected, postCollected) {
    //更新所有的文章收藏状态
    wx.setStorageSync("posts_collected", postsCollected);
    //更新当前收藏按钮状态
    this.setData({
      collected: postCollected
    })
    //交互反馈 wx.showToast 吐司, 显示消息提示框
    wx.showToast({
      title: postCollected ? "收藏成功" : "取消收藏",
      icon: "success",
      duration: 1000
    })
  },

  onShareTap:function(){
    var itemList=[
      "分享到微信好友",
      "分享到朋友圈",
      "分享到QQ",
      "分享到QQ控件",
      "分享到新浪微博",
      "分享到哔哩哔哩"
    ]
    //显示操作菜单
      wx.showActionSheet({
        itemList:itemList,
        itemColor: '#405f80',
        success: function(res) {
          // tapIndex 用户点击的按钮序号，从上到下的顺序，从0开始
          wx.showModal({
            title: '用户'+itemList[res.tapIndex],
           
          })
        },
        fail: function(res) {
      
        },
        complete: function(res) {},
      })
  },


  /**
   * 播放音乐
   * 
   */
  onMusicTap:function(){
    //通过id获取对应的音乐信息
    var postMusicData=postsData.postList[this.data.currentPostId].music;
    //标识音乐是否播放
    var isPlayingMusic=this.data.isPlayingMusic;
    //如果音乐正在播放
    if(isPlayingMusic){
      //暂停播放
      wx.pauseBackgroundAudio();
      //将播放状态设置为false
      this.setData({
        isPlayingMusic:false
      })
    }else{
      // 在后台播放音乐
      wx.playBackgroundAudio({
        dataUrl: postMusicData.url,
        title: postMusicData.title,
        coverImgUrl:postMusicData.coverImg
      })
      this.setData({
        isPlayingMusic: true
      })
    }
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