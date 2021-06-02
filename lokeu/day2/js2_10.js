/*
    [2.10] if와 '?'를 사용한 조건 처리
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
