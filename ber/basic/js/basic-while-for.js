"use strict";

// while과 for 반복문

// ‘while’ 반복문

let i = 0;
while (i < 3) {
  // 0, 1, 2가 출력됩니다.
  alert(i);
  i++;
}

// 본문이 한 줄이면 대괄호를 쓰지 않아도 됩니다.
// 반복문 본문이 한 줄짜리 문이라면 대괄호 {…}를 생략할 수 있습니다.
// let i = 3;
// while (i) alert(i--);

// ‘do…while’ 반복문
// 본문을 최소한 한번이라도 실행하고 싶을 때만 사용
let i = 0;
do {
  alert(i);
  i++;
} while (i < 3);

// ‘for’ 반복문
for (let i = 0; i < 3; i++) {
  // 0, 1, 2가 출력됩니다.
  alert(i);
}

// 구성 요소 생략하기
let i = 0; // i를 선언하고 값도 할당하였습니다.

for (; i < 3; i++) {
  // 'begin'이 필요하지 않기 때문에 생략하였습니다.
  alert(i); // 0, 1, 2
}
let i = 0;

for (; i < 3; ) {
  alert(i++);
}

// 반복문 빠져나오기

let sum = 0;

while (true) {
  let value = +prompt("숫자를 입력하세요.", "");

  if (!value) break; // (*)

  sum += value;
}
alert("합계: " + sum);

// 다음 반복으로 넘어가기
for (let i = 0; i < 10; i++) {
  // 조건이 참이라면 남아있는 본문은 실행되지 않습니다.
  if (i % 2 == 0) continue;

  alert(i); // 1, 3, 5, 7, 9가 차례대로 출력됨
}

/* 
break/continue와 레이블
    레이블은 마음대로 '점프’할 수 있게 해주지 않습니다.
    continue 지시자를 레이블과 함께 사용하는 것도 가능
    break와 continue는 반복문 안에서만 사용할 수 있고, 레이블은 반드시 break이나 continue 지시자 위에 있어야 합니다.
*/

labelName: for (let i = 0; i < 3; i++) {
  // ...
}

outer: for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    let input = prompt(`(${i},${j})의 값`, "");

    // 사용자가 아무것도 입력하지 않거나 Cancel 버튼을 누르면 두 반복문 모두를 빠져나옵니다.
    if (!input) break outer; // (*)

    // 입력받은 값을 가지고 무언가를 함
  }
}
alert("완료!");
