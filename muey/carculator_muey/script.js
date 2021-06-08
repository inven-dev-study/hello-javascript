// function add(char) { 
//   let process = document.getElementById('process');
//   process.value = process.value + char;
// }

var numberClicked = false; // 전역 변수

function add (char) { // 입력값 식 보여주기 : 참고 https://blog.cordelia273.space/32
  if(numberClicked == false) { // 만약 이전에 연산자를 입력 했는데,
      if(isNaN(char) == true) { // 입력 받은 값이 또 다시 연산자면, 아무것도 하지 않는다.

      } else { // 숫자
          document.getElementById('process').value += char; // 숫자 추가
      }
  } else { // 만약에 이전에 숫자를 입력 했으면,
      document.getElementById('process').value += char; // 숫자 추가
  }

  // 다음 입력을 위해 이번 입력에 숫자가 눌렸는지 연산자가 눌렸는지 설정
  if(isNaN(char) == true) { // 만약 숫자가 아닌게 참이라면 (연산자를 눌렀다면)
      numberClicked = false; // numberClicked를 false로 설정
  } else {
      numberClicked = true; // numberClicked를 true로 설정
  }
}


function calculate() {
  let process = document.getElementById('process');
  let result = eval(process.value);
  if( result % 1 != 0) { // 소수점 처리
    document.getElementById('result').value =  result.toFixed(2).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  } else {
    document.getElementById('result').value = result.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","); // 천자리마다 콤마 자동으로 찍어주는 정규식
  }

  if( document.getElementById('result').value.length > 14 ) { // 수가 너무 클때 
    alert("수가 너무 큽니다!");
    //document.getElementById('process').value = "";
    document.getElementById('result').value = "";
  }

} 

function reset() { // 버튼 C - 초기화 기능
  document.getElementById('process').value = "";
  document.getElementById('result').value = "";
  numberClicked = false; // 연산자 입력 초기화
}

function back() { // backspace 기능
  process.value = process.value.substring(0, process.value.length-1);
}

function sign() { // 음수 처리
  numberClicked = true;
  document.getElementById('process').value = "-";
}

function enter(e) { // 키보드 입력 처리
  if(e.keyCode == 13 || e.keyCode == 108) { // enter 눌렀을 때 
    calculate();
  } else if ( e.keyCode == 8 ) { // backspace 눌렀을 때 
    back(); 
  } else if ( e.keyCode == 116) { // f5 눌렀을때 (초기화)
    reset();
  } else if ((48 <= e.keyCode && e.keyCode <= 57)) { // 0~9 눌렀을 때 
    num = e.keyCode - 48;
    add(parseInt(num));
  } else if ((96 <= e.keyCode && e.keyCode <= 105)) { // 숫자패드 0~9 눌렀을 때 
    num = e.keyCode - 96;
    add(parseInt(num));
  } else if (e.keyCode == 106) { 
    add('*');
  } else if (e.keyCode == 107) { 
    add('+');
  } else if (e.keyCode == 109) { 
    add('-');
  } else if (e.keyCode == 110) { 
    add('.');
  } else if (e.keyCode == 111) { 
    add('/');
  } else {
    //alert('숫자 또는 연산자를 입력하세요!');
  }
}