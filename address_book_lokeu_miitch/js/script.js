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

        let indexList = document.getElementById('indexList');
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

    let nameArr = [];
    this.getOrder = function(position) {
        let siblingsName = position.getElementsByClassName('name');
        if(siblingsName.length > 0) {  // 형제들 배열을 만듬
            for (let n = 0; n < siblingsName.length; n++) {
                nameArr.push(siblingsName[n].innerText);
            }
            nameArr.push(this.userName);  // 형제들 배열에 나를 푸시
            console.log(nameArr.sort());  // 배열을 정렬
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

    this.changeAddress = function() {  // 새로 정렬하기 위해 기존 데이터는 삭제되고, 새로 추가되는 형식
        this.deleteforchange();
        this.addAddress();
    }

    this.deleteforchange = function() {

    }

    this.getPosition = function() {
        let firstName = this.userName[0];
        switch(true) {  // ㄱ - ㅎ 배치
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

// miitch 신규 추가 창 띄움
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
};


// miitch 추가/수정하기 동작
const submitBtn = document.getElementById('submit');
submitBtn.onclick = function() {
    let isName = document.getElementById('isName').value,
    isTel = document.getElementById('isTel').value,
    isEmail = document.getElementById('isEmail').value,
    isFavorite = document.getElementById('isFavorite').checked;

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
