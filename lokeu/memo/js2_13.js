/*
    [2.13] while과 for 반복문
*/

// 반복문의 기본 문법
let i = 0;
while (i < 3) {
  alert(i);
  i++;
}

// while의 값이 0이 되면 falsy 처리 되므로 반복문이 멈춘다
let o = 3;
while (o) {
  alert(o);
  o--;
}

// {}의 내용이 한 줄이면 생략이 가능하다!

// do..while 반복문
let k = 0
do {
  alert(k);
  k++;
} while (k < 3);
// do..while 문법은 본문을 최소한 한번이라도 실행하고 싶을 때 사용!

// for 반복문
for (let e = 0; e < 3; e++) {
  alert(e);
}
// 반복문 안에서 선언하는 변수를 인라인 변수 선언이라 한다.
// 인라인 변수 선언은 반복문 안에서만 접근 가능.
let u = 0;
for (; u<3;) {
  alert(u++);
}
// 위 처럼 구성요소 생략해서 사용이 가능하다.

// 반복문을 빠져나오고 싶을 땐 break 사용하면 해당 반복문이 바로 중단
// 주로 [무한 반복문 + break] 사용

// 다음 반복문으로 넘기고 싶을 땐 continue 사용
// continue는 현재 반복을 종료 시키고 다음 반복으로 넘기고 싶을 때 사용

// ? 오른쪽에는 break나 continue가 올 수 없다

// 여러 개의 중첩 반복문을 한 번에 빠져나와야 하는 경우 레이블을 사용한다.
