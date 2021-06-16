/**
 * 새 연락처 추가
 * 기존 연락처 수정
 * 기존 연락처 삭제
 * ㄱㄴㄷㄹ... 정렬
 * 연락처 검색
 * 즐겨찾기 추가 / 삭제
 * 
 * +@ 추가 / 수정 시 유효성 검사
 */

function Address(userName, tel, email, favorite) {
    this.userName = userName;
    this.tel = tel;
    this.email = email;
    this.favorite = favorite;
    
    let positionNum = 0;
    let isFavorite = "";

    // 공통으로 들어가는 버튼
    this.buttonBox = "<div class='buttonBox'>" +
                     "<button class='change'>수정</button>" + 
                     "<button class='delete'>삭제</button>" + "</div>";

    this.isFavorite = function() {
        // 추가, 수정 시 클래스 추가에 사용
        if(this.favorite) {
            isFavorite = " favorite";
        }
    }

    this.addAddress = function() {
        this.getPosition();
        this.isFavorite();

        let indexList = document.getElementById('indexList');
        let box = indexList.querySelector("li[data-index='"+ positionNum +"'").querySelector('.detailList');

        box.innerHTML += "<li class='detail" + isFavorite + "'>" +
                            "<p class='name'>" + this.userName + "</p>" +
                            "<p class='tel'>" + this.tel + "</p>" +
                            "<p class='email'>" + this.email + "</p>" +
                            this.buttonBox +
                            "</li>";
    }

    this.changeAddress = function() {  // 기존 데이터 삭제되고, 위치를 체크해서 새로 추가되어야 함
        this.isFavorite();
        box.innerHTML = "<li class='detail" + isFavorite + "'>" +
                            "<p class='name'>" + this.userName + "</p>" +
                            "<p class='tel'>" + this.tel + "</p>" +
                            "<p class='email'>" + this.email + "</p>" +
                            this.buttonBox +
                            "</li>";
    }

    this.delAddress = function() {
        // 삭제
    }

    this.test = function() { //테스트용
        console.log(this.userName);
        console.log(this.tel);
        console.log(this.email);
        console.log(this.favorite);
    }

    this.getPosition = function() {
        let firstName = this.userName[0];
        switch(true) {
            // ㄱ - ㅎ 배치     // 가-깋 정렬은.. 들어있는 기존값과 함께 체크해서 앞뒤 판단..?
            case /[가-깋]/.test(firstName): positionNum = 1; break;
            case /[나-닣]/.test(firstName): positionNum = 2; break;
            case /[다-띻]/.test(firstName): positionNum = 3; break;
            case /[라-맇]/.test(firstName): positionNum = 4; break;
            case /[마-밓]/.test(firstName): positionNum = 5; break;
            case /[바-삫]/.test(firstName): positionNum = 6; break;
            case /[사-앃]/.test(firstName): positionNum = 7; break;
            case /[아-잏]/.test(firstName): positionNum = 8; break;
            case /[자-찧]/.test(firstName): positionNum = 9; break;
            case /[차-칳]/.test(firstName): positionNum = 10; break;
            case /[카-킿]/.test(firstName): positionNum = 11; break;
            case /[타-팋]/.test(firstName): positionNum = 12; break;
            case /[파-핗]/.test(firstName): positionNum = 13; break;
            case /[하-힣]/.test(firstName): positionNum = 14; break;
            default : alert("ERROR"); break;
        }
    }
}  // == Address 여기까지 ==


let getAddress;
function getNewAddress(userName, tel, email, favorite = false) {
    getAddress = new Address(userName, tel, email, favorite);
    getAddress.addAddress();
}

function getChangeAddress(userName, tel, email, favorite = false) {
    getAddress = new Address(userName, tel, email, favorite);
    getAddress.changeAddress();
}


// UI Click Event
const getAddressBox = document.getElementById('getAddress');

// 신규 추가
document.getElementById('addButton').addEventListener('click', function() {
    getAddressBox.querySelector('h2').innerText = "새 연락처 추가";
    getAddressBox.querySelector('#isName').value = "";
    getAddressBox.querySelector('#isTel').value = "";
    getAddressBox.querySelector('#isEmail').value = "";
    getAddressBox.querySelector('#isFavorite').checked = false;
    getAddressBox.querySelector('#submit').innerText = "추가하기";

    // 추가/수정 분기용
    if(getAddressBox.querySelector('#submit').classList.contains('isChange')) {
        getAddressBox.querySelector('#submit').classList.remove('isChange');
        getAddressBox.querySelector('#submit').classList.add('isNewAdd');
    }

    getAddressBox.classList.add('showing');
});


// 수정
let nowLocation;
document.addEventListener('click', function (event) {
    if ( event.target.classList.contains( 'change' ) ) {
        let targetList = event.target.parentNode.parentNode;
        let checkFavorite = targetList.classList.contains('favorite');

        nowLocation = targetList;  //수정 대상
    
        getAddressBox.querySelector('h2').innerText = "연락처 수정";
        getAddressBox.querySelector('#isName').value = targetList.getElementsByClassName('name')[0].innerText;
        getAddressBox.querySelector('#isTel').value = targetList.getElementsByClassName('tel')[0].innerText;
        getAddressBox.querySelector('#isEmail').value = targetList.getElementsByClassName('email')[0].innerText;
        getAddressBox.querySelector('#isFavorite').checked = checkFavorite;
        getAddressBox.querySelector('#submit').innerText = "수정하기";

        // 추가/수정 분기용
        if(getAddressBox.querySelector('#submit').classList.contains('isNewAdd')) {
            getAddressBox.querySelector('#submit').classList.remove('isNewAdd');
            getAddressBox.querySelector('#submit').classList.add('isChange');
        }

        getAddressBox.classList.add('showing');
    }
}, false);


// 창 닫기
getAddressBox.getElementsByClassName('close')[0].addEventListener('click', closeBox);

function closeBox() {
    getAddressBox.classList.remove('showing');
};


// 추가/수정하기 창에서 추가/수정하기 버튼을 누르면
const submitBtn = document.getElementById('submit');
submitBtn.onclick = function() {
    let isName = document.getElementById('isName').value,
        isTel = document.getElementById('isTel').value,
        isEmail = document.getElementById('isEmail').value,
        isFavorite = document.getElementById('isFavorite').checked;
        
    if(submitBtn.classList.contains('isNewAdd')) {
        getNewAddress(isName, isTel, isEmail, isFavorite);
        closeBox();
    } //else {
      //  getChangeAddress(isName, isTel, isEmail, isFavorite);
      //  closeBox();
    //}
}


/* ---------------------------------------------------------------------------------- */
let hong_gildong = new Address('홍길동', '010-111-1111', 'abc@gmail.com', true);
let bok_sooni = new Address('복순이', '02-1234-9865', 'licks277@gmail.com', false);
let kim_gane = new Address('김가네', '02-1234-2343', 'kimgane@gmail.com', false);
let kim_chulsu = new Address('김철수', '02-9685-1425', 'iron.kim@gmail.com', false);
let doe_muji = new Address('도무지', '02-2323-5498', 'doedoe@naver.com', false);

hong_gildong.addAddress();
bok_sooni.addAddress();
kim_gane.addAddress();
kim_chulsu.addAddress();
doe_muji.addAddress();
/* ---------------------------------------------------------------------------------- */
