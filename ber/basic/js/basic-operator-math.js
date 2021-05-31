// 2 자바스크립트 기본

/* 
2.7 기본 연산자와 수학
    
*/
/*
나머지 연산자 %
    
*/
alert( 5 % 2 ); // 5를 2로 나눈 후의 나머지인 1을 출력
alert( 8 % 3 ); // 8을 3으로 나눈 후의 나머지인 2를 출력

/*
거듭제곱 연산자 **
    
*/
alert( 2 ** 2 ); // 4  (2 * 2)
alert( 2 ** 3 ); // 8  (2 * 2 * 2)
alert( 2 ** 4 ); // 16 (2 * 2 * 2 * 2)
alert( 4 ** (1/2) ); // 2 (1/2 거듭제곱은 제곱근)
alert( 8 ** (1/3) ); // 2 (1/3 거듭제곱은 세제곱근)

/* 
이항 연산자 '+'와 문자열 연결

*/
let s = "my" + "string";
alert(s); // mystring
alert( '1' + 2 ); // "12"
alert( 2 + '1' ); // "21"
alert(2 + 2 + '1' ); // '221'이 아니라 '41'이 출력됩니다.
alert( 6 - '2' ); // 4, '2'를 숫자로 바꾼 후 연산이 진행됩니다.
alert( '6' / '2' ); // 3, 두 피연산자가 숫자로 바뀐 후 연산이 진행됩니다.

/*
단항 연산자 +와 숫자형으로의 변환

*/
// 숫자에는 아무런 영향을 미치지 않습니다.
let x = 1;
alert( +x ); // 1

let y = -2;
alert( +y ); // -2

// 숫자형이 아닌 피연산자는 숫자형으로 변화합니다.
alert( +true ); // 1
alert( +"" );   // 0

let apples = "2";
let oranges = "3";

alert( apples + oranges ); // 23, 이항 덧셈 연산자는 문자열을 연결합니다.


// 이항 덧셈 연산자가 적용되기 전에, 두 피연산자는 숫자형으로 변화합니다.
alert( +apples + +oranges ); // 5

// `Number(...)`를 사용해서 같은 동작을 하는 코드를 작성할 수 있지만, 더 기네요.
// alert( Number(apples) + Number(oranges) ); // 5

/*
할당 연산자

*/
let x = 2 * 2 + 1;

alert( x ); // 5


let a = 1;
let b = 2;

let c = 3 - (a = b + 1);

alert( a ); // 3
alert( c ); // 0

/*
복합 할당 연산자
*/

let n = 2;
n += 5; // n은 7이 됩니다(n = n + 5와 동일).
n *= 2; // n은 14가 됩니다(n = n * 2와 동일).

alert( n ); // 14


let n = 2;

n *= 3 + 5;

alert( n ); // 16  (*=의 우측이 먼저 평가되므로, 위 식은 n *= 8과 동일합니다.)


/*
증/감소 연산자
    증가/감소 연산자는 변수에만 쓸 수 있습니다
*/
let counter = 2;
counter++;      // counter = counter + 1과 동일하게 동작합니다. 하지만 식은 더 짧습니다.
alert( counter ); // 3

let counter = 2;
counter--;      // counter = counter - 1과 동일하게 동작합니다. 하지만 식은 더 짧습니다.
alert( counter ); // 1

let counter = 1;
let a = counter++; // (*) ++counter를 counter++로 바꿈

alert(a); // 1

let counter = 1;
let a = ++counter; // (*)

alert(a); // 2

/* 
비트 연산자
    32비트 정수로 변환하여 이진 연산을 수행
    비트 AND ( & )
    비트 OR ( | )
    비트 XOR ( ^ )
    비트 NOT ( ~ )
    왼쪽 시프트(LEFT SHIFT) ( << )
    오른쪽 시프트(RIGHT SHIFT) ( >> )
    부호 없는 오른쪽 시프트(ZERO-FILL RIGHT SHIFT) ( >>> )
*/

/*
쉼표 연산자
    코드를 짧게 쓰려는 의도로 가끔 사용
*/
let a = (1 + 2, 3 + 4);

alert( a ); // 7 (3 + 4의 결과)

/*
    질문? : 
 */
