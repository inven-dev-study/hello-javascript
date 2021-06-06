"use strict";

let inputDatas = [];  // 입력한 모든 값들의 배열
let inputNumber = ""; // 입력한 값 

/**
 * 입력한 값들의 계산식 표시
 * @param {계산식} text 
 */
function displayInputPressionAndResult(text = "") {
    let displayStr = text.replace('/', '&divide;');
  let element = document.querySelector(".inputPressionText");
  element.innerHTML = displayStr;
}

/**
 * 입력한 숫자 표시
 * @param {입력한 숫자} text 
 */
function displayInputIntText(text) {
  if (text === undefined) {
    text = "";
  }
  let element = document.querySelector(".inputAndResultText");
  element.innerHTML = text;
}

/**
 * 버튼 클릭 이벤트 
 * @param {이벤트} event 
 * @returns 
 */
function onButtonClick(event) {
  const dataset = event.target.dataset;
  const key = dataset.key;
  const value = dataset.value;

  if (key == null || value == null) {
    return;
  }

  switch (key) {
    case "operator":
      operatorButtonClick(value);
      break;

    case "number":
      numberButtonClick(value);
      break;

    case "all-clear":
      allClearButtonClick();
      break;

    case "clear":
      clearButtonClick();
      break;

    case "decimal":
      decimalButtonClick(value);
      break;

    case "equal":
      equalButtonClick();
      break;
    case "back":
      backButtonClick();
      break;

    default:

      break;
  }
}

/**
 * 백버튼 클릭
 * @returns 
 */
function backButtonClick(){
  if (inputNumber == "") {
    return;
  }
  inputNumber = inputNumber.slice(0, -1);
  displayInputIntText(inputNumber);
  displayInputPressionAndResult(inputDatas.join(" ") + " " + inputNumber);
}

/**
 * 연산자 버튼 클릭
 * @param {연산자 문자} value 
 * @returns 
 */
function operatorButtonClick(value) {

  if (inputDatas.length == 0 && inputNumber == "") {
    if (value == "-"){
      inputNumber = value;
      displayInputIntText(inputNumber);
      return;
    }else{
      return;
    }
    
  }

  
  if (inputDatas.length == 0 && inputNumber == "-") {
    if (value != "-"){
      inputNumber = "";
      displayInputIntText(inputNumber);
    }
      
    return; 
  }

  if (inputNumber == "") {
    inputDatas.pop();
    inputDatas.push(value);
    displayInputPressionAndResult(inputDatas.join(" "));
    return;
  }

  inputDatas.push(inputNumber);
  inputDatas.push(value);
  displayInputPressionAndResult(inputDatas.join(" "));

  inputNumber = "";
  displayInputIntText(inputNumber);
}

/**
 * 숫자 버튼 클릭
 * @param {숫자} value 
 * @returns 
 */
function numberButtonClick(value) {
  if (Number(value) === 0 && inputNumber == "0") {
    return;
  }
  let newInputNumberText =
    (inputNumber == "0" && Number(value) > 0) ? value : inputNumber.concat("", value);

  inputNumber = newInputNumberText;
  displayInputIntText(newInputNumberText);
  displayInputPressionAndResult(inputDatas.join(" ") + " " + inputNumber);
}

/**
 * 소수점 클릭
 * @param {소수점} value 
 * @returns 
 */
function decimalButtonClick(value) {
  let tempNumberStr = inputNumber.concat("", value).concat("", "0");
  let isInt = isDecimal(tempNumberStr);
  if (!isInt) {
    return;
  }
  let newInputDecialText = inputNumber.concat("", value);
  inputNumber = newInputDecialText;
  displayInputIntText(newInputDecialText);
}

/**
 * 결과값 출력
 */
function equalButtonClick() {
  if (inputNumber == "") {
    inputDatas.pop();
  } else {
    inputDatas.push(inputNumber);
  }
  let inputStr = inputDatas.join(" ");
  let result = eval(inputStr);
  inputNumber = "";
  inputDatas = [];
  displayInputPressionAndResult(`${inputStr} = ${result}`);

  if (result === Infinity){
      alert('결과값이 너무 큽니다.(Infinity)');
  }
}

/**
 * claer 버튼 클릭
 */
function clearButtonClick() {
  inputNumber = "";
  displayInputIntText(inputNumber);
  displayInputPressionAndResult(inputDatas.join(" "));
}

/**
 * 초기화 allClear 버튼 클릭
 */
function allClearButtonClick() {
  inputDatas = [];
  inputNumber = "";
  displayInputPressionAndResult(inputDatas.join(" "));
  displayInputIntText(inputNumber);
}

/**
 * 소수점 체크
 * @param {입력숫자} str 
 * @returns 
 */
function isDecimal(str) {
  return !isNaN(str) && Number.isInteger(parseFloat(str));
}

/**
 * 이벤트 리스너 설정
 */
function setEventListeners() {
  const container = document.querySelector(".container");
  container.addEventListener("click", (event) => onButtonClick(event));
}

displayInputPressionAndResult(inputDatas.join(" "));
displayInputIntText();
setEventListeners();
