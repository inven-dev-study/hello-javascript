"use strict";

// 객체와 원시 타입의 근본적인 차이 중 하나는 객체는 ‘참조에 의해(by reference)’ 저장되고 복사된다는 것
// 원시값(문자열, 숫자, 불린 값)은 ‘값 그대로’ 저장·할당되고 복사되는 반면에 말이죠.
// 객체가 저장되어있는 '메모리 주소’인 객체에 대한 '참조 값’이 저장

let user = { name: "John" };

let admin = user;

admin.name = "Pete"; // 'admin' 참조 값에 의해 변경됨

alert(user.name); // 'Pete'가 출력됨. 'user' 참조 값을 이용해 변경사항을 확인함

let a = {};
let b = a; // 참조에 의한 복사

alert(a == b); // true, 두 변수는 같은 객체를 참조합니다.
alert(a === b); // true

let a = {};
let b = {}; // 독립된 두 객체

alert(a == b); // false

// 객체 복사, 병합과 Object.assign
// 이전엔 for, map 으로 빈객체에 복사함

let user = {
  name: "John",
  age: 30,
};

let clone = {}; // 새로운 빈 객체

// 빈 객체에 user 프로퍼티 전부를 복사해 넣습니다.
for (let key in user) {
  clone[key] = user[key];
}

// 이제 clone은 완전히 독립적인 복제본이 되었습니다.
clone.name = "Pete"; // clone의 데이터를 변경합니다.

alert(user.name); // 기존 객체에는 여전히 John이 있습니다.

//   Object.assign(dest, [src1, src2, src3...])
let user = { name: "John" };

let permissions1 = { canView: true };
let permissions2 = { canEdit: true };

// permissions1과 permissions2의 프로퍼티를 user로 복사합니다.
Object.assign(user, permissions1, permissions2);

// now user = { name: "John", canView: true, canEdit: true }
let user = {
  name: "John",
  age: 30,
};

let clone = Object.assign({}, user);

//   중첩 객체 복사
let user = {
  name: "John",
  sizes: {
    height: 182,
    width: 50,
  },
};

let clone = Object.assign({}, user);

alert(user.sizes === clone.sizes); // true, 같은 객체입니다.

// user와 clone는 sizes를 공유합니다.
user.sizes.width++; // 한 객체에서 프로퍼티를 변경합니다.
alert(clone.sizes.width); // 51, 다른 객체에서 변경 사항을 확인할 수 있습니다.

//   가비지 컬렉션
// 자바스크립트는 눈에 보이지 않는 곳에서 메모리 관리
// 도달 가능성(reachability) 이라는 개념을 사용해 메모리 관리를 수행

// 요약

// 가비지 컬렉션은 엔진이 자동으로 수행하므로 개발자는 이를 억지로 실행하거나 막을 수 없습니다.
// 객체는 도달 가능한 상태일 때 메모리에 남습니다.
// 참조된다고 해서 도달 가능한 것은 아닙니다. 서로 연결된 객체들도 도달 불가능할 수 있습니다.
