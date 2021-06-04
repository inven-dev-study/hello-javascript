'use strict';

let data, dataAry = []
let buttons = document.querySelectorAll('.button');
let inputArea = document.querySelector('.input');
let outputArea = document.querySelector('.output');

buttons.forEach(item => {
	item.addEventListener('click', event => {
		getData(item);
	})
})

function inputDataList(item) {
	if(data == undefined) {
		data = item.innerHTML;
	} else {
		data += item.innerHTML;
	}
	inputDisplay(data);
	console.log(data);
}

function inputDisplay(data) {
	inputArea.innerHTML = data;
}

let dataList;
let lastType = "num";

function getData(data) {  //타입값에 따라 분기
	let typeOfData = data.getAttribute('data-type');
	console.log(typeOfData);


/**
 * 부호를 연속으로 입력할 때 
 * 기본적으로 부호 뒤에 또 부호를 쓰면 나중에 쓴 부호로 교체된다.
 * 예외 - 이외의 부호 뒤에 입력된 - 는 앞 부호 뒤에 그대로 추가된다.
 * 상기 예외 케이스에서 - 를 다른 부호로 교체하려고 한 경우 부호가 삭제된다.
 */
	switch(typeOfData) {
		case 'num' : 
			inputDataList(data);
			lastType = 'num';
		break;

		case 'minus' :
			if(lastType != 'num') {
				checkSign(typeOfData);
			} else {
				inputDataList(data);
			}
			lastType = 'minus';
		break;

		case 'plus' : break;
		case 'multiply' : break;
		case 'obelus' : break;
		case 'equal' : break;
		case 'clear' : break;
		case 'backspace' : break;
	}
}


function checkSign(type) {  // 부호를 확인함
	return;
} 

function calData() {  //계산
}

function returnData() {  // 계산한 값을 돌려줌
}

function clearData() {  // 모든것을 초기화한다

}

function delData() {  //직전에 입력한 값을 지운다
}

function alertOver() {  // 수가 너무 크면
}
