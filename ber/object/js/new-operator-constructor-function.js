'use strict';

// new 연산자와 생성자 함수

// 생성자 함수
// 1. new 
// 2. 대문자로 시작
function User(name) {
    this.name = name;
    this.isAdmin = false;
}

let user = new User("Jack");

alert(user.name);   // Jack
alert(user.isAdmin);    // false


// function User(name) {
//     // this = {};  (빈 객체가 암시적으로 만들어짐)
  
//     // 새로운 프로퍼티를 this에 추가함
//     this.name = name;
//     this.isAdmin = false;
  
//     // return this;  (this가 암시적으로 반환됨)
//   }

// new.target과 생성자 함수

function User() {
    alert(new.target);
  }
  
  // "new" 없이 호출함
  User(); // undefined
  
  //"new"를 붙여 호출함
  new User(); // function User { ... }


//   생성자와 return문
function BigUser() {
    this.name = "John";
    return {naem: "Godzilla" }; // <-- this가 아닌 새로운 객체를 반환함
}

alert( new BigUser().name); // Godzilla 

function SmallUser() {
    this.name = "John";

    return; // <-- this를 반환함
}
alert( new SmallUser().name); // John

// 괄호 생략하기
let user = new User; // <-- 괄호가 없음
// 아래 코드는 위 코드와 똑같이 동작합니다.
let user = new User();

// 생성자 내 메서드
function User(name) {
    this.name = name;
  
    this.sayHi = function() {
      alert( "My name is: " + this.name );
    };
  }
  
  let john = new User("John");
  
  john.sayHi(); // My name is: John