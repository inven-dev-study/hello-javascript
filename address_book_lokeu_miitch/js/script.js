/**
 * [OK] 새 연락처 추가
 * [OK] 기존 연락처 수정
 * [OK] 기존 연락처 삭제
 * [OK] ㄱㄴㄷㄹ... 정렬
 * [OK] 연락처 검색
 * 즐겨찾기 추가 / 삭제
 *
 * [OK] +@ 추가 / 수정 시 유효성 검사
 */

function Address(userName, tel, email, favorite) {
    this.userName = userName;
    this.tel = tel;
    this.email = email;
    this.favorite = favorite;

    let isFavorite = "";
    let positionNum = 0;

    this.isFavorite = function() {
        // 추가, 수정 시 클래스 추가에 사용
        if(this.favorite) {
            isFavorite = " favorite";
        }
    }

    this.addAddress = function() {
        this.getPosition();  // ㄱㄴㄷ 정렬을 합니다

        let boxNumber = "index" + positionNum;
        let outerBox = document.getElementById(boxNumber);
        let box = outerBox.querySelector('.detailList');

        // detail을 생성합니다
        let detailBox = this.makeDetailBox();

        // 이름순서로 정렬합니다
        let thisUserOrder = this.getOrder(box); // return "before || after", index;

        if(thisUserOrder) {  // 정렬해야 할 때 (첫번째 이후 들어가는 연락처)
            let targetName = box.getElementsByClassName('name');
            let targetIndex = thisUserOrder[1];
            let targetList = targetName[targetIndex].parentNode;

            if(thisUserOrder[0] == "before") {  // 기존 연락처보다 순서가 앞
                targetList.before(detailBox);
            } else if(thisUserOrder[0] == "after") {  // 기존 연락처보다 순서가 뒤
                targetList.after(detailBox);
            }

        } else {  // 정렬할 필요가 없을 때(첫번째로 들어가는 연락처)
            box.appendChild(detailBox);
        }
    }

    this.makeDetailBox = function() {
        let detailBox = document.createElement('li');
        detailBox.classList.add('detail');
        if (this.favorite) {
            detailBox.classList.add('favorite');
        }

        let AddressData = "<p class='name'>" + this.userName + "</p>" +
                          "<p class='tel'>" + this.tel + "</p>" +
                          "<p class='email'>" + this.email + "</p>" +
                          "<div class='buttonBox'>" +
                          "<button class='change'>수정</button>" +
                          "<button class='delete'>삭제</button>" +
                          "</div>";
        detailBox.innerHTML = AddressData;
        return detailBox;
    }

    this.getOrder = function(position) {
        let nameArr = [];
        let siblingsName = position.getElementsByClassName('name');
        if(siblingsName.length > 0) {  // 형제들 배열을 만듬
            for (let n = 0; n < siblingsName.length; n++) {
                nameArr.push(siblingsName[n].innerText);
            }
            nameArr.push(this.userName);  // 형제들 배열에 나를 푸시
            nameArr.sort();  // 배열을 정렬

            let thisUserOrder = nameArr.indexOf(this.userName);

            if(thisUserOrder < 1) {
                return ["before", thisUserOrder];
            } else {
                return ["after", thisUserOrder - 1];
            }
        } else {
            return false;
        }
    }

    this.changeAddress = function() {
        // 새로 정렬하기 위해 기존 데이터는 삭제되고, 새로 추가되는 형식
        this.deleteforchange();
        this.addAddress();
    }

    this.deleteforchange = function() {
        nowLocation.remove();
    }

    this.getPosition = function() {
        let firstName = this.userName[0];
        switch(true) {  // ㄱ - ㅎ 배치
            case /[0-9]/.test(firstName): positionNum = 0; break;
            case /[ㄱ가-깋]/.test(firstName): positionNum = 1; break;
            case /[ㄴ나-닣]/.test(firstName): positionNum = 2; break;
            case /[ㄷ다-띻]/.test(firstName): positionNum = 3; break;
            case /[ㄹ라-맇]/.test(firstName): positionNum = 4; break;
            case /[ㅁ마-밓]/.test(firstName): positionNum = 5; break;
            case /[ㅂ바-삫]/.test(firstName): positionNum = 6; break;
            case /[ㅅ사-앃]/.test(firstName): positionNum = 7; break;
            case /[ㅇ아-잏]/.test(firstName): positionNum = 8; break;
            case /[ㅈ자-찧]/.test(firstName): positionNum = 9; break;
            case /[ㅊ차-칳]/.test(firstName): positionNum = 10; break;
            case /[ㅋ카-킿]/.test(firstName): positionNum = 11; break;
            case /[ㅌ타-팋]/.test(firstName): positionNum = 12; break;
            case /[ㅍ파-핗]/.test(firstName): positionNum = 13; break;
            case /[ㅎ하-힣]/.test(firstName): positionNum = 14; break;
            case /[A-Za-z]/.test(firstName): positionNum = 15; break;
            default : positionNum = 16; break;
        }
    }

}  // == Address 여기까지 ==

// 신규 추가 시 일시적 객체 생성 및 화면 출력
function getNewAddress(userName, tel, email, favorite = false) {
    let getAddress = new Address(userName, tel, email, favorite);
    getAddress.addAddress();
}

// 기존 수정 시 일시적 객체 생성 및 화면 출력
function getChangeAddress(userName, tel, email, favorite = false) {
    let getAddress = new Address(userName, tel, email, favorite);
    getAddress.changeAddress();
}


// UI Click Event
const getAddressBox = document.getElementById('getAddress');

// miitch ㄱㄴㄷ 박스 접기
const listOfIndex = document.getElementsByClassName('index');
for(let i = 0; i < listOfIndex.length; i++) {
    if(listOfIndex[i].querySelector('span')) {
        listOfIndex[i].querySelector('span').addEventListener('click', function() {
            if ( !this.parentNode.classList.contains('hide') ) {
                this.parentNode.classList.add('hide');
            } else {
                this.parentNode.classList.remove('hide');
            }
        });
    }
}

// miitch 신규 추가 창 띄움
document.getElementById('addButton').addEventListener('click', function() {
    resetCaution();
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


// miitch 유효성 검사 텍스트 리셋
function resetCaution() {
    const target = document.querySelectorAll('.caution');
    for(let i = 0; i < target.length; i++) {
        if(target[i].classList.contains('on')) {
            target[i].classList.remove('on');
        }
        if(target[i].classList.contains('must')) {
            target[i].innerText = "필수항목입니다.";
        } else {
            target[i].innerText = "";
        }
    }
}


// miitch 수정 창 띄움
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


// miitch 창 닫기
getAddressBox.getElementsByClassName('close')[0].addEventListener('click', closeBox);

function closeBox() {
    getAddressBox.classList.remove('showing');
}


// 전화번호 입력란에 숫자만 입력가능
document.getElementById('isTel').addEventListener('keyup', function(event) {
    this.value = this.value.replace(/[^0-9]/g, '');
});

// miitch 추가/수정하기 동작
const submitBtn = document.getElementById('submit');
submitBtn.onclick = function() {
    let isName = document.getElementById('isName').value,
    isTel = document.getElementById('isTel').value,
    isEmail = document.getElementById('isEmail').value,
    isFavorite = document.getElementById('isFavorite').checked;

    // 유효성 검사
    let caution;
    if(isName == "") {  // 이름
        target = document.getElementById('isName');
        caution = target.parentNode.querySelector('.caution');
        caution.classList.add('on');
        caution.innerText = "12자 이내로 이름을 입력해주세요.";
        return false;
    }
    if(isTel == "") {  // 전화번호
        target = document.getElementById('isTel');
        caution = target.parentNode.querySelector('.caution');
        caution.classList.add('on');
        caution.innerText = "전화번호 입력은 필수입니다.";
        return false;
    } else {
        isTel = isTel.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/,"$1-$2-$3");
        if (!/^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}/.test(isTel)) {
            target = document.getElementById('isTel');
            caution = target.parentNode.querySelector('.caution');
            caution.classList.add('on');
            caution.innerText = "전화번호가 유효하지 않습니다.";
            return false;
        }
    }
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    if(isEmail != "" && !re.test(isEmail)) {  // 이메일
        target = document.getElementById('isEmail');
        caution = target.parentNode.querySelector('.caution');
        caution.classList.add('on');
        caution.innerText = "이메일 주소가 유효하지 않습니다.";
        return false;
    }

    // 전송버튼이 가진 클래스값으로, 신규추가와 수정을 구분
    if(submitBtn.classList.contains('isNewAdd')) {
        getNewAddress(isName, isTel, isEmail, isFavorite);
        closeBox();
    } else {
        getChangeAddress(isName, isTel, isEmail, isFavorite);
        closeBox();
    }
}


// lokeu 삭제
document.addEventListener("click", function(del) {
    if (del.target.classList.contains('delete')) {
        let delClick = confirm("삭제 하시겠습니까?");
        if (delClick == true) {
            del.target.parentNode.parentNode.remove();
        } else {
            console.log("취소");
        }
    }
});


// lokeu 연락처 검색
let count = 0;

document.addEventListener('keyup', function(e){

    // 주소록 일부 복사
    let indexDetail = document.querySelector('#indexList'),
        clone = indexDetail.cloneNode(true);

    // search 관련 변수 모음
    let searchInput = document.querySelector('#searchBox input'),
        searchResult = document.querySelector('.searchResult'),
        searchName = searchResult.querySelectorAll('.name'),
        searchNumber = searchResult.querySelectorAll('.tel'),
        searchMail = searchResult.querySelectorAll('.email'),
        searchDetail = searchResult.querySelectorAll('.searchResult .detail');

    // 검색 결과가 없습니다.
    let resultNone = document.querySelector('.resultNone');

    // 반복실행 제어
    if(e.target.classList.contains('searchInput')) {
        if (count == 0) {
            searchResult.prepend(clone);
            count++;
        }
    }

    // 검색결과창 활성화/비활성화
    if (searchInput.value == "") {
        searchResult.style.display = 'none';
        if (count == 1) {
            searchResult.querySelector('#indexList').remove();
            count = 0;

            resultNone.classList.remove('none');
        }
    } else {
        searchResult.style.display = 'block';
    }

    // 검색결과 불러오기
    for(let n = 0; n < searchName.length; n += 1) {
        if (
            searchName[n].innerHTML.indexOf(searchInput.value) > -1 ||
            searchNumber[n].innerHTML.indexOf(searchInput.value) > -1 ||
            searchMail[n].innerHTML.indexOf(searchInput.value) > -1
            ) {
            searchDetail[n].classList.add('on');
            resultNone.classList.add('none');
        } else {
            searchDetail[n].classList.remove('on');
        }
    }
});


// lokeu 즐겨찾기


/* ---------------------------------------------------------------------------------- */
let hong_gildong = new Address('홍길동', '010-111-1111', 'abc@gmail.com', true);
let bok_sooni = new Address('복순이', '010-1234-9865', 'licks277@gmail.com', false);
let kim_chulsu = new Address('김철수', '010-9685-1425', 'iron.kim@gmail.com', true);
let kim_gane = new Address('김가네', '02-1234-2343', 'kimgane@gmail.com', false);
let doe_muji = new Address('도무지', '010-2323-5498', 'doedoe@naver.com', true);
let kim_minji = new Address('김민지', '010-2323-5498', 'miimii@naver.com', false);
let kim_dahye = new Address('김다혜', '010-4242-5353', 'da_hye@naver.com', false);

hong_gildong.addAddress();
bok_sooni.addAddress();
kim_chulsu.addAddress();
kim_gane.addAddress();
doe_muji.addAddress();
kim_minji.addAddress();
kim_dahye.addAddress();
/* ---------------------------------------------------------------------------------- */
