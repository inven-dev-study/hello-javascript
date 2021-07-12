/*
    [2.12] null 병합 연산자 '??'
    
    최근에 추가된 스펙 구식 브라우저에서는 폴리필 필요?
    폴리필이 무엇인가..?
    
    a ?? b의 평가
    - a가 null도 아니고 undefined도 아니면 a
    - 그 외의 경우에는 b
*/

//null 병합 연산자 ?? 없이 x = a ?? b와 동일한 동작을 하는 코드를 작성할 시
x = (a != null && a !== undefined) ? a : b;

let firstName = null;
let lastName = null;
let nickName = "바이올렛";

// null이나 undefined가 아닌 경우 
alert(firstName ?? lastName ?? nickName ?? "익명의 사용자"); // 바이올렛 출력 

/*
    '??'와 '||'의 차이
    - ||은 첫 번째 truthy값을 반환
    - ??는 첫 번째 정의된 값을 반환
    
    ??를 ||로 바꿔도 결과가 동일하게 출력이 되긴 하지만
    null과 undefined, 숫자 0을 구분지을 때 위 차이가 매우 중요하다
*/ 

let a = 100;

alert( a || 200 ); // 100
alert( a ?? 200 ); // 100

let b = 0;

alert( b || 200 ); // 200 
// ||에서는 0을 falsy를 인식해 null과 undefined로 할당한 것과 동일하게 처리
alert( b ?? 200 ); // 0
// ??에서 0이라는 값을 할당했기 때문에 0이 출력

// ??의 연산자 순위는 '=' 과 '?' 보다는 먼저 연산자보다는 나중에 평가
// 그렇기에 복잡한 식에서 ??를 사용해 값을 하나 선택할 땐 괄호를 추가하는 것이 좋다.
