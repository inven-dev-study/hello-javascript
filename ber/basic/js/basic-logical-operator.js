"use strict";

/*
논리 연산자
    자바스크립트엔 세 종류의 논리 연산자 ||(OR), &&(AND), !(NOT)이 있습니다.
 */

// || (OR)

alert(true || true); // true
alert(false || true); // true
alert(true || false); // true
alert(false || false); // false

let hour = 12;
let isWeekend = true;

if (hour < 10 || hour > 18 || isWeekend) {
  alert("영업시간이 아닙니다."); // 주말이기 때문임
}

/*
첫 번째 truthy를 찾는 OR 연산자 ‘||’
*/

alert(null || 0 || 1); // 1 (1은 truthy임)
alert(undefined || null || 0); // 0 (모두 falsy이므로, 마지막 값을 반환함)

// 1. 변수 또는 표현식으로 구성된 목록에서 첫 번째 truthy 얻기
let firstName = "";
let lastName = "";
let nickName = "바이올렛";

alert(firstName || lastName || nickName || "익명"); // 바이올렛
// 2. 단락 평가
true || alert("not printed");
false || alert("printed");

/* 
&& (AND)
    AND 연산자 &&의 우선순위는 OR 연산자 ||보다 높습니다.
*/
let hour = 12;
let minute = 30;

if (hour == 12 && minute == 30) {
  alert("현재 시각은 12시 30분입니다.");
}

// 첫 번째 falsy를 찾는 AND 연산자 ‘&&’

// 첫 번째 피연산자가 truthy이면,
// AND는 두 번째 피연산자를 반환합니다.
alert(1 && 0); // 0
alert(1 && 5); // 5

// 첫 번째 피연산자가 falsy이면,
// AND는 첫 번째 피연산자를 반환하고, 두 번째 피연산자는 무시합니다.
alert(null && 5); // null
alert(0 && "아무거나 와도 상관없습니다."); // 0

alert(1 && 2 && null && 3); // null
alert(1 && 2 && 3); // 마지막 값, 3

// &&의 우선순위가 ||보다 높습니다.

/* 
! (NOT)
    NOT 연산자의 우선순위는 모든 논리 연산자 중에서 가장 높기 때문에 항상 &&나 || 보다 먼저 실행
*/

alert(!true); // false
alert(!0); // true
// NOT을 두 개 연달아 사용(!!)하면 값을 불린형으로 변환
alert(!!"non-empty string"); // true
alert(!!null); // false
