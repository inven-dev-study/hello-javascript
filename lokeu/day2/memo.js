/*
    2.10 if와 '?'를 사용한 조건 처리
*/

//일반적인 if문
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


//조건부 연산자 '?'
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
    - 피연산자 모두를 평가한 후(모든 피연산자가 false로 평가되는 경우)엔 피연산자를 반환
*/
alert( 1 || 0 ); //1 (1은 truthy)

alert( null || 1 ); //1 (1은 truthy)
alert( null || 0 || 1 ); //1 (1은 truthy)

alert( undefined || null || 0 ); //0 (모두 falsy이므로 마지막 을 반환)

/*
    1. 변수 또는 표현식으로 구성된 목록에서 첫 번째 truthy얻기
    OR값을 사용하여 실제 값이 들어있는 변수를 찾고, 그 값을 보여줄 수 있는 예시.
    변수 모두 값이 없는 경우 익명을 표기
*/
let firstName = "";
let lastName = "";
let niceName = "바이올렛";

