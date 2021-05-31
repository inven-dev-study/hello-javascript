// 2 자바스크립트 기본

// 2.6 alert, prompt, confirm을 이용한 상호작용

/* 
alert 
    메시지가 있는 작은 창은 모달 창(modal window) 
*/
// 
alert("Hello");

/* 
prompt
    텍스트 메시지와 입력 필드(input field), 확인(OK) 및 취소(Cancel) 버튼이 있는 모달 창
    title : 사용자에게 보여줄 문자열
    default : 입력 필드의 초깃값(선택값)
*/

result = prompt(title, [default]);

/* 
컨펌 대화상자
    매개변수로 받은 question(질문)과 확인 및 취소 버튼이 있는 모달 창
*/
result = confirm(question);
let isBoss = confirm("당신이 주인인가요?");
alert( isBoss ); // 확인 버튼을 눌렀다면 true가 출력됩니다.


/*
    질문? : 
 */
