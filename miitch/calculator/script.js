'use strict';
/**
 * data
 * item
 */
let lastData, typeOfItem;
let data = "";
let lastType = "";  // 부호가 연속으로 입력되는 것을 방지하기 위해서 사용
let lastIsMinus = "";
let beforeLastType = "";
let isAdd = 1;  // 뒤에 더할지, 더하지 않고 마지막 글자를 덮어쓸지 체크
let jobDone = 0;  // = 버튼을 눌러서 계산이 끝나면 1;

let buttons = document.querySelectorAll('.button');
let inputArea = document.querySelector('.input');
let outputArea = document.querySelector('.output');

buttons.forEach(item => {
	item.addEventListener('click', event => {
		doCalc(item);
	})
})

function doCalc(item) {  //타입값에 따라 분기
	typeOfItem = item.getAttribute('data-type');

	switch(typeOfItem) {
		case 'equal' : calData(); break;
		case 'clear' : clearData(); break;
		case 'backspace' : delData(); break;
		default : updateData(typeOfItem, item); break;
	}
}


/**
 * 1. 부호 뒤의 부호는 덮어쓴다.
 *    단, 마이너스 외 부호 뒤에 마이너스를 넣을 때는 추가한다. ( 50 * -10 )
 * 2. 현재의 마지막 문자가 숫자가 아닐 때 . 을 입력하려고 하면 . 앞에 자동으로 0 을 추가한다
 */
function updateData(typeOfItem, item) {
	isAdd = 1;  // 1: 추가, 0: 덮어씀
	isDot = item.getAttribute('data-type2') == 'dot';
	if(typeOfItem != 'num' && data != undefined) {
		checkLastType();
	} else if(typeOfItem != 'num') {
		alert('숫자를 먼저 입력하세요.');
		return;
	}
	
	if(typeOfItem != 'num' && lastType == 0) {  // 넣으려는 값이 숫자가 아니고, 현재 마지막 문자가 부호일 때: 덮어쓴다
		if(typeOfItem == 'minus' && lastIsMinus != 0) {  // 단, 넣으려는 값이 마이너스부호이고, 마지막 문자가 마이너스 아닌 부호일 때: 추가한다
			isAdd = 1;
		} else {
			isAdd = 0;
		}
	}

	if(isDot == true) {
		if (lastIsDot == 0) {
			isAdd = 0;
		} else if (lastIsNum != 0) {
			addZero = 1;
		}
		/**
		 * isAdd 가 0 이어야 하는 케이스
		 * 라스트타입이 . 일 때 => lastIsDot
		 * 
		 * 0을 붙여줘야 하는 케이스
		 * 라스트타입이 num이 아닐 때 => lastIsNum
		 */
	}

	inputDataList(item, isAdd);
	// calData();  // <-----
}

function checkLastType() {
	lastType = +data[data.length - 1].search(/[\+\-\*\/]/);
	lastIsMinus = +data[data.length - 1].search(/[\-]/);
	lastIsDot = +data[data.length - 1].search(/[\.]/);
	lastIsNum = +data[data.length - 1].search(/[0-9]/);
}
let addZero;
function inputDataList(item, isAdd, addZero = 0) {
	let r = item.innerHTML;
	lastData = data[data.length - 1];
	if(!isAdd) {
		data = data.replace(lastData, r);
		if(addZero) {
			//<-----
		}

	} else {
		if(data == undefined) {
			data = r;
		} else {
			data += r;
		}
	}
	inputDisplay(data);
}

function inputDisplay(data) {
	inputArea.innerHTML = data;
}

function calData() {  //계산
	let result = eval(data);
	returnData(result);
}

function returnData(result) {  // 계산한 값을 돌려줌
	outputArea.innerHTML = result;
	jobDone = 1;
}

function clearData() {  //초기화
	data = "";
	lastType = "";
	inputArea.innerHTML = "";
	outputArea.innerHTML = "";
	jobDone = 0;

}

function delData() {  //직전에 입력한 값을 지운다
	if(jobDone == 1) alert("이미 계산이 끝났습니다. clear 버튼으로 초기화 하세요.");
	data = data.slice(0, -1);
	inputDisplay(data);
}
