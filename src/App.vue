<script>
import config from '@/config/config.js'
export default {
  created () {
    // 调用API从本地缓存中获取数据
    /*
     * 平台 api 差异的处理方式:  api 方法统一挂载到 mpvue 名称空间, 平台判断通过 mpvuePlatform 特征字符串
     * 微信：mpvue === wx, mpvuePlatform === 'wx'
     * 头条：mpvue === tt, mpvuePlatform === 'tt'
     * 百度：mpvue === swan, mpvuePlatform === 'swan'
     * 支付宝(蚂蚁)：mpvue === my, mpvuePlatform === 'my'
     */
  },
  onLaunch: function() {
    
  },
  mounted() {
    var that = this, e = wx.getStorageSync("baidu_token") || {};
    e && e.time - Date.now() <= 3e5 && this.sysBaiduOpenApiToken();
    setTimeout(() => {
        wx.setStorageSync("baidu_token", e), this.sysBaiduOpenApiToken();
    }, 5);
    
    // wx.getStorageSync("userId") || "" || wx.login({
    //   success: function(e) { 
    //     console.log('wx.login', e)
    //     wx.request({
    //       url: config.staticUrl + `/api/v1/users/get/${token}`,
    //       data: {
    //           code: e.code
    //       },
    //       success: function(e) {
    //           if ("10000" == e.data.code) {
    //               wx.setStorageSync("userId", e.data.data.userId);
    //           } else "20000" == e.data.code || console.log("接口用户信息获取失败");
    //       }
    //     });
    //   }
    // });
  },
  methods: {
    sysBaiduOpenApiToken() {
      Date.now();
      var e = wx.getStorageSync("baidu_token") || {};
      e.time ? e.time - Date.now() <= 3e5 && this.getBaiduOpenApiToken(function(e) {
          e.time = Date.now() + 72e5, wx.setStorageSync("baidu_token", e);
      }) : this.getBaiduOpenApiToken(function(e) {
          e.time = Date.now() + 72e5, wx.setStorageSync("baidu_token", e);
      });
    },
    getBaiduOpenApiToken(e) {
      wx.request({
        url: "https://openapi.baidu.com/oauth/2.0/token",
        data: {
            grant_type: "client_credentials",
            client_id: "lagZdrinq7W8AAec6NDmcq18BSPC7ZUg",
            client_secret: "eY2vLcfI5yu1YhGnxwlimu7kojLLtGVz"
        },
        header: {
            "Content-Type": "application/json"
        },
        success: function(t) {
            "function" == typeof e && e(t.data);
        },
        fail: function(e) {
            console.log(e);
        }
      });
    }
  }
}
</script>

<style>

</style>
