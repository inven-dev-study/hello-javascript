// 2 자바스크립트 기본
// 2.4 변수와 상수

/* 
변수
    var 대신 let 키워드 사용
*/

let message = 'Hello!'; // 변수를 정의하고 값을 할당합니다.
alert(message); // Hello!
let user = 'John', age = 25, message = 'Hello'; // 한줄에 여러 변수 선언 가능


/* 
변수명명규칙
    변수명에는 오직 문자와 숫자, 그리고 기호 $와 _만 들어갈 수 있습니다.
    첫 글자는 숫자가 될 수 없다.
    카멜표기법(className)
    대소문자 구분(apple와 AppLE은 서로 다른 변수)
    예약어 사용불가(예시: let, class, return, function)
*/
// 
let userName;
let test123;
let $ = 1; // '$'라는 이름의 변수를 선언합니다.
let _ = 2; // '_'라는 이름의 변수를 선언합니다.
alert($ + _); // 3


let 1a; // 변수명은 숫자로 시작해선 안 됩니다.
let my-name; // 하이픈 '-'은 변수명에 올 수 없습니다.

let let = 5; // 'let'을 변수명으로 사용할 수 없으므로 에러!
let return = 5; // 'return'을 변수명으로 사용할 수 없으므로 에러!

/* 
상수
    const 키워드 사용
    상수는 재할당할 수 없으므로 상수를 변경하려고 하면 에러가 발생
    대문자상수는 하드 코딩한 별칭을 만들때 사용
*/

const myBirthday = '18.04.1982';
myBirthday = '01.01.2001'; // error, can't reassign the constant!


const COLOR_RED = "#F00";
const COLOR_GREEN = "#0F0";
const COLOR_BLUE = "#00F";
const COLOR_ORANGE = "#FF7F00";

// 색상을 고르고 싶을 때 별칭을 사용할 수 있게 되었습니다.
let color = COLOR_ORANGE;
alert(color); // #FF7F00

/* 
바람직한 변수명
    변수명은 간결하고, 명확해야 합니다
    data와 value는 나쁜 이름의 예시
*/

/* 
질문?
    오래된 방식? var 와 차이
    전역변수(Global Variable)와 지역변수(Local Variable) ?? 변수명 중복??
*/