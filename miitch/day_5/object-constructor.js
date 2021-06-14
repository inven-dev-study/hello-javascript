"use strict";

//=======================================================
// 아래와 같은 세 개의 메서드를 가진 생성자 함수, Calculator를 만들어보세요.

// read() – prompt 함수를 이용해 사용자로부터 값 두 개를 받고, 이를 객체 프로퍼티에 저장합니다.
// sum() – 프로퍼티에 저장된 값 두 개를 더한 후 반환합니다.
// mul() – 프로퍼티에 저장된 값 두 개를 곱한 후 반환합니다.

/**** ▼▼▼작성▼▼▼ ****/
function Calculator() {
    this.a = 0;
    this.b = 0;

    this.read = function() {
        this.a = +prompt("a : 숫자값을 하나 주세요.", "");
        this.b = +prompt("b : 숫자값을 하나 더 주세요.", "");
    }

    this.sum = function() {
        return this.a + this.b;
    }

    this.mul = function() {
        return this.a * this.b;
    }
}
/**** ▲▲▲작성▲▲▲ ****/

let calculator = new Calculator();
calculator.read();

alert( "Sum=" + calculator.sum() );
alert( "Mul=" + calculator.mul() );


//=======================================================
// 생성자 함수 Accumulator(startingValue)를 만들어 보세요.
// Accumulator(startingValue)를 이용해 만드는 객체는 아래와 같은 요건을 충족해야 합니다.
// 프로퍼티 value에 현재 값(current value)을 저장합니다. 최초 호출 시엔 생성자 함수의 인수, startingValue에서 시작값(starting value)을 받아옵니다.
// 메서드 read()에선 prompt 함수를 사용해 사용자로부터 숫자를 받아오고, 받은 숫자를 value에 더해줍니다.
// 프로퍼티 value엔 startingValue와 사용자가 입력한 모든 값의 총합이 더해져 저장됩니다.

/**** ▼▼▼작성▼▼▼ ****/

function Accumulator(startingValue){
    this.value = startingValue;

    read() {
        this.value += +prompt("숫자를 주세요.", "");
    }
}


/**** ▲▲▲작성▲▲▲ ****/

let accumulator = new Accumulator(1); // 최초값: 1

accumulator.read(); // 사용자가 입력한 값을 더해줌
accumulator.read(); // 사용자가 입력한 값을 더해줌

alert(accumulator.value); // 최초값과 사용자가 입력한 모든 값을 더해 출력함

//=======================================================


//=======================================================


//=======================================================


//=======================================================