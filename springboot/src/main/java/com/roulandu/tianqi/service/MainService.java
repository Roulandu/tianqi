package com.roulandu.tianqi.service;

import com.alibaba.fastjson.JSONObject;

public interface MainService {
    JSONObject getWeatherByLocation(String lon, String lat);
}
