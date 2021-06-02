"use strict";

// ## if와 '?'를 사용한 조건 처리

/* 
'if’문
    if(...)문은 괄호 안에 true이면 코드 블록이 실행

*/

let year = prompt("ECMAScript-2015 명세는 몇 년도에 출판되었을까요?", "");

if (year == 2015) {
  alert("정답입니다!");
  alert("아주 똑똑하시네요!");
}

// 불린형으로의 변환
let cond = year == 2015; // 동등 비교를 통해 true/false 여부를 결정합니다.

if (cond) {
  // ...
}

// 'else’절
if (year == 2015) {
  alert("정답입니다!");
} else {
  alert("오답입니다!"); // 2015 이외의 값을 입력한 경우
}

// 'else if’로 복수 조건 처리하기

if (year < 2015) {
  alert("숫자를 좀 더 올려보세요.");
} else if (year > 2015) {
  alert("숫자를 좀 더 내려보세요.");
} else {
  alert("정답입니다!");
}

//   조건부 연산자 ‘?’
let accessAllowed;
let age = prompt("나이를 입력해 주세요.", "");

// if (age > 18) {
//   accessAllowed = true;
// } else {
//   accessAllowed = false;
// }

// alert(accessAllowed);

// 연산자 우선순위 규칙에 따라, 비교 연산 'age > 18'이 먼저 실행됩니다.
// (조건문을 괄호로 감쌀 필요가 없습니다.)
let accessAllowed = age > 18 ? true : false;
// 동일하게 동작함
// let accessAllowed = age > 18;

// 다중 ‘?’

// let age = prompt('나이를 입력해주세요.', 18);

let message =
  age < 3
    ? "아기야 안녕?"
    : age < 18
    ? "안녕!"
    : age < 100
    ? "환영합니다!"
    : "나이가 아주 많으시거나, 나이가 아닌 값을 입력 하셨군요!";

alert(message);

// 부적절한 ‘?’
let company = prompt("자바스크립트는 어떤 회사가 만들었을까요?", "");

company == "Netscape" ? alert("정답입니다!") : alert("오답입니다!");
