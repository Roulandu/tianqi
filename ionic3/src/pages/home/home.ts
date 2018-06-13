import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import {Geolocation} from "@ionic-native/geolocation";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  weather: Object;

  constructor(public navCtrl: NavController,
              public http: HttpClient,
              public geolocation: Geolocation) {

  }

  ionViewDidLoad() {
    //console.info("load");
  }

  ionViewDidEnter() {
    //console.info("enter");

    this.geolocation.getCurrentPosition({
      maximumAge: 0,
      timeout: 10000,
      enableHighAccuracy: true
    }).then(
      position => {
        let lon = position.coords.longitude;
        let lat = position.coords.latitude;
        let url = "http://ip:5000/api/getWeather?longitude=" + lon.toString() + "&latitude=" + lat.toString();
        this.http.get(url)
          .subscribe(
            data => {
              let code = data["retCode"];
              switch (code) {
                case "200":
                  let msg = data["result"][0];
                  this.setWeather(msg);
                  break;
                case "10001":
                  console.info("对不起，服务已不再提供")
                  break;
                case "10020":
                  console.info("系统维护中");
                  break;
                case "10021":
                  console.info("系统迁移中");
                  break;
                case "20401":
                  console.info("无法定位到该城市");
                  break;
                case "20402":
                  console.info("该城市暂时不支持查询");
                  break;
              }
            }, error => {
              console.info(error);
            }
          );
      }
    );
  }

  private setWeather(msg: any) {
    let img_url = "";
    let wind_url = "assets/imgs/weather/wind/";
    let hour = new Date().getHours();
    let min = new Date().getMinutes();
    if (this.compareTime(hour, min, msg["sunrise"], msg["sunset"])) { // 白天还是晚上
      img_url += "assets/imgs/weather/day/";
    } else {
      img_url += "assets/imgs/weather/moon/";
    }
    switch (msg["weather"]) {
      case "多云":
        img_url += "Cloudy.png";
        break;
      case "少云":
        img_url += "Partly Cloudy.png";
        break;
      case "晴":
        img_url += "Clear.png";
        break;
      case "阴":
        img_url += "Overcast.png";
        break;
      case "小雨":
        img_url += "Light Rain.png";
        break;
      case "雨":
        img_url += "Rain.png";
        break;
      case "雷阵雨":
        img_url += "Heavy Thundershower.png";
        break;
      case "中雨":
        img_url += "Moderate Rain.png";
        break;
      case "阵雨":
        img_url += "Heavy Shower Rain.png";
        break;
      case "零散阵雨":
        img_url += "Shower Rain.png";
        break;
      case "零散雷雨":
        img_url += "Thundershower.png";
        break;
      case "小雪":
        img_url += "Light Snow.png";
        break;
      case "中雪":
        img_url += "Moderate Snow.png";
        break;
      case "大雪":
        img_url += "Heavy Snow.png";
        break;
      case "雨夹雪":
        img_url += "Sleet.png";
        break;
      case "阵雪":
        img_url += "Snow Flurry.png";
        break;
      case "霾":
        img_url += "Haze.png";
        break;
      default:
        img_url += "unknow.png";
        break;
    }
    console.info(img_url);
    msg["img_url"] = img_url;

    let pattern = /[\u4e00-\u9fa5]/g;

    let level = msg["wind"].replace(pattern, "");
    switch (level) {
      case "1":
        wind_url += "1.png";
        break;
      case "2":
        wind_url += "2.png";
        break;
      case "3":
        wind_url += "3.png";
        break;
      case "4":
        wind_url += "4.png";
        break;
      case "5":
        wind_url += "5.png";
        break;
      case "6":
        wind_url += "6.png";
        break;
      case "7":
        wind_url += "7.png";
        break;
      case "8":
        wind_url += "8.png";
        break;
      case "9":
        wind_url += "9.png";
        break;
      case "10":
        wind_url += "10.png";
        break;
      case "11":
        wind_url += "11.png";
        break;
      case "12":
        wind_url += "12.png";
        break;
      case "13":
        wind_url += "13.png";
        break;
      case "14":
        wind_url += "14.png";
        break;
      default:
        wind_url += "unknow.png";
        break;
    }
    msg["wind_url"] = wind_url;
    this.weather = msg;
  }


  private compareTime(hour: number, min: number, sunrise: any, sunset: any) {
    if (hour > sunrise.toString().substring(0, 2) && hour < sunset.toString().substring(0, 2)) {
      return true;
    } else if (hour == sunrise.toString().substring(0, 2)) {
      if (min >= sunrise.toString().substring(3, 5)) {
        return true;
      } else {
        return false;
      }
    } else if (hour == sunset.toString().substring(0, 2)) {
      if (min <= sunrise.toString().substring(3, 5)) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
