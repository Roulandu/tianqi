package com.roulandu.tianqi.serviceImpl;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.roulandu.tianqi.service.MainService;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;

@Service
public class MainServiceImpl implements MainService {

    private static String sendGetRequest(String getUrl) throws IOException {
        StringBuffer sb = new StringBuffer();
        InputStreamReader isr = null;
        BufferedReader br = null;
        try {
            URL url = new URL(getUrl);
            URLConnection urlConnection = url.openConnection();
            urlConnection.setAllowUserInteraction(false);
            isr = new InputStreamReader(url.openStream());
            br = new BufferedReader(isr);
            String line;
            while ((line = br.readLine()) != null) {
                sb.append(line);
            }
        } catch (IOException e) {
        } finally {
            isr.close();
            br.close();
        }
        return new String(sb.toString().getBytes(), "UTF-8");
    }

    @Override
    public JSONObject getWeatherByLocation(String lon, String lat) {
        String loc_url =
                "http://api.map.baidu.com/geocoder/v2/?location=" + lat
                        + "," + lon + "&output=json&coordtype=wgs84ll" +
                        "&ak=百度地图API-Key";
        JSONObject jsonObject = null;
        try {
            jsonObject = JSON.parseObject(sendGetRequest(loc_url));
        } catch (IOException e) {
            return null;
        }
        String appkey = "Mob开发者App-Key";
        String province = jsonObject.getJSONObject("result").getJSONObject("addressComponent").getString("province");
        String city = jsonObject.getJSONObject("result").getJSONObject("addressComponent").getString("city").replaceAll("市", "");

        String weather_url = "http://apicloud.mob.com/v1/weather/query?city="
                + java.net.URLEncoder.encode(city) +
                "&key=" + appkey +
                "&province=" + java.net.URLEncoder.encode(province);

        JSONObject jsonObject1 = null;
        try {
            jsonObject1 = JSON.parseObject(sendGetRequest(weather_url));
        } catch (IOException e) {
            return null;
        }
        return jsonObject1;
    }
}
