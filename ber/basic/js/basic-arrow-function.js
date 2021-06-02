"use strict";

/* 
화살표 함수 기본
 */

let sum = (a, b) => a + b;

/* 위 화살표 함수는 아래 함수의 축약 버전입니다.

let sum = function(a, b) {
  return a + b;
};
*/

alert(sum(1, 2)); // 3

// 인수가 하나밖에 없다면 인수를 감싸는 괄호를 생략할 수 있습니다.
let double = (n) => n * 2;
// let double = function(n) { return n * 2 }과 거의 동일합니다.

alert(double(3)); // 6

//  인수가 하나도 없을 땐 괄호를 비워놓으면 됩니다. 다만, 이 때 괄호는 생략할 수 없습니다
let sayHi = () => alert("안녕하세요!");

sayHi();

// 본문이 여러 줄인 화살표 함수
let sum = (a, b) => {
  // 중괄호는 본문 여러 줄로 구성되어 있음을 알려줍니다.
  let result = a + b;
  return result; // 중괄호를 사용했다면, return 지시자로 결괏값을 반환해주어야 합니다.
};

alert(sum(1, 2)); // 3
