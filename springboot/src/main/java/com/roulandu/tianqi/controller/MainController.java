package com.roulandu.tianqi.controller;

import com.alibaba.fastjson.JSONObject;
import com.roulandu.tianqi.service.MainService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@Controller
@RequestMapping(value = "/api")
public class MainController {

    @Autowired
    private MainService mainService;

    @RequestMapping(value = "/getWeather", method = RequestMethod.GET)
    @ResponseBody
    public JSONObject getWeatherByLocation(@RequestParam String longitude,
                                           @RequestParam String latitude){
        return mainService.getWeatherByLocation(longitude, latitude);
    }
}
