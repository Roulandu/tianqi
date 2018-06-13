# tianqi
springboot-天气服务+ionic3-App

申请Mob开发者账号，并获得应用AppKey用于天气接口调用
申请百度地图开发者账号，并获得百度地图服务端Key用户地理逆转换接口调用

将对应的Key填入ServiceImpl文件中
修改application.properties 文件中 server.port为需要端口
启动springboot服务(需要提前安装配置Maven以下载所需依赖)

将IP地址端口号填入home.ts文件中以获得所需服务
ionic cordova build platform 以生成对应平台App
(需要提前安装 Node.js/ionic/cordova)
(生成App 需要 对应的 安卓 与 苹果 SDK 请自行下载使用)
