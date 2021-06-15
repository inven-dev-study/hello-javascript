'use strict';


// // 메서드와 this

// let user = {
//     name : "Jhon",
//     age: 30

// };

// user.sayHi = function() {
//     alert('say hi');
// };

// user.sayHi(); // say hi;


// delete user.sayHi;

// // 단축
// user = {
//     sayHi(){
//         alert("say hi");
//     }
// };

// user = {
//     sayHi : function(){
//         alert("say hi");
//     }
// }

// // this 

// let user = {
//     name: "John",
//     age: 30,
  
//     sayHi() {
//       // 'this'는 '현재 객체'를 나타냅니다.
//       alert(this.name);
//     }
  
//   };
  
//   user.sayHi(); // John

  // 자유로운 this

  let user = {name: "jhon"};
  let admin = {name: "admin"};

  function sayHi(){
      alert(this.name);
  }

  user.f = sayHi;
  admin.f = sayHi;


// 'this'는 '점(.) 앞의' 객체를 참조하기 때문에
// this 값이 달라짐
user.f();
admin.f();


admin['f'](); // Admin (점과 대괄호는 동일하게 동작함)

// 객체가 없으면 this == undefined
function sayHi() {
    alert(this);
  }
  
  sayHi(); // undefined



// this가 없는 화살표 함수
// 외부 함수에서 this 값을 가져옵니다.
let user = {
    firstName: "보라",
    sayHi() {
      let arrow = () => alert(this.firstName);
      arrow();
    }
  };
  
  user.sayHi(); // 보라