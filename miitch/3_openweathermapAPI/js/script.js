(function() {
var $currentWeather = $('#currentWeather');
var $hourlyWeather = $('#hourlyWeather');
var $myAreaCurrent = $('#myAreaCurrent');
var myArea = { // 포천..인데 양주로 나옴ㅠㅠ
  name: "경기도 포천시",
  lat: 37.8136989,
  lon: 127.1580072
}


/**
 * geolocation 으로 현위치의 위도, 경도값 가져옴
 */
function geoWeather(position) {
  var posCrd = position.coords;

  var geo = "//api.openweathermap.org/data/2.5/weather?lat=" + posCrd.latitude + "&lon=" + posCrd.longitude + "&appid=17f3cd69b66748594cd1742315476b05";
  var geo = "//api.openweathermap.org/data/2.5/weather?lat=37.47722&lon=126.86639&appid=17f3cd69b66748594cd1742315476b05";
  $.ajax({
    url: geo,
    dataType: "json",
    type: "GET",
    async: "false",
    success: function(resp) {
      $currentWeather.html(showCurrentWeather(resp));
      console.log(resp);
      console.log(posCrd);
    }
  });
};

function geoError(err) {
  var html = "<h2 class='error'>현재 위치의 날씨 정보를 불러올 수 없습니다.</h2>";
  $currentWeather.html(html);
  console.warn('ERROR(' + err.code + '): ' + err.message);
};


/**
 * 특정 지역의 위도, 경도값 입력함
 */
function myAreaWeather(myArea) {
  var myCurrentWeather = "//api.openweathermap.org/data/2.5/weather?lat=" + myArea.lat + "&lon=" + myArea.lon + "&appid=17f3cd69b66748594cd1742315476b05";
  $.ajax({
    url: myCurrentWeather,
    dataType: "json",
    type: "GET",
    async: "false",
    success: function(resp) {
      $myAreaCurrent.html(showCurrentWeather(resp));
      console.log(resp);
    }
  });
}

function myAreaFutureWeather(myArea) {
  var myFutureWehater = "https://api.openweathermap.org/data/2.5/onecall?lat=" + myArea.lat + "&lon=" + myArea.lon + "&exclude=minutely&appid=17f3cd69b66748594cd1742315476b05";
  $.ajax({
    url: myFutureWehater,
    dataType: "json",
    type: "GET",
    async: "false",
    success: function(resp) {
      console.log(resp);
      $hourlyWeather.append(showHourlyWeather(resp));
      setDataBar($hourlyWeather);
      // showHourlyWeather(resp);
    }
  });
}

/*======== 날씨 정보 =============================*/
function showDailyWeather(resp) {}

/** 시간별(테이블) */
function showHourlyWeather(resp) { /** 24시간 동안의 시간별 날씨 */
  var hourly = resp.hourly;
  var length = 48;
  var dataObj = [];
  var beforeDate = new Date().getDate();
  var dateCount = 0;

  /** 공통 div */
  weatherConditionBlock = $('<div class="dataBlockOuter"><div class="dataBlock"><ul></ul></div></div>');
  humidityBlock = weatherConditionBlock.clone();

  for ( var i = 0; i < length; i++ ) {
    var condition = getConditionIcon(hourly[i].weather[0].id);
    var temperature = Math.round((hourly[i].temp - 273.15) * 10) / 10 + '°C';
    var humidity = hourly[i].humidity;
    var time = new Date(hourly[i].dt * 1000);
    var date = time.getDate();
    var hour = time.getHours() + '시';
    if( hour == '24시') { hour = '0시'};

    /** 공통 li */
    var li = '';
    if ( beforeDate != date && dateCount == 0) {  li = '<li data-date="tomorrow">'; }
    else if ( beforeDate != date && dateCount == 1 ) { li = '<li data-date="afterTomorrow">'; }
    else { li = '<li>'; }

    /** 기온 */
    var conditionHtml = '';
    conditionHtml += li;
    conditionHtml += '<span class="hour">' + hour + '</span>';
    conditionHtml += '<i class="ico" data-condition="'+ condition +'"></i>';
    conditionHtml += '<span class="temperature">' + temperature + '</span></li>';
    
    weatherConditionBlock.find('ul').append(conditionHtml);

    /** 습도 */
    var humidityHtml = '';
    humidityHtml += li;
    humidityHtml += '<span class="hour">' + hour + '</span>';
    humidityHtml += '<span class="bar" data-per="' + humidity + '"></span>';
    humidityHtml += '<span class="per">' + humidity + '%</span>';

    humidityBlock.find('ul').append(humidityHtml);

    /** 다음날로 넘어갔는지 체크 */
    if(beforeDate != date) { 
      dateCount++;
      beforeDate = date;
    }
  }

  dataObj.push(weatherConditionBlock);
  dataObj.push(humidityBlock);

  return dataObj;
}


/** 현재 실시간 정보(카드) */
function showCurrentWeather(resp) {
  var country = (resp.sys.country == "KR") ? "대한민국" : resp.sys.country;
  // var name = resp.name;
  var name = getKoreanName(resp.name);
  var temperature = Math.round((resp.main.temp - 273.15) * 10) / 10 + '°C';  // 절대온도에서 273.15를 빼서 섭씨 온도를 구함
  var humidity = resp.main.humidity + '%';
  var feelsLike = Math.round((resp.main.feels_like - 273.15) * 10) / 10 + '°C';  // 절대온도에서 273.15를 빼서 섭씨 온도를 구함
  var wind = Math.round(resp.wind.speed * 100) / 100 + 'm/s';
  // 풍향
  var windDirection = checkDirection(resp.wind.deg);
  // 날씨 아이콘
  conditionIcon = getConditionIcon(resp.weather[0].id);
  // 기온, 습도, 바람, 체감온도, 강수량
  var html = '<div class="titleBlock">';
      html += '<h3>' + country + ', ' + name + '</h3></div>';
      html += '<div class="dataBlock">';
      html +=   '<div class="text">';
      html +=     '<p class="temperature"><span class="s_ttl">기온 </span><span class="desc">' + temperature + '</span></p>';
      html +=     '<p class="humidity"><span class="s_ttl">습도 </span><span class="desc">' + humidity + '</span></p>';
      html +=     '<p class="feelsLike"><span class="s_ttl">체감 </span><span class="desc">' + feelsLike + '</span></p>';
      html +=     '<p class="wind"><span class="s_ttl">바람 </span><span class="desc">' + windDirection + "&nbsp;" + wind + '</span></p>';
    if (resp.weather[0].main == "Rain") { // 비가 오는 경우 강수량 표시
      html += '<p class="rain"><span class="s_ttl">강수량</span><span class="desc">&nbsp;' + resp.rain['1h'] + 'mm/h</span></p>';
    }
      html +=   '</div>';
      html +=   '<div class="icon">';
      html +=     '<img src="img/' + conditionIcon + '.png" alt="'+ resp.weather[0].description +'">';
      html +=   '</div>';
      html += '</div>';

    return html;
  }
/*===============================================*/


/*============ 도시명============================*/
function getKoreanName(enName) {
  switch (enName) {
    case 'Kwangmyŏng' : return '경기도 광명시';
    case 'Seoul' : return '서울특별시';
    case 'Yangju' : return '경기도 양주시가 아닌 포천시';
    default : return enName;
  }
}
/*===============================================*/


/*============ 풍향 =============================*/
/**
 * @param {number} direction    // 풍향 정보
 * @returns string
 */
function checkDirection(direction) {
  if (direction == 0) { return '북풍'; }
  else if (direction < 90) { return '북동풍'; }
  else if (direction == 90) { return '동풍'; }
  else if (direction < 180) { return '남동풍'; }
  else if (direction == 180) { return '남풍'; }
  else if (direction < 270) { return '남동풍'; }
  else if (direction == 270) { return '서풍'; }
  else if (direction < 360) { return '남서풍'; }
}
/*===============================================*/


/*============ 날씨 아이콘 =======================*/
/**
 * 날씨에 맞는 아이콘 리턴
 * @param {number} condition   // Weather Condition Id : (ex) 800
 * @returns string             // weather Condition Image Name : (ex) clear
 */
function getConditionIcon(condition) {
  if ( condition >= 200 && condition <= 299 ) { return iconFileList.Thunderstorm[0];}      // 2xx = Thunderstorm
  else if ( condition >= 300 && condition <= 399 ) { return iconFileList.Drizzle[0]; }     // 3xx = Drizzle
  else if ( condition >= 500 && condition <= 599 ) { return checkRainType(condition); }    // 5xx = Rain
  else if ( condition >= 600 && condition <= 699 ) { return iconFileList.snow[0]; }        // 6xx = Snow
  else if ( condition >= 700 && condition <= 799 ) { return iconFileList.Atmosphere[0]; }  // 7xx = Atmosphere
  else if ( condition >= 801 && condition <= 899 ) { return checkCloudsType(condition); }  // 80x = Clouds
  else { return iconFileList.Clear[0]; }                                                   // 800 = Clear
};

var iconFileList = {
  Clear : ['clear'],
  Clouds : ['cloud_1', 'cloud_2', 'cloud_3'],
  Atmosphere : ['mist'],
  Snow : ['snow'],
  Rain : ['shower_rain', 'rain'],
  Drizzle : ['shower_rain'],
  Thunderstorm : ['thunderstorm'],
}

function checkCloudsType(condition) {
  switch (condition) {
    case 804 :
      return iconFileList.Clouds[2];
    case 803 :
    case 802 :
      return iconFileList.Clouds[1];
    case 801 :
    default : 
      return iconFileList.Clouds[0];
  }
}

function checkRainType(condition) {
  if (condition >= 500 && condition <= 511) {
    return iconFileList.Rain[0];
  } else {
    return iconFileList.Rain[1];
  }
}
/*===============================================*/


/*========= 시간별 습도 바 그래프 =================*/
function setDataBar(target) {
  var bar = target.find($('.bar'));
  bar.each(function() {
    var height = $(this).data('per');
    $(this).css('height', height);
  })
}
/*===============================================*/

/** 지정한 정보 */
function showInfo(){
  var locationInfo = '<h2>' + myArea.name + '</h2>';
  $('#hourly').prepend(locationInfo);
}


$(window).on('load', function() {
  /* 현재 지역의 날씨 정보 */
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(geoWeather, geoError);
  } else {
    alert("현재 위치를 알 수 없습니다.");
  }

  /* 지정한 지역의 정보 */
  showInfo();
  myAreaWeather(myArea);
  myAreaFutureWeather(myArea);
})


})();
