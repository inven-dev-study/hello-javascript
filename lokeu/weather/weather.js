/*
    메모
    dt에서 추출되는 시간에 x 100을 해주면 현재 날짜와 일치 ex) 1630947600 000
*/

// 변수 모음
let positionNow;
let positionArea;
let dateValue = new Date();
let hourLength;
let nowWrap = $(".now-wrap");
let hourWrap = $(".hour-wrap");


// 실시간 위치 날씨
navigator.geolocation.getCurrentPosition(res=> {
    positionNow=res;

    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${positionNow.coords.latitude}&lon=${positionNow.coords.longitude}&lang=kr&units=metric&appid=17f3cd69b66748594cd1742315476b05`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        let curData = data.current;

        nowWrap.find(".we").text(curData.weather[0].description);
        nowWrap.find(".te span").text(curData.temp.toFixed(1));

        $(".hour-now .we").text(curData.weather[0].description);
        $(".hour-now .te span").text(curData.temp.toFixed(1));

        for(hourLength=1; hourLength<=24; hourLength+=1) {
            $(".hour-wrap ul").append(
                `<li>
                    <div class="ti">${new Date(data.hourly[hourLength].dt*1000).getHours()}시</div>
                    <div class="we">${data.hourly[hourLength].weather[0].description}</div>
                    <div class="te">${data.hourly[hourLength].temp.toFixed(1)}</div>
                </li>`
            );
        }

        nowWrap.find(".sr span.hour").text(new Date(curData.sunrise*1000).getHours());
        nowWrap.find(".sr span.min").text(new Date(curData.sunrise*1000).getMinutes());

        nowWrap.find(".ss span.hour").text(new Date(curData.sunset*1000).getHours());
        nowWrap.find(".ss span.min").text(new Date(curData.sunset*1000).getMinutes());

        nowWrap.find(".fe span").text(curData.feels_like.toFixed(1));
        nowWrap.find(".wi span").text(curData.wind_speed);

        nowWrap.find(".hu span").text(curData.humidity);
        nowWrap.find(".uv span").text(curData.uvi);
    })
    .catch(error => console.log("error"));
});


// 시간




// 지역별 날씨
// positionArea = "ansan";

// fetch(`https://api.openweathermap.org/data/2.5/weather?q=${positionArea}&lang=kr&appid=17f3cd69b66748594cd1742315476b05`)
// .then(response => response.json())
// .then(json => {
//     console.log(json);
// });



// 함수 모음

// fetchFunc(`onecall?lat=${positionNow.coords.latitude}&lon=${positionNow.coords.longitude}`);
// fetchFunc(`weather?q=${positionArea}`);

// function fetchFunc (cate) {
//     fetch(`https://api.openweathermap.org/data/2.5/${cate}&appid=17f3cd69b66748594cd1742315476b05`)
//     .then(response => response.json())
//     .then(json => {
//         console.log(json);
//     });
// }