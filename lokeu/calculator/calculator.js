/*

1. html css ui 만들기
2. 사칙연산(덧셈, 뺄셈, 곱셈, 나눗셈)
3. 숫자 클리어 버튼/초기화 버튼 따로
4. 소수점 버튼
5. 음수 값 버튼
6. 입력 값과 결과 값이 같이 보이게끔 출력
7. 숫자가 과하게 클 때는 alert로 알림창 뜨게하기

Array.from()
배열 객체(array-like object)나 반복 가능한 객체(iterable object)를
얕게 복사해 새로운Array 객체를 만듭니다.

map() 메서드는 배열 내의 모든 요소 각각에 대하여
주어진 함수를 호출한 결과를 모아 새로운 배열을 반환합니다.

*/



window.onload = function() {

    // 계산 결과 표시
    let store =  document.querySelector(".preview");
    let value = document.querySelector(".value");

    // 숫자 버튼 클릭
    const numbers = Array.from(document.querySelectorAll(".number"));

    numbers.map(function(n){
        n.addEventListener('click', setNumber);
    });

    function setNumber(){
        store.innerText += this.innerText;
        // 실시간 계산 보여주기
        if (
            store.innerText.indexOf("+") !== -1 ||
            store.innerText.indexOf("-") !== -1 ||
            store.innerText.indexOf("*") !== -1 ||
            store.innerText.indexOf("/") !== -1
            ) {
            value.innerText = eval(store.innerText);
        } else {
            value.innerText += this.innerText;
        }
    }

    // 연산 버튼 클릭
    const symbols = Array.from(document.querySelectorAll(".cal"));

    symbols.map(function(s){
        s.addEventListener('click', setSymbol);
    });

    function setSymbol(){
        if (value.innerText !== '') {
            if (store.innerText !== '') {
                store.innerText = value.innerText + this.innerText;
            } else {
                store.innerText = store.innerText + value.innerText + this.innerText;
            }
        }
        clearValue();
    }

    // 버튼 클릭하여 결과값 구하기
    
    const equal = document.querySelector(".equal");

    equal.addEventListener('click', getvalue);

    function getvalue() {
        let clickCount = 0; // undefined 방지를 위한 클릭 카운트

        if (clickCount = 0) {
            if (value.innerText !== '') {
                value.innerText = eval(store.innerText);
                clickCount++;
            }
        } else {
            clickCount = 0;
        }
    }

    // +/- 와 . 클릭
    const dot = document.querySelector('.dot');
    const sign = document.querySelector('.sign');

    dot.addEventListener('click', setDot);
    sign.addEventListener('click', setSign);

    function setDot() {
        value.innerText.indexOf('.') === -1 ?
        value.innerText = `${value.innerText}.` :
        false;
    }

    function setSign() {
        value.innerText.indexOf('-') === -1 ?
        value.innerText = `-${value.innerText}` :
        value.innerText = value.innerText.replace('-', '');
    }

    // Clear 함수
    const clear = document.querySelector('.clear');
    const reset = document.querySelector('.reset');

    clear.addEventListener('click', function() {
        
    });
    reset.addEventListener('click', function(){
        clearValue();
        clearStore();
    });

    function clearValue() {
        value.innerText = '';
    }

    function clearStorePart() {
        console.log(store.innerText[0]);
        for(let count = 0; count < store.innerText.length; count+=1) {
            if (
                store.innerText.indexOf("+") !== -1 ||
                store.innerText.indexOf("-") !== -1 ||
                store.innerText.indexOf("*") !== -1 ||
                store.innerText.indexOf("/") !== -1
                ) {
                console.log("사칙연산이 있다");
                
            } else {
                console.log("사칙연산이 없다");
            }
        }
    }

    function clearStore() {
        store.innerText = '';
    }
};

