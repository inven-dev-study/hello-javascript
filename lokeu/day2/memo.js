/*
    2.10 if와 '?'를 사용한 조건 처리
*/

// 일반적인 if문
let age1 = prompt("나이를 말해보아요", 18);

if(age1 < 3) {
    message1 = "아기야 안녕?";
} else if(age1 < 18) {
    message1 = "학생 안녕";
} else if(age1 < 100) {
    message1 = "어서오세요~"
} else {
    message1 = "나이가 아주 많으시거나, 아닌 값을 입력하셨군요!"
}

alert(message1);


// 조건부 연산자 '?'
let age2 = prompt("나이를 말해보아요", 18);

let message2 = (age2 < 3) ? '아기야 안녕?' :
    (age2 < 18) ? '학생 안녕?' :
    (age2 < 100) ? '어서오세요~' : '나이가 아주 많으시거나, 아닌 값을 입력하셨군요!';

alert(message2);

/*
    2.11 논리 연산자
*/

// 1) ||(or)
// 인수 중 하나만 true여이면 true를 반환
alert( true || true ); // true
alert( true || false ); // true
alert( false || true ); // true
alert( false || false ); // false

// 숫자 1은 true, 숫자 0은 false
if (1 || 0) { //true || false과 동일하게 작동
    alert('truthy!');
}

// 보통 if문에 많이 쓰인다
// if문 안에서 여러 가지 조건을 넣을 수 있다.

/*
    || 연산자는 다음 순서에 따라 수행
    - 왼쪽 피연산자부터 시작해 오른쪽으로 나아간다
    - 각 피연산자를 불린형으로 변환. 변환 후 그 값이 true면 멈추고 해당 피연산자의 변환 전 원래 값을 반환합니다.
    - 피연산자 모두를 평가한 후(모든 피연산자가 false로 평가되는 경우)엔 마지막 피연산자를 반환
*/
alert( 1 || 0 ); //1 (1은 truthy)

alert( null || 1 ); //1 (1은 truthy)
alert( null || 0 || 1 ); //1 (1은 truthy)

alert( undefined || null || 0 ); //0 (모두 falsy이므로 마지막 을 반환)

/*
    변수 또는 표현식으로 구성된 목록에서 첫 번째 truthy얻기
    OR값을 사용하여 실제 값이 들어있는 변수를 찾고, 그 값을 보여줄 수 있는 예시.
    변수 모두 값이 없는 경우 익명을 표기
*/
let firstName = "";
let lastName = "";
let niceName = "바이올렛";

alert( firstName || lastName || niceName || "익명" ); //바이올렛 표시
// 모든 변수가 falsy였으면 익명 글자가 표시

/*
    단락 평가
    ||의 기본적인 동작원리는 왼쪽에서 오른쪽으로 평가를 진행
    truthy를 만나면 나머지 값들은 건드리지 않고 멈춘다. 이런 프로세스를 단락 평가라고 한다.
*/
true || alert("not printed");
false || alert("printed");
//true의 실행으로 평가가 멈추기 때문에 alert가 실행되지 않는다.
//단락 평가는 연산자 왼쪽 고건이 falsy일 때만 명령어를 실행하고자 할 때 자주 쓰인다

// 2) &&(And)
// 모두가 참일 때
alert( true || true ); // true
alert( true || false ); // false
alert( false || true ); // false
alert( false || false ); // false

/*
    && 연산자는 다음 순서에 따라 수행
    - 왼쪽 피연산자부터 시작해 오른쪽으로 나아간다
    - 각 피연산자를 불린형으로 변환. 변환 후 그 값이 false면 멈추고 해당 피연산자의 변환 전 원래 값을 반환합니다.
    - 피연산자 모두를 평가한 후(모든 피연산자가 true로 평가되는 경우)엔 마지막 피연산자를 반환
*/

// 첫 번째 피연산자가 truthy이면, AND는 두번째 피연산자를 반환합니다.
alert( 1 && 0 ); // 0
alert( 1 && 5 ); // 5

// 첫 번째 피연산자가 falsy이면, AND는 첫번째 피연산자를 반환하고, 두 번째 피연산자는 무시합니다.
alert( null && 5 ); // null
alert( 0 && "아무거나 와도 상관없습니다" ); // 0

// &&연산자도 여러 개를 연속으로 전달할 수 있다.
alert( 1 && 2 && null && 3 ); // null
alert( 1 && 2 && 3 ); // 마지막 값, 3

// ** &&의 우선순위가 ||보다 높다.
// ** if를 ||나 &&로 대체하지 말 것. 연산자에 목적에 맞도록 사용하자

// 3) !(NOT)
// 피연산자를 불린형으로 변환한 후 1에서 변환된 값의 역을 반환한다.
alert( !true ); //false
alert( !0 ); //true

// NOT을 연달아 사용하면 불린형으로 변환할 수 있다.
alert( !!"non-empty string" ); //true
alert( !!null ); //false

// NOT의 연산자의 우선순위는 모든 논리 연산자 중에서 가장 높기 때문에 &&, ||보다 먼저 실행됩니다.
