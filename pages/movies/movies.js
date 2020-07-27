// pages/movies/movies.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
     this.loadMovieData();
  },

  loadMovieData:function(){
    var that=this;
    //网络加载数据
    wx.request({
      url: 'http://t.yushu.im/v2/movie/top250',
      // 参数,
      data: {},
      //请求方法
      method: "GET",
      //消息头，默认application/json
      header: {
        'content-type': 'application/json'
      },
      //成功响应数据的回调函数
      success: function (res) {
        //电影数据
        var datas = res.data.subjects;
        var movies=[];
        //遍历电影datas数组,
        for (var i = 0; i < datas.length; i++) {
          //获取每个电影的图片，名字，评分
          var image = datas[i].images.large;
          var name = datas[i].title.split(" ")[0];//这个杀手不太冷 Léon -->["这个杀手不太冷",Léon]
          var score = datas[i].rating.average;
          movies[i] = { "name": name, "score": score,"movie_img":image};
        }
        that.setData({
          movies:movies
        })
      },
      //发送请求失败的回调函数
      fail: function (error) {
        console.log(error);
      }
    })
  },

  /**
   * 图片加载失败时执行
   */
  imageLoadError:function(e){
    var errorImgIndex=e.target.dataset.imgindex;//获取出错的下标
    //将movies数组中出错下标对应的图片替换
    /**
     * movies:[
     *  {name:"老八","score":9.9,"movie_img","xxxxxx"},
     *  {name:"老八","score":9.9,"movie_img","xxxxxx"},
     *  {name:"老八","score":9.9,"movie_img","/images/movies/error.jpg"}
     * ]
     */
  
     var movies=this.data.movies;
     movies[errorImgIndex].movie_img="/images/movies/狩猎.jpg";
  
    // //将数据更新
     this.setData({
       movies:movies
     })
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