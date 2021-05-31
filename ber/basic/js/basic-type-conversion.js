// 2 자바스크립트 기본
// 2.7 형 변환

/*
문자형으로 변환
*/

let value = true;
alert(typeof value); // boolean

value = String(value); // 변수 value엔 문자열 "true"가 저장됩니다.
alert(typeof value); // string

/* 
숫자형 변환
    글자가 들어가 있는 문자열을 숫자형으로 변환하려고 하면, 그 결과는 NaN
    null => 0으로 변환, undefined => NaN, true => 1, false => 0
*/
alert( "6" / "2" ); // 3, 문자열이 숫자형으로 자동변환된 후 연산이 수행됩니다.

let str = "123";
alert(typeof str); // string

let num = Number(str); // 문자열 "123"이 숫자 123으로 변환됩니다.
alert(typeof num); // number

let age = Number("임의의 문자열 123");
alert(age); // NaN, 형 변환이 실패합니다.

alert( Number("   123   ") ); // 123
alert( Number("123z") );      // NaN ("z"를 숫자로 변환하는 데 실패함)
alert( Number(true) );        // 1
alert( Number(false) );       // 0
alert( Number(null) );        // 0
alert( Number(undefined) );   // NaN

/* 
불린형 변환
    숫자 0, 빈 문자열, null, undefined, NaN과 같이 직관적으로도 “비어있다고” 느껴지는 값들은 false
    그외 true
*/
alert( Boolean("") ); // 빈 문자열(false)
alert( Boolean(null) ); // false
alert( Boolean(undefined) ); // false
alert( Boolean(NaN) ); // false
alert( Boolean(0) ); // 숫자 0(false)

alert( Boolean(1) ); // 숫자 1(true)
alert( Boolean("hello") ); // 문자열(true)
alert( Boolean("0") ); // true
alert( Boolean(" ") ); // 공백이 있는 문자열도 비어있지 않은 문자열이기 때문에 true로 변환됩니다.

/*
질문? : 
    
 */
