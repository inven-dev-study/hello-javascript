"use strict";

/* 
switch문
    case문 안에 break문이 없으면 조건에 부합하는지 여부를 따지지 않고 이어지는 case문을 실행
*/

let a = 2 + 2;

switch (a) {
  case 3:
    alert("비교하려는 값보다 작습니다.");
    break;
  case 4:
    alert("비교하려는 값과 일치합니다.");
    break;
  case 5:
    alert("비교하려는 값보다 큽니다.");
    break;
  default:
    alert("어떤 값인지 파악이 되지 않습니다.");
}

// 여러 개의 "case"문 묶기
let a = 3;

switch (a) {
  case 4:
    alert("계산이 맞습니다!");
    break;

  case 3: // (*) 두 case문을 묶음
  case 5:
    alert("계산이 틀립니다!");
    alert("수학 수업을 다시 들어보는걸 권유 드립니다.");
    break;

  default:
    alert("계산 결과가 이상하네요.");
}

// 자료형의 중요성
let arg = prompt("값을 입력해주세요.");
switch (arg) {
  case "0":
  case "1":
    alert("0이나 1을 입력하셨습니다.");
    break;

  case "2":
    alert("2를 입력하셨습니다.");
    break;

  case 3:
    alert("이 코드는 절대 실행되지 않습니다!");
    break;
  default:
    alert("알 수 없는 값을 입력하셨습니다.");
}
