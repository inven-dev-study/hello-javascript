'use strict';


// 심볼형
// 객체 프로퍼티 키로 오직 문자형과 심볼형만을 허용
// 심볼
// '심볼(symbol)'은 유일한 식별자(unique identifier)를 만들고 싶을 때 사용
// id는 새로운 심볼이 됩니다.
let id = Symbol();
// 심볼 id에는 "id"라는 설명이 붙습니다.
let id = Symbol("id");

let id1 = Symbol("id");
let id2 = Symbol("id");

alert(id1 == id2); // false

// 심볼은 문자형으로 자동 형 변환되지 않습니다.
let id = Symbol("id");
alert(id); // TypeError: Cannot convert a Symbol value to a string

// 자바스크립트에선 '언어 차원의 보호장치(language guard)'를 마련해 심볼형이 다른 형으로 변환되지 않게 막아줍니다.
// 심볼을 반드시 출력해줘야 하는 상황이라면 아래와 같이 .toString() 메서드를 명시적으로 호출
let id = Symbol("id");
alert(id.toString()); // Symbol(id)가 얼럿 창에 출력됨

let id = Symbol("id");
alert(id.description); // id

// ‘숨김’ 프로퍼티
// 외부 코드에서 접근이 불가능하고 값도 덮어쓸 수 없는 프로퍼티


let user = { // 서드파티 코드에서 가져온 객체
  name: "John"
};

let id = Symbol("id");

user[id] = 1;

alert( user[id] ); // 심볼을 키로 사용해 데이터에 접근할 수 있습니다.

// 그런데 문자열 "id"를 키로 사용해도 되는데 Symbol("id")을 사용한 이유가 무엇일까요?
// user는 서드파티 코드에서 가지고 온 객체이므로 함부로 새로운 프로퍼티를 추가할 수 없습니다. 심볼을 사용하면 서드파티 코드가 모르게 user에 식별자를 부여할 수 있습니다.


let user = { name: "John" };

// 문자열 "id"를 사용해 식별자를 만들었습니다.
user.id = "스크립트 id 값";

// 만약 제3의 스크립트가 우리 스크립트와 동일하게 문자열 "id"를 이용해 식별자를 만들었다면...

user.id = "제3 스크립트 id 값"
// 의도치 않게 값이 덮어 쓰여서 우리가 만든 식별자는 무의미해집니다.

// 심볼은 for…in 에서 배제됩니다
let id = Symbol("id");
let user = {
  name: "John",
  age: 30,
  [id]: 123
};

for (let key in user) alert(key); // name과 age만 출력되고, 심볼은 출력되지 않습니다.

// 심볼로 직접 접근하면 잘 작동합니다.
alert( "직접 접근한 값: " + user[id] );

//  Object.assign은 키가 심볼인 프로퍼티를 배제하지 않고 객체 내 모든 프로퍼티를 복사
let id = Symbol("id");
let user = {
  [id]: 123
};

let clone = Object.assign({}, user);

alert( clone[id] ); // 123

// 전역 심볼
// 전역 레지스트리에서 심볼을 읽습니다.
let id = Symbol.for("id"); // 심볼이 존재하지 않으면 새로운 심볼을 만듭니다.

// 동일한 이름을 이용해 심볼을 다시 읽습니다(좀 더 멀리 떨어진 코드에서도 가능합니다).
let idAgain = Symbol.for("id");

// 두 심볼은 같습니다.
alert( id === idAgain ); // true


// Symbol.keyFor
// 전역 심볼을 찾을 때 사용되는 Symbol.for(key)에 반대되는 메서드

// 이름을 이용해 심볼을 찾음
let sym = Symbol.for("name");
let sym2 = Symbol.for("id");

// 심볼을 이용해 이름을 얻음
alert( Symbol.keyFor(sym) ); // name
alert( Symbol.keyFor(sym2) ); // id

// 일반 심볼에서 이름을 얻고 싶으면 description 프로퍼티를 사용하면 됩니다.
let globalSymbol = Symbol.for("name");
let localSymbol = Symbol("name");

alert( Symbol.keyFor(globalSymbol) ); // name, 전역 심볼
alert( Symbol.keyFor(localSymbol) ); // undefined, 전역 심볼이 아님

alert( localSymbol.description ); // name