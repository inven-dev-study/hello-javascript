"use strict";

/*
함수
    함수는 동작 하나만 담당해야 합니다.
*/

// 함수 선언
function showMessage() {
  alert("안녕하세요!");
}

showMessage();
showMessage();

// 지역 변수
function showMessage() {
  let message = "안녕하세요!"; // 지역 변수

  alert(message);
}

showMessage(); // 안녕하세요!

alert(message); // ReferenceError: message is not defined (message는 함수 내 지역 변수이기 때문에 에러가 발생합니다.)

// 외부 변수(전역 변수(global variable))
//   변수는 연관되는 함수 내에 선언하고, 전역 변수는 되도록 사용하지 않는 것이 좋습니다. 비교적 근래에 작성된 코드들은 대부분 전역변수를 사용하지 않거나 최소한으로만 사용합니다. 다만 프로젝트 전반에서 사용되는 데이터는 전역 변수에 저장하는 것이 유용한 경우도 있으니 이 점을 알아두시기 바랍니다.

let userName = "John";

function showMessage() {
  let message = "Hello, " + userName;
  alert(message);
}

showMessage(); // Hello, John

let userName = "John";

function showMessage() {
  let userName = "Bob"; // 같은 이름을 가진 지역 변수를 선언합니다.

  let message = "Hello, " + userName; // Bob
  alert(message);
}

// 함수는 내부 변수인 userName만 사용합니다,
showMessage();

alert(userName); // 함수는 외부 변수에 접근하지 않습니다. 따라서 값이 변경되지 않고, John이 출력됩니다.

// 매개변수(parameter) 인수(argument)
function showMessage(from, text) {
  // 인수: from, text
  alert(from + ": " + text);
}

showMessage("Ann", "Hello!"); // Ann: Hello! (*)
showMessage("Ann", "What's up?"); // Ann: What's up? (**)

/*
기본값
    매개변수에 값을 전달하지 않으면 그 값은 undefined가 됩니다.
    함수를 호출할 때마다 매개변수 기본값을 평가
    '기본값(default value)'을 설정
*/

showMessage("Ann"); // "Ann: undefined"가 출력

// '기본값(default value)'을 설정
function showMessage(from, text = "no text given") {
  alert(from + ": " + text);
}

showMessage("Ann"); // Ann: no text given
// 복잡한 표현식도 기본값으로 설정할 수도 있습니다.

function showMessage(from, text = anotherFunction()) {
  // anotherFunction()은 text값이 없을 때만 호출됨
  // anotherFunction()의 반환 값이 text의 값이 됨
}

// 매개변수가 생략되었거나 빈 문자열("")이 넘어오면 변수에 '빈 문자열'이 할당됩니다.
function showMessage(text) {
  text = text || "빈 문자열";
}

showMessage(); // 빈 문자열

/* 
반환 값
    return문이 없거나 return 지시자만 있는 함수는 undefined를 반환합니다.
    return과 값 사이에 절대 줄을 삽입하지 마세요.
*/

function sum(a, b) {
  return a + b;
}

let result = sum(1, 2);
alert(result); // 3

function checkAge(age) {
  if (age >= 18) {
    return true;
  } else {
    return confirm("보호자의 동의를 받으셨나요?");
  }
}

let age = prompt("나이를 알려주세요", 18);

if (checkAge(age)) {
  alert("접속 허용");
} else {
  alert("접속 차단");
}

function doNothing() {
  return;
}

alert(doNothing() === undefined); // true

// 함수 이름짓기
// 함수는 동작 하나만 담당해야 합니다.
// "get…" – 값을 반환함
// "calc…" – 무언가를 계산함
// "create…" – 무언가를 생성함
// "check…" – 무언가를 확인하고 불린값을 반환함

function showPrimes(n) {
  for (let i = 2; i < n; i++) {
    if (!isPrime(i)) continue;

    alert(i); // a prime
  }
}

// 함수는 중복을 없애려는 용도 외에도 사용할 수 있습니다. 이렇게 함수를 활용하면 코드가 정돈되고 가독성이 높아집니다.
function isPrime(n) {
  for (let i = 2; i < n; i++) {
    if (n % i == 0) return false;
  }
  return true;
}
