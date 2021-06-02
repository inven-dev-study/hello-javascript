"use stirct";

/* 
null 병합 연산자 '??'
    스펙에 추가된 지 얼마 안 된 문법입니다. 구식 브라우저는 폴리필이 필요합니다.
    여러 피연산자 중 그 값이 ‘확정되어있는’ 변수를 찾을 수 있습니다.
    ??는 변수에 기본값을 할당하는 용도로 사용할 수 있습니다.
    ??의 연산자 우선순위는 대다수의 연산자보다 낮고 ?와 = 보다는 높습니다.
    안정성 관련 이슈 때문에 ??는 &&나 ||와 함께 사용하지 못합니다.
*/

let firstName = null;
let lastName = null;
let nickName = "바이올렛";

// null이나 undefined가 아닌 첫 번째 피연산자
alert(firstName ?? lastName ?? nickName ?? "익명의 사용자"); // 바이올렛

/*
'??'와 '||'의 차이
    ||는 첫 번째 truthy 값을 반환합니다.
    ??는 첫 번째 정의된(defined) 값을 반환합니다.
*/

let height = 0;

alert(height || 100); // 100
alert(height ?? 100); // 0
