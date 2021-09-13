/*
    메모
    dt에서 추출되는 시간에 x 100을 해주면 현재 날짜와 일치 ex) 1630947600 000
*/


// 변수 모음
let positionNow;
let positionArea;
let dateValue = new Date();
let hourLength;
let dayLength;
let nowWrap = $(".now-wrap");
let hourWrap = $(".hour-wrap");
let daliyWrap = $(".daliy-wrap");
let dayArr = ["일", "월", "화", "수", "목", "금", "토"];
let weatherApi = "17f3cd69b66748594cd1742315476b05";

// ui 액션
$(".menu-btn").click(function(){
    menuOn();
});

$(".close-btn").click(function(){
    menuOff();
});


// 실시간 위치 날씨
navigator.geolocation.getCurrentPosition(res=> {
    positionNow=res;
    weatherLoad(positionNow.coords.latitude, positionNow.coords.longitude);
});


// 다른 지역 날씨
$(".modal-wrap li").click(function(){
    let locationLat = $(this).children(".lat").text().trim();
    let locationLon = $(this).children(".lon").text().trim();

    $(".hour-wrap li").remove();
    $(".daliy-wrap li").remove();

    menuOff();
    weatherLoad(locationLat, locationLon);
});


// 함수 모음
function menuOn () {
    $(".modal-wrap").stop().fadeIn(150);
    $(".menu-btn").hide();
}
function menuOff () {
    $(".modal-wrap").stop().fadeOut(150);
    $(".menu-btn").show();
}

function weatherLoad (lat, lon) {

    // 지역을 불러오기 위한 api
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=kr&appid=${weatherApi}`)
    .then(response => response.json())
    .then(data => {
        $(".now-wrap h2").text(data.name);
    });
    
    // 현재 위치를 불러오기 위한 api
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&lang=kr&units=metric&appid=${weatherApi}`)
    .then(response => response.json())
    .then(data => {
        let curData = data.current;
        let curSunrise = new Date(curData.sunrise*1000);
        let curSunset = new Date(curData.sunset*1000);
        let curIcon = `<img src="http://openweathermap.org/img/wn/${curData.weather[0].icon}.png" alt="w_${curData.weather[0].icon}_icon">`;

        nowWrap.find(".we").html(curIcon);
        nowWrap.find(".te span").text(curData.temp.toFixed(1));

        hourWrap.find(".hour-now .we").html(curIcon);
        hourWrap.find(".hour-now .te span").text(curData.temp.toFixed(1));

        // 다른 시간 날씨 정보 불러오기
        for(hourLength=1; hourLength<=24; hourLength+=1) {
            hourWrap.find("ul").append(
                `<li>
                    <div class="ti">${new Date(data.hourly[hourLength].dt*1000).getHours()}시</div>
                    <div class="we">
                        <img src="http://openweathermap.org/img/wn/${data.hourly[hourLength].weather[0].icon}.png" alt="w_${data.hourly[hourLength].weather[0].icon}_icon">
                    </div>
                    <div class="te">${data.hourly[hourLength].temp.toFixed(1)}&deg;</div>
                </li>`
            );
        }

        for(dayLength=1; dayLength<=7; dayLength+=1) {
            daliyWrap.find("ul").append(
                `<li>
                    <div class="ti">${dayArr[new Date(data.daily[dayLength].dt*1000).getDay()]}요일</div>
                    <div class="we">
                        <img src="http://openweathermap.org/img/wn/${data.daily[dayLength].weather[0].icon}.png" alt="w_${data.daily[dayLength].weather[0].icon}_icon">
                    </div>
                    <div class="te">${data.daily[dayLength].temp.day.toFixed(1)}&deg;</div>
                </li>`
            );
        }

        // 일출
        nowWrap.find(".sr span.hour").text(curSunrise.getHours());
        nowWrap.find(".sr span.min").text(curSunrise.getMinutes());

        // 일몰
        nowWrap.find(".ss span.hour").text(curSunset.getHours());
        nowWrap.find(".ss span.min").text(curSunset.getMinutes());

        // 체감온도 & 풍속
        nowWrap.find(".fe span").text(curData.feels_like.toFixed(1));
        nowWrap.find(".wi span").text(curData.wind_speed);

        // 습도 & 자외선 지수
        nowWrap.find(".hu span").text(curData.humidity);
        nowWrap.find(".uv span").text(curData.uvi);
    })
    .catch(error => console.log("error"));
    
}
