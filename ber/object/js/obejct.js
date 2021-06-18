"use strick";

// 생성
let user = new Object(); // '객체 생성자' 문법
let user = {}; // '객체 리터럴' 문법

// 리터럴과 프로퍼티
let user = {
  // 객체
  name: "John", // 키: "name",  값: "John"
  age: 30, // 키: "age", 값: 30
};
//   점 표기법(dot notation)을 이용하면 프로퍼티 값을 읽는 것도 가능
// 프로퍼티 값 얻기
alert(user.name); // John
alert(user.age); // 30
// 추가

user.isAdmin = true;
//   delete 연산자를 사용하면 프로퍼티를 삭제

delete user.age;

// const로 선언된 객체는 수정될 수 있습니다.(객체는 메모리 참조 프로퍼티 변수값은 메모리에 할당 되어 있음)
const user = {
  name: "John",
};

user.name = "Pete"; // (*)

alert(user.name); // Pete

// 대괄호 표기법

let user = {};

// set
user["likes birds"] = true;

// get
alert(user["likes birds"]); // true

// delete
delete user["likes birds"];

let key = "likes birds";
// user["likes birds"] = true; 와 같음
user[key] = true;

// 단축 프로퍼티
function makeUser(name, age) {
  return {
    name, // name: name 과 같음
    age, // age: age 와 같음
    // ...
  };
}
let user = {
  name, // name: name 과 같음
  age: 30,
};

// 프로퍼티 이름의 제약사항
// 예약어를 키로 사용해도 괜찮습니다.
// 역사적인 이유 때문에 특별 대우를 받는 이름이 하나 있습니다. 바로, __proto__입니다.
let obj = {
  for: 1,
  let: 2,
  return: 3,
};

alert(obj.for + obj.let + obj.return); // 6

//   ‘in’ 연산자로 프로퍼티 존재 여부 확인하기
// "key" in object
let user = { name: "John", age: 30 };

alert("age" in user); // user.age가 존재하므로 true가 출력됩니다.
alert("blabla" in user); // user.blabla는 존재하지 않기 때문에 false가 출력됩니다.

let obj = {
  test: undefined,
};

alert(obj.test); // 값이 `undefined`이므로, 얼럿 창엔 undefined가 출력됩니다. 그런데 프로퍼티 test는 존재합니다.

alert("test" in obj); // `in`을 사용하면 프로퍼티 유무를 제대로 확인할 수 있습니다(true가 출력됨).

// ‘for…in’ 반복문
let user = {
  name: "John",
  age: 30,
  isAdmin: true,
};

for (let key in user) {
  // 키
  alert(key); // name, age, isAdmin
  // 키에 해당하는 값
  alert(user[key]); // John, 30, true
}

// 객체 정렬 방식
let codes = {
  49: "독일",
  41: "스위스",
  44: "영국",
  // ..,
  1: "미국",
};

for (let code in codes) {
  alert(code); // 1, 41, 44, 49
  // 나라 번호(키)가 정수이어서 1, 41, 44, 49 순으로 프로퍼티가 자동 정렬
}

let user = {
  name: "John",
  surname: "Smith",
};
user.age = 25; // 프로퍼티를 하나 추가합니다.

// 정수 프로퍼티가 아닌 프로퍼티는 추가된 순서대로 나열됩니다.
for (let prop in user) {
  alert(prop); // name, surname, age
}

//   요약
// 객체는 몇 가지 특수한 기능을 가진 연관 배열(associative array)입니다.

// 객체는 프로퍼티(키-값 쌍)를 저장합니다.

// 점 표기법: obj.property
// 대괄호 표기법 obj["property"]

// 프로퍼티를 삭제하고 싶을 때: delete obj.prop
// 해당 key를 가진 프로퍼티가 객체 내에 있는지 확인하고자 할 때: 
"key" in obj
// 프로퍼티를 나열할 때: for (let key in obj)


// 과제1 
// 빈 객체 user를 만듭니다.
// user에 키가 name, 값이 John인 프로퍼티를 추가하세요.
// user에 키가 surname, 값이 Smith인 프로퍼티를 추가하세요.
// name의 값을 Pete로 수정해보세요.
// user에서 프로퍼티 name을 삭제하세요.
let user = {};
user.name = "John";
user.surname = "Smith";
user.name = "Pete";
delete user.name;

// 과제2
// 객체가 비어있는지 확인하기
let schedule = {};

function isEmpty(schedule){
    return "8:30" in schedule;
}

alert( isEmpty(schedule) ); // true


schedule["8:30"] = "get up";

alert( isEmpty(schedule) ); // false

// 프로퍼티 합계 구하기
let salaries = {
    John: 100,
    Ann: 160,
    Pete: 130
  }


function sum(obj){
    let result = 0;
    for (let key in obj){
        result += obj[key];
    }
    return result;
}