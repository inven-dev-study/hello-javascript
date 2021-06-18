'use strict';


// 객체를 원시형으로 변환하기
// 객체는 원시값으로 변환되고, 그 후 의도한 연산이 수행


// ToPrimitive
// 객체 형 변환은 세 종류로 구분되는데, 'hint’라 불리는 값이 구분 기준이 됩니다. '
// 객체를 프로퍼티 키로 사용하고 있음

// "string"
// 문자열을 기대하는 연산을 수행
// 객체를 출력하려고 함
alert(obj);

anotherObj[obj] = 123;

// "number"
// 수학 연산을 적용하려 할 때(객체-숫자형 변환),
// 명시적 형 변환
let num = Number(obj);

// (이항 덧셈 연산을 제외한) 수학 연산
let n = +obj; // 단항 덧셈 연산
let delta = date1 - date2;

// 크고 작음 비교하기
let greater = user1 > user2;

// "default"
// 연산자가 기대하는 자료형이 ‘확실치 않을 때’ 
// 이항 덧셈 연산은 hint로 `default`를 사용합니다.
let total = obj1 + obj2;

// obj == number 연산은 hint로 `default`를 사용합니다.
if (user == 1) {  };


// "boolean" hint는 없습니다.


// Symbol.toPrimitive
obj[Symbol.toPrimitive] = function(hint) {
  // 반드시 원시값을 반환해야 합니다.
  // hint는 "string", "number", "default" 중 하나가 될 수 있습니다.
};


// toString과 valueOf


let user = {
  name: "John",
  money: 1000,

  // hint가 "string"인 경우
  toString() {
    return `{name: "${this.name}"}`;
  },

  // hint가 "number"나 "default"인 경우
  valueOf() {
    return this.money;
  }

};

alert(user); // toString -> {name: "John"}
alert(+user); // valueOf -> 1000
alert(user + 500); // valueOf -> 1500


// 반환 타입
// 
// 위에서 소개해드린 세 개의 메서드는 'hint’에 명시된 자료형으로의 형 변환을 보장해 주지 않습니다.

// toString()이 항상 문자열을 반환하리라는 보장이 없고, Symbol.toPrimitive의 hint가 "number"일 때 항상 숫자형 자료가 반환되리라는 보장이 없습니다.

// 확신할 수 있는 단 한 가지는 객체가 아닌 원시값을 반환해 준다는 것뿐입니다.

// 추가 형 변환
let obj = {
  // 다른 메서드가 없으면 toString에서 모든 형 변환을 처리합니다.
  toString() {
    return "2";
  }
};

alert(obj * 2); // 4, 객체가 문자열 "2"로 바뀌고, 곱셈 연산 과정에서 문자열 "2"는 숫자 2로 변경됩니다.

let obj = {
  toString() {
    return "2";
  }
};

alert(obj + 2); // 22("2" + 2), 문자열이 반환되기 때문에 문자열끼리의 병합이 일어났습니다.


// 자료구조와 자료형
// 달력, 디데이
// 1주일 1회 화요일 스터디
// 
