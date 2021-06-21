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

    let positionNum = 0;

    this.addAddress = function() {
        this.getPosition();  // ㄱㄴㄷ 정렬을 합니다

        let boxNumber = "index" + positionNum;  // 0-9 -> index0 | ㄱ -> index1 ...
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
        if(siblingsName.length > 0) {
            for (let n = 0; n < siblingsName.length; n++) {
                nameArr.push(siblingsName[n].innerText);
            }
            nameArr.push(this.userName);
            nameArr.sort();

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
            case /[ㄷㄸ다-띻]/.test(firstName): positionNum = 3; break;
            case /[ㄹ라-맇]/.test(firstName): positionNum = 4; break;
            case /[ㅁ마-밓]/.test(firstName): positionNum = 5; break;
            case /[ㅂㅃ바-삫]/.test(firstName): positionNum = 6; break;
            case /[ㅅㅆ사-앃]/.test(firstName): positionNum = 7; break;
            case /[ㅇ아-잏]/.test(firstName): positionNum = 8; break;
            case /[ㅈㅉ자-찧]/.test(firstName): positionNum = 9; break;
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


// miitch ㄱㄴㄷ 박스 접기
const listOfIndex = document.getElementsByClassName('index');
for(let i = 0; i < listOfIndex.length; i++) {
    listOfIndex[i].querySelector('span').addEventListener('click', function() {
        if ( !this.parentNode.classList.contains('hide') ) {
            this.parentNode.classList.add('hide');
        } else {
            this.parentNode.classList.remove('hide');
        }
    });
}

// miitch 추가/수정 관련 변수
const getAddressBox = document.getElementById('getAddress'),
      boxTitle = getAddressBox.getElementsByTagName('h2')[0],
      isName = getAddressBox.querySelector('#isName'),
      isTel = getAddressBox.querySelector('#isTel'),
      isEmail = getAddressBox.querySelector('#isEmail'),
      isFavorite = getAddressBox.querySelector('#isFavorite'),
      submitButton = getAddressBox.querySelector('#submit');

// miitch 신규 추가 창 띄움
document.getElementById('addButton').addEventListener('click', function() {
    resetCaution();
    noScroll();

    boxTitle.innerText = "새 연락처 추가";
    isName.value = "";
    isTel.value = "";
    isEmail.value = "";
    isFavorite.checked = false;
    submitButton.innerText = "추가하기";

    // 추가/수정 분기용
    if(submitButton.classList.contains('isChange')) {
        submitButton.classList.remove('isChange');
        submitButton.classList.add('isNewAdd');
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

// 창이 떠있을 때 body 스크롤 금지
function noScroll() {
    document.getElementsByTagName('body')[0].classList.add('fixed');
}


// miitch 수정 창 띄움
let nowLocation;
document.addEventListener('click', function (event) {
    if ( event.target.classList.contains( 'change' ) ) {
        noScroll();

        let targetList = event.target.parentNode.parentNode;
        let checkFavorite = targetList.classList.contains('favorite');

        nowLocation = targetList;  //수정 대상

        boxTitle.innerText = "연락처 수정";
        isName.value = targetList.getElementsByClassName('name')[0].innerText;
        isTel.value = targetList.getElementsByClassName('tel')[0].innerText;
        isEmail.value = targetList.getElementsByClassName('email')[0].innerText;
        isFavorite.checked = checkFavorite;
        submitButton.innerText = "수정하기";

        // 추가/수정 분기용
        if(submitButton.classList.contains('isNewAdd')) {
            submitButton.classList.remove('isNewAdd');
            submitButton.classList.add('isChange');
        }

        getAddressBox.classList.add('showing');
    }
}, false);


// miitch 창 닫기
getAddressBox.getElementsByClassName('close')[0].addEventListener('click', closeBox);

function closeBox() {
    getAddressBox.classList.remove('showing');
    document.getElementsByTagName('body')[0].classList.remove('fixed');
}


// 전화번호 입력란에 숫자만 입력가능
isTel.addEventListener('keyup', function(event) {
    this.value = this.value.replace(/[^0-9]/g, '');
});

// miitch 추가/수정하기 동작
const submitBtn = document.getElementById('submit');
submitBtn.onclick = function() {
    let isNameVal = document.getElementById('isName').value,
        isTelVal = document.getElementById('isTel').value,
        isEmailVal = document.getElementById('isEmail').value,
        isFavorite = document.getElementById('isFavorite').checked;

    // 유효성 검사
    let caution;
    if(isNameVal == "") {  // 이름
        target = isName;
        caution = target.parentNode.querySelector('.caution');
        caution.classList.add('on');
        caution.innerText = "12자 이내로 이름을 입력해주세요.";
        return false;
    }

    if(isTelVal == "") {  // 전화번호
        target = isTel;
        caution = target.parentNode.querySelector('.caution');
        caution.classList.add('on');
        caution.innerText = "전화번호 입력은 필수입니다.";
        return false;
    } else {
        isTelVal = isTelVal.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/,"$1-$2-$3");
        if (!/^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}/.test(isTelVal)) {
            target = isTel;
            caution = target.parentNode.querySelector('.caution');
            caution.classList.add('on');
            caution.innerText = "전화번호가 유효하지 않습니다.";
            return false;
        }
    }

    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    if(isEmailVal != "" && !re.test(isEmailVal)) {  // 이메일
        target = isEmail;
        caution = target.parentNode.querySelector('.caution');
        caution.classList.add('on');
        caution.innerText = "이메일 주소가 유효하지 않습니다.";
        return false;
    }

    // 전송버튼이 가진 클래스값으로, 신규추가와 수정을 구분
    if(submitBtn.classList.contains('isNewAdd')) {
        getNewAddress(isNameVal, isTelVal, isEmailVal, isFavorite);
        closeBox();
    } else {
        getChangeAddress(isNameVal, isTelVal, isEmailVal, isFavorite);
        closeBox();
    }
}

let indexDetail, clone, bookMark;

// lokeu 삭제
document.addEventListener("click", function(del) {

    // 주소록 일부 복사
    indexDetail = document.querySelector('#indexList');

    if (del.target.classList.contains('delete')) {
        let delClick = confirm("삭제 하시겠습니까?");
        if (delClick == true) {
            del.target.parentNode.parentNode.remove();

            // 즐겨찾기와 리스트에 있는 주소록이 일치한지 검색
            for (let bf = 0; bf < indexDetail.querySelectorAll('.favorite').length; bf += 1) {
                if (del.target.parentNode.parentNode.innerHTML == indexDetail.querySelectorAll('.favorite')[bf].innerHTML) {
                    del.target.parentNode.parentNode.remove();
                    indexDetail.querySelectorAll('.favorite')[bf].remove();
                }
            }
        } else {
            console.log("취소");
        }
    }
});


// lokeu 연락처 검색
let count = 0;

document.addEventListener('keyup', function(e){

    // 주소록 일부 복사
    indexDetail = document.querySelector('#indexList');
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
window.onload = function() {
    favorLoad();
}

document.addEventListener('click', function(bookmark){
    if (bookmark.target.classList.contains('change')) {
        console.log(this);
    }
    if (
        bookmark.target.classList.contains('isChange') &&
        document.getElementById('isFavorite').checked == true
        ) {
        console.log('수정버튼 활성화');
    } else {
        console.log('수정버튼 비활성화');
    }
});

function favorLoad() {
    let favoriteAddress = document.getElementsByClassName('favorite'),
        favoriteArr = [];
    bookMark = document.getElementById('bookmarkList');

    // favorite 값이 포함된 li 태그를 배열에 담기
    for (let f = 0; f < favoriteAddress.length; f+=1) {
        let favoriteClone = favoriteAddress[f].cloneNode(true);
        favoriteArr.push(favoriteClone);
    }

    // 배열에 담은 li태그를 bookmarkList에 옮겨 담기
    for (let b = 0; b < favoriteArr.length; b+=1) {
        bookMark.append(favoriteArr[b]);
    }
}

/* ---------------------------------------------------------------------------------- */
let hong_gildong = new Address('홍길동', '010-111-1111', 'abc@gmail.com', false);
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
