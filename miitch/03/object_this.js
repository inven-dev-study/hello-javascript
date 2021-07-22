"use strict";

//=======================================================
let calculator = {

    firstNum: 0,
    secondNum: 0,

    read() {
        this.firstNum = +prompt("첫번째 수 입력", "");
        this.secondNum = +prompt("두번째 수 입력", "");
    },

    sum() {
        return this.firstNum + this.secondNum;
    },

    mul() {
        return this.firstNum * this.secondNum;
    }
};

calculator.read();
alert( calculator.sum() );
alert( calculator.mul() );

//=======================================================
/**
 * 체이닝
 * this 를 이용하여 아래와 같이 메서드 호출 체이닝이 가능하다. 이런 방식은 자바스크립트 라이브러리에서 많이 사용된다.
 */

let ladder = {
    step: 0,
    up() {
      this.step++;
      return this;
    },
    down() {
      this.step--;
      return this;
    },
    showStep: function() { // 사다리에서 몇 번째 단에 올라와 있는지 보여줌
      alert( this.step );
      return this;
    }
  };

  ladder.up().up().down().showStep();   // <--- ladder.up().this.up().this.down().this.showStep();
