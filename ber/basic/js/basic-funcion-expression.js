"use strict";

/* 
함수 표현식

*/
// 함수 표현식
let sayHi = function () {
  alert("Hello");
};
// 함수 선언문
function sayHi() {
  // (1) 함수 생성
  alert("Hello");
}

let func = sayHi; // (2) 함수 복사

func(); // Hello     // (3) 복사한 함수를 실행(정상적으로 실행됩니다)!
sayHi(); // Hello    //     본래 함수도 정상적으로 실행됩니다.

// 콜백 함수
//   함수 ask의 인수, showOk와 showCancel은 콜백 함수 또는 콜백이라고 불립니다.
function ask(question, yes, no) {
  if (confirm(question)) yes();
  else no();
}

function showOk() {
  alert("동의하셨습니다.");
}

function showCancel() {
  alert("취소 버튼을 누르셨습니다.");
}

// 사용법: 함수 showOk와 showCancel가 ask 함수의 인수로 전달됨
ask("동의하십니까?", showOk, showCancel);

// 함수 표현식 vs 함수 선언문
// 함수 선언문: 함수는 주요 코드 흐름 중간에 독자적인 구문 형태로 존재
// 함수 선언문
function sum(a, b) {
  return a + b;
}

//   함수 표현식: 함수는 표현식이나 구문 구성(syntax construct) 내부에 생성됩니다. 아래 예시에선 함수가 할당 연산자 =를 이용해 만든 “할당 표현식” 우측에 생성되었습니다.
// 함수 표현식
let sum = function (a, b) {
  return a + b;
};
//   함수 표현식은 실제 실행 흐름이 해당 함수에 도달했을 때 함수를 생성합니다. 따라서 실행 흐름이 함수에 도달했을 때부터 해당 함수를 사용할 수 있습니다. 함수 선언문은 함수 선언문이 정의되기 전에도 호출할 수 있습니다.
/* 함수 선언문
sayHi("John"); // Hello, John

function sayHi(name) {
  alert( `Hello, ${name}` );
}
*/
/* 함수 표현식
sayHi("John"); // error!

let sayHi = function(name) {  // (*) 마술은 일어나지 않습니다.
  alert( `Hello, ${name}` );
};
*/
let age = 16; // 16을 저장했다 가정합시다.

if (age < 18) {
  welcome(); // \   (실행)
  //  |
  function welcome() {
    //  |
    alert("안녕!"); //  |  함수 선언문은 함수가 선언된 블록 내
  } //  |  어디에서든 유효합니다
  //  |
  welcome(); // /   (실행)
} else {
  function welcome() {
    alert("안녕하세요!");
  }
}

// 여기는 중괄호 밖이기 때문에
// 중괄호 안에서 선언한 함수 선언문은 호출할 수 없습니다.

welcome(); // Error: welcome is not defined

// 함수 선언문과 함수 표현식 중 무엇을 선택해야 하나요?

// 함수 선언문을 이용해 함수를 선언하는 걸 먼저 고려하는 게 좋습니다. 그러나 어떤 이유로 함수 선언 방식이 적합하지 않거나, (위 예제와 같이) 조건에 따라 함수를 선언해야 한다면 함수 표현식을 사용해야 합니다.

/**
 * 
 * 요약
함수는 값입니다. 따라서 함수도 값처럼 할당, 복사, 선언할 수 있습니다.
“함수 선언(문)” 방식으로 함수를 생성하면, 함수가 독립된 구문 형태로 존재하게 됩니다.
“함수 표현식” 방식으로 함수를 생성하면, 함수가 표현식의 일부로 존재하게 됩니다.
함수 선언문은 코드 블록이 실행되기도 전에 처리됩니다. 따라서 블록 내 어디서든 활용 가능합니다.
함수 표현식은 실행 흐름이 표현식에 다다랐을 때 만들어집니다.
 */
