'use strict';

// Hourly forecast: unavailable
// Daily forecast: unavailable
// Calls per minute: 60
// 3 hour forecast: 5 days

// 현재 api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
// one call
// https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=current,hourly,daily&appid={API key}

const API_KEY = '17f3cd69b66748594cd1742315476b05';
const weatherRootElement = document.getElementById('weatherRoot');
const currentLocationElement = document.getElementById('currentLocation');
const currentIconElement = document.getElementById('currentIcon');
const currentPhraseValueElement = document.getElementById('currentPhraseValue');
const currentTempValueElement = document.getElementById('currentTempValue');
const currentTempMaxElement = document.getElementById('currentTempMax');
const currentTempMinElement = document.getElementById('currentTempMin');
const dailyItemsElement = document.getElementById('dailyWeatherItems');
const hourlyItemsElement = document.getElementById('hourlyWeatherItems');

/**
 * 현재  위치정보  받아오기
 */
function getGeolocation() {
  navigator.geolocation.getCurrentPosition(
    geolocationSuccessCallback,
    geolocationErrorCallback
  );
}

/**
 * 위치정보 에러 콜백
 * @param {에러} err
 */
function geolocationErrorCallback(err) {
  console.log(`geolocationErrorCallback ${err}`);
  alert(err);
}

/**
 * 위취정보 성고 콜백
 * @param {위치정보} pos
 */
function geolocationSuccessCallback(pos) {
  const coords = pos.coords;
  fetchCurrentWeatherJson(coords);
  fetchOneCallWeatherJson(coords);
}

/**
 * 좌표에 의한 날씨 정보 가져오기(current api)
 * @param {위치 좌표} coords
 */
function fetchCurrentWeatherJson(coords) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${API_KEY}`
  )
    .then((response) => response.json())
    .then((json) => {

      displayCurrentWeather(json);
    });
}

/**
 * 현재 날씨 보여주기
 * @param {날씨정보 json} json
 */
function displayCurrentWeather(weatherJson) {
  let currentWeather = weatherJson.weather[0];
  let currentMain = weatherJson.main;
  let tempValue = currentMain.temp;
  let icon = currentWeather.icon;
  let weatherMain = currentWeather.main;
  let isNight = icon.includes('n');

  if(isNight){
    weatherRootElement.style = `background:linear-gradient(to top, grey, 30%, var(--black-color));`;
  }else{
    weatherRootElement.style = `background:linear-gradient(to top, skyblue, 70%, rgb(112, 112, 247));`;
  }
  
  currentIconElement.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
  currentLocationElement.textContent = weatherJson.name;
  currentPhraseValueElement.textContent = weatherMain;
  currentTempValueElement.textContent = convertTempString(
    calTempValue(tempValue)
  );
}

/**
 * 좌표에 의한 날씨 정보 가져오기(oncall api)
 * @param {위치 좌표} coords
 */
function fetchOneCallWeatherJson(coords) {
  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.latitude}&lon=${coords.longitude}&exclude=current,minutely&appid=${API_KEY}`
  )
    .then((response) => response.json())
    .then((json) => {
      displayHourlyWeather(json);
      displayDailyWeather(json);
    });
}

/**
 * 시간별 날씨정보 보여주기
 * @param {날씨정보 json} weatherJson
 */
function displayHourlyWeather(weatherJson) {
  const listItems = weatherJson.hourly;
  for (let index = 0; index < listItems.length; index++) {
    const item = listItems[index];
    hourlyItemsElement.appendChild(
      createHourlyListItem(item, index)
    );
  }
}
/**
 * 일자별 날씨정보 보여주기
 * @param {날씨정보 weatherJson} weatherJson
 */
function displayDailyWeather(weatherJson) {
  const listItems = weatherJson.daily;
  for (let index = 0; index < listItems.length; index++) {
    const item = listItems[index];
    if (index == 0) {
      currentTempMaxElement.textContent = `최고:${convertTempString(
        calTempValue(item.temp.max)
      )}`;
      currentTempMinElement.textContent = `최저:${convertTempString(
        calTempValue(item.temp.min)
      )}`;
    }
    dailyItemsElement.appendChild(createDailyListItem(item, index));
  }
}

/**
 * 두자리 숫자형 문자열 반환
 * @param {숫자} n
 * @returns
 */
function getNumberFormat(number) {
  return number >= 10 ? number : '0' + number;
}
/**
 * index에 해당하는 요일 반환
 * @param {요일에 해당하는 index} date
 * @returns
 */
function getWeekDay(date) {
  let days = ['일', '월', '화', '수', '목', '금', '토'];
  return days[date.getDay()];
}

/**
 * 현재일자 비교
 * @param {일자} day
 * @returns
 */
function isToday(day) {
  let nowDate = new Date();
  return day == nowDate.getDate();
}
/**
 * 시간별 날씨 정보 DOM 반환
 * @param {시간별 날씨정보} item
 * @param {인덱스} index
 * @returns
 */
function createHourlyListItem(item, index) {
  let dt = item.dt; // unix timestamp
  let date = new Date(dt * 1000);
  const hour = getNumberFormat(date.getHours());
  const itemDay = date.getDate();
  const temp = item.temp;
  const weatherIcon = item.weather[0].icon;
  const precipPercent = item.pop;

  let containerElement = document.createElement('div');
  containerElement.className = 'container';

  let isSameDay = isToday(itemDay);
  let hourStr = `${hour}시`;
  if (!isSameDay && hour == '00') {
    const month = getNumberFormat(date.getMonth() + 1);
    const day = getNumberFormat(date.getDate());
    hourStr = `${month}.${day}`;
  }
  let hourTextElement = createSpanElement(
    'hourText',
    index == 0 ? '지금' : `${hourStr}`
  );

  let iconPrecipWrapperElement = document.createElement('div');
  iconPrecipWrapperElement.className = 'iconPrecipWrapper';

  let iconImageElement = document.createElement('img');
  iconImageElement.className = 'iconImage';
  iconImageElement.src = `http://openweathermap.org/img/wn/${weatherIcon}.png`;
  iconPrecipWrapperElement.appendChild(iconImageElement);
  if (!isEmpty(precipPercent) && precipPercent > 0) {
    let hourlyPrecipElement = createSpanElement(
      'hourlyPrecip',
      `${Math.floor(precipPercent * 100)}%`
    );
    iconPrecipWrapperElement.appendChild(hourlyPrecipElement);
  }

  let tempValueElement = createSpanElement(
    'tempValue',
    convertTempString(calTempValue(temp))
  );

  containerElement.appendChild(hourTextElement);
  containerElement.appendChild(iconPrecipWrapperElement);
  containerElement.appendChild(tempValueElement);
  return containerElement;
}

/**
 *
 * 일자별 날씨 정보 DOM 반환
 * @param {일자별 날씨정보} item
 * @param {인덱스} index
 * @returns
 */
function createDailyListItem(item, index) {
  let dt = item.dt; // unix timestamp
  let date = new Date(dt * 1000);
  const month = getNumberFormat(date.getMonth() + 1);
  const day = getNumberFormat(date.getDate());
  const weekDay = getWeekDay(date);
  const tempMin = item.temp.min;
  const tempMax = item.temp.max;
  const weatherIcon = item.weather[0].icon;
  const precipPercent = item.pop;

  let parentElement = document.createElement('li');
  parentElement.className = 'item';
  let containerElement = document.createElement('div');
  containerElement.className = 'container';
  let dailyTextElement = createSpanElement(
    'dailyText',
    index == 0 ? '오늘' : `${weekDay} (${month}.${day})`
  );

  let iconPrecipWrapperElement = document.createElement('div');
  iconPrecipWrapperElement.className = 'iconPrecipWrapper';

  let iconImageElement = document.createElement('img');
  iconImageElement.className = 'iconImage';
  iconImageElement.src = `http://openweathermap.org/img/wn/${weatherIcon}.png`;

  iconPrecipWrapperElement.appendChild(iconImageElement);
  if (!isEmpty(precipPercent) && precipPercent > 0) {
    let dailyPrecipElement = createSpanElement('dailyPrecip', `${Math.floor(precipPercent * 100)}%`);
    iconPrecipWrapperElement.appendChild(dailyPrecipElement);
  }

  let tempHighValueElement = createSpanElement(
    'tempHighValue',
    convertTempString(calTempValue(tempMax))
  );

  let tempLowValueElement = createSpanElement(
    'tempLowValue',
    convertTempString(calTempValue(tempMin))
  );

  containerElement.appendChild(dailyTextElement);
  containerElement.appendChild(iconPrecipWrapperElement);
  containerElement.appendChild(tempHighValueElement);
  containerElement.appendChild(tempLowValueElement);
  parentElement.appendChild(containerElement);
  return parentElement;
}
/**
 * span DOM 반환
 * @param {클래스명} className
 * @param {문자} textContent
 * @returns
 */
function createSpanElement(className, textContent) {
  let spanElement = document.createElement('span');
  spanElement.className = className;
  spanElement.textContent = textContent;
  return spanElement;
}
/**
 * 섭씨 온도 계산하여 반환
 * @param {온도} tempValue
 * @returns
 */
function calTempValue(tempValue) {
  return Math.round(tempValue - 272.15);
}
/**
 * 섭씨 온도 문자열 반환
 * @param {온도} value
 * @returns
 */
function convertTempString(tempValue) {
  return `${tempValue}°`;
}
/**
 * 빈문자열 체크
 * @param {문자열} str
 * @returns
 */
function isEmpty(str) {
  if (typeof str == 'undefined' || str == null || str == '') return true;
  else return false;
}

getGeolocation();
