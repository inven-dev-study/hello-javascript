'use strict';
/**
 * 문제점
 *  0.1 + 0.2 != 0.3
 *  4 * -    ===>   4 * *    ===> 4 * * -    ===> 4 * * *  ...
 */

let data = "",  // 입력한 데이터(string)
	typeOfItem;  // 마지막으로 입력한 데이터의 data-type

// 부호가 연속으로 입력되는 것을 방지하기 위해서 사용
let lastIsSymbol = -1,
	lastIsMinus = -1,
	lastIsDot = -1,
	lastIsNum = 0;

let isAdd = 1;  // 값을 뒤에 추가할지, 추가하지 않고 마지막 문자를 덮어쓸지 체크

// 소숫점, 0 입력관련
let isDot = 0,
	isZero = 0,
	afterDot = 0,  // 소수점 뒤인지 판단  0: 소수점앞, 1: 소수점뒤
	addZero = 1,  //0을 입력할 수 있는가  0: 불가, 1: 가능
	freeZero = 0;  //0을 입력할 수 있는가 2중 확인

let buttons = document.querySelectorAll('.button'),
	inputArea = document.querySelector('.input'),
	outputArea = document.querySelector('.output');


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
 * 부호 뒤의 부호는 덮어쓴다.
 * 단, 마이너스 외 부호 뒤에 마이너스를 넣을 때는 추가한다. ( 50 * -10 )
 */

function updateData(typeOfItem, item) {
	isAdd = 1;  // 1: 추가, 0: 덮어씀
	isDot = item.getAttribute('data-type2') == 'dot';
	isZero = item.getAttribute('data-type2') == 'zero';
	checkLastType();

	freeZero = (typeOfItem == 'num' && !isZero) ? 1 : freeZero;

	if(typeOfItem != 'num' && data) {
		afterDot = 0;
		addZero = 1;
		freeZero = 0;
	} else if(typeOfItem != 'num') {
		alert('숫자를 먼저 입력하세요.');
		return;
	}


	if(typeOfItem != 'num' && lastIsSymbol == 0) {  // 넣으려는 값이 숫자가 아니고, 현재 마지막 문자가 부호일 때: 덮어쓴다.
		isAdd = (typeOfItem == 'minus' && lastIsMinus != 0) ? 1 : 0;  //단, 넣으려는 값이 마이너스 부호이고, 마지막 문자가 마이너스가 아닌 부호일 때: 추가한다
	}

	if(isDot) {
		if (!afterDot) {
			isAdd = (lastIsDot == 0) ? 0 : isAdd;
		} else {
			return;
		}
		afterDot = 1;
		addZero = 1;
	}

	if (isZero) {
		if (addZero && !afterDot && !freeZero) {
			addZero = 0;
		} else if (!addZero) {
			return;
		}
	}

	inputDataList(item, isAdd);

	if(lastIsNum == 0) {
		calData();
	}
}

function checkLastType() {
	if(data){
		lastIsSymbol = +data[data.length - 1].search(/[\+\-\*\/]/);
		lastIsMinus = +data[data.length - 1].search(/[\-]/);
		lastIsDot = +data[data.length - 1].search(/[\.]/);
		lastIsNum = +data[data.length - 1].search(/[0-9]/);
	}
}

function inputDataList(item, isAdd) {
	let r = item.innerHTML;
	if(!isAdd) {
		data = data.slice(0, -1);
		data += r;
	} else {
		if(!data) {
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


let result, dataForResult;

function calData() {  //계산
	if(data) {
		result = dataForResult = data;

		check:
		for(var i = 0; i < (data.length - 1); i++) {
			checkLastType();
			if(lastIsNum != 0) {
				dataForResult = data.slice(0, -1);
				break check;
			}
		}

		try {
			dataForResult = eval(dataForResult);

		} catch(e) {
			dataForResult = '잘못된 수식';
			returnData(dataForResult);
			return;
		}

		inputDisplay(result);
		returnData(dataForResult);

	}
}

function returnData(result) {
	if(result) {
		outputArea.innerHTML = result;
	}
}

function clearData() {
	data = "";
	lastIsSymbol = "";
	inputArea.innerHTML = "";
	outputArea.innerHTML = "";
	afterDot = 0;
	addZero = 1;
	freeZero = 0;
}

function delData() {
	// 0, 소숫점 입력관련
	checkLastType();
	if (lastIsDot == 0) {
		afterDot = 0;
		addZero = 1;
		freeZero = 0;
	}

	data = data.slice(0, -1);
	inputDisplay(data);
	calData();
}
