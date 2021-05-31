// 2 자바스크립트 기본
// 
/*
2.5 자료형
    자바스크립트의 변수는 자료형에 관계없이 어떤 순간에 문자열일 수 있고 다른 순간엔 숫자가 될 수도 있다. ‘동적 타입(dynamically typed)’ 언어
*/
let message = "hello";
message = 123456;

/* 
숫자형
    숫자형엔 일반적인 숫자 외에 Infinity, -Infinity, NaN같은 '특수 숫자 값(special numeric value)'이 포함
    말이 안 되는 수학 연산을 하더라도 스크립트는 치명적인 에러를 내뿜으며 죽지 않습니다. NaN을 반환하며 연산이 종료될 뿐입니다.
*/
let n = 123;
n = 12.345;

alert( 1 / 0 ); // 무한대
alert( Infinity ); // 무한대
alert( "숫자가 아님" / 2 ); // NaN, 문자열을 숫자로 나누면 오류가 발생합니다.
alert( "숫자가 아님" / 2 + 5 ); // NaN

/*
BigInt
    끝에 'n'이 붙으면 BigInt형 자료입니다.
*/

const bigInt = 1234567890123456789012345678901234567890n;
/*
문자형
    큰따옴표: "Hello"
    작은따옴표: 'Hello'
    역 따옴표(백틱, backtick): `Hello`
*/

let str = "Hello";
let str2 = 'Single quotes are ok too';
let phrase = `can embed another ${str}`;

let name = "John";
// 역따옴표로 변수를 문자열 중간에 삽입
alert( `Hello, ${name}!` ); // Hello, John!
// 역따옴표로 표현식을 문자열 중간에 삽입
alert( `the result is ${1 + 2}` ); // the result is 3

/*
불린형
*/

let nameFieldChecked = true; // 네, name field가 확인되었습니다(checked).
let ageFieldChecked = false; // 아니요, age field를 확인하지 않았습니다(not checked)
let isGreater = 4 > 1; // 비교 결과값 
alert( isGreater ); // true (비교 결과: "yes")


/*
‘null’ 값
    자바스크립트에선 null을 ‘존재하지 않는(nothing)’ 값, ‘비어 있는(empty)’ 값, ‘알 수 없는(unknown)’ 값을 나타내는 데 사용
*/
let age = null;

/*
‘undefined’ 값
    '값이 할당되지 않은 상태’를 나타낼 때 사용
*/

let age;
alert(age); // 'undefined'가 출력됩니다.

let age = 100;
// 값을 undefined로 바꿉니다.
age = undefined;

alert(age); // "undefined"

/* 
객체와 심볼
    객체 : 복잡한 데이터 구조를 표현할 때 사용
    심볼 : 객체의 고유 식별자를 만들 때 사용
*/
/*
type 연산자
    인수의 자료형을 반환
*/

typeof undefined // "undefined"
typeof 0 // "number"
typeof 10n // "bigint"
typeof true // "boolean"
typeof "foo" // "string"
typeof Symbol("id") // "symbol"
typeof Math // "object"  (1)
typeof null // "object"  (2)
typeof alert // "function"  (3)

/*
질문? 
    역 따옴표? vs + 연산자 사용이 더 좋은가?
    객체와 심블 이해가 잘 안됨
*/