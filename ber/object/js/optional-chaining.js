'user strict';

// 옵셔널 체이닝 '?.'

// 최근에 추가됨
// 스펙에 추가된 지 얼마 안 된 문법입니다. 구식 브라우저는 폴리필이 필요합니다.
// 프로퍼티가 없는 중첩 객체를 에러 없이 안전하게 접근할 수 있습니다

// 옵셔널 체이닝이 필요한 이유
let user = {}; // 주소 정보가 없는 사용자

alert(user.address.street); // TypeError: Cannot read property 'street' of undefined

// querySelector(...) 호출 결과가 null인 경우 에러 발생
let html = document.querySelector('.my-element').innerHTML;

// 명세서에 ?.이 추가되기 전엔 이런 문제들을 해결하기 위해 && 연산자를 사용하
let user = {}; // 주소 정보가 없는 사용자

alert( user && user.address && user.address.street ); // undefined, 에러가 발생하지 않습니다.


// 옵셔널 체이닝의 등장
// ?.은 ?.'앞’의 평가 대상이 undefined나 null이면 평가를 멈추고 undefined를 반환
let user = {}; // 주소 정보가 없는 사용자

alert( user?.address?.street ); // undefined, 에러가 발생하지 않습니다.

let user = null;

alert( user?.address ); // undefined
alert( user?.address.street ); // undefined

// 옵셔널 체이닝을 남용하지 마세요.
// ?.앞의 변수는 꼭 선언되어 있어야 합니다.
// ReferenceError: user is not defined
user?.address;


// 단락 평가
let user = null;
let x = 0;

user?.sayHi(x++); // 아무 일도 일어나지 않습니다.

alert(x); // 0, x는 증가하지 않습니다.

// ?.()와 ?.[]
let user1 = {
    admin() {
      alert("관리자 계정입니다.");
    }
  }
  
  let user2 = {};
  
  user1.admin?.(); // 관리자 계정입니다.
  user2.admin?.();

  let user1 = {
    firstName: "Violet"
  };
  
  let user2 = null; // user2는 권한이 없는 사용자라고 가정해봅시다.
  
  let key = "firstName";
  
  alert( user1?.[key] ); // Violet
  alert( user2?.[key] ); // undefined
  
  alert( user1?.[key]?.something?.not?.existing); // undefined

  delete user?.name; // user가 존재하면 user.name을 삭제합니다.

//   ?.은 읽기나 삭제하기에는 사용할 수 있지만 쓰기에는 사용할 수 없습니다.
  // user가 존재할 경우 user.name에 값을 쓰려는 의도로 아래와 같이 코드를 작성해 보았습니다.

user?.name = "Violet"; // SyntaxError: Invalid left-hand side in assignment
// 에러가 발생하는 이유는 undefined = "Violet"이 되기 때문입니다.