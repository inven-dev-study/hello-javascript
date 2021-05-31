// 2 자바스크립트 기본
// 2.9 비교연산자
/* 
불린형 반환

*/

alert( 2 > 1 );  // true
alert( 2 == 1 ); // false
alert( 2 != 1 ); // true

let result = 5 > 4; // 비교 결과를 변수에 할당
alert( result ); // true

/*
문자열 비교
    1. 첫 글자를 비교
    2. 첫 글자가 같으면 두 번째 글자를 같은 방식으로 비교
    정확히는 사전순이 아니라 유니코드 순
    대문자 'A'와 소문자 'a'를 비교했을 때 소문자 'a'가 더 큽니다

*/
alert( 'Z' > 'A' ); // true
alert( 'Glow' > 'Glee' ); // true
alert( 'Bee' > 'Be' ); // true

/*
다른 형을 가진 값 간의 비교
*/
alert( '2' > 1 ); // true, 문자열 '2'가 숫자 2로 변환된 후 비교가 진행됩니다.
alert( '01' == 1 ); // true, 문자열 '01'이 숫자 1로 변환된 후 비교가 진행됩니다.

alert( true == 1 ); // true
alert( false == 0 ); // true


let a = 0;
alert( Boolean(a) ); // false

let b = "0";
alert( Boolean(b) ); // true

alert(a == b); // true!

/*
일치 연산자
    동등 연산자(equality operator) ==은 0과 false를 구별하지 못합니다.
    일치 연산자(strict equality operator) ===를 사용하면 형 변환 없이 값을 비교할 수 있다.
*/

alert( 0 === false ); // false, 피연산자의 형이 다르기 때문입니다.

/*
null이나 undefined와 비교하기
    
*/

// 일치 연산자 ===를 사용하여 null과 undefined를 비교
alert( null === undefined ); // false
// 동등 연산자 ==를 사용하여 null과 undefined를 비교
alert( null == undefined ); // true

/*

null vs 0
*/

alert( null > 0 );  // (1) false
alert( null == 0 ); // (2) false
alert( null >= 0 ); // (3) true (null이 숫자형으로 변환돼 0이 되기 때문)

/*
비교가 불가능한 undefined
*/
alert( undefined > 0 ); // false (1)
alert( undefined < 0 ); // false (2)
alert( undefined == 0 ); // false (3)
/*
질문?
    어떤 양식으로 작성하는게 좋을까? 
*/