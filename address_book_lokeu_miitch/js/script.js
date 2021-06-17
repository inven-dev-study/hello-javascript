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
        this.getPosition();

        let indexList = document.getElementById('indexList');
        let box = indexList.querySelector("li[data-index='"+ positionNum +"'").querySelector('.detailList');

        box.innerHTML += "<li class='detail" + isFavorite + "'>" +
                         "<p class='name'>" + this.userName + "</p>" +
                         "<p class='tel'>" + this.tel + "</p>" +
                         "<p class='email'>" + this.email + "</p>" +
                         "<div class='buttonBox'>" +
                         "<button class='change'>수정</button>" + 
                         "<button class='delete'>삭제</button>" + 
                         "</div></li>";


        this.getOrder(box);

        let detailBox = document.createElement('li');
        detailBox.classList.add('detail');
        if (this.favorite) {
            detailBox.classList.add('favorite');
        }

        // let AddressData = "<li class='detail" + isFavorite + "'>" +
        //                   "<p class='name'>" + this.userName + "</p>" +
        //                   "<p class='tel'>" + this.tel + "</p>" +
        //                   "<p class='email'>" + this.email + "</p>" +
        //                   this.buttonBox +
        //                   "</li>";

        let AddressData = "<p class='name'>" + this.userName + "</p>" +
                          "<p class='tel'>" + this.tel + "</p>" +
                          "<p class='email'>" + this.email + "</p>" +
                          "<div class='buttonBox'>" +
                          "<button class='change'>수정</button>" + 
                          "<button class='delete'>삭제</button>" + 
                          "</div>";

        // 기존 리스트

        // switch(orderIs) {
        //     case "before":
        //         console.log('working?');
        //         console.log(getOrder(box));
        //         box.getOrder[1](detailBox);
        //         detailBox.innerHTML = AddressData;
        //         break;
        //     default:
        //         box.append(detailBox);
        //         detailBox.innerHTML = AddressData;
        //         break;
        // }
    }

    let nameArr = [];
    this.getOrder = function(position) {
        let siblingsName = position.getElementsByClassName('name');
        if(siblingsName.length > 0) {
            for (let n = 0; n < siblingsName.length; n++) {
                nameArr.push(siblingsName[n].innerText);
            }
            console.log(nameArr);
        }
        //PLAN
        // "형제"들 배열을 만들었다 ↑↑↑↑
        // "형제"들 배열에 "나"를 넣는다 .. sort() 한다.. 배열에서의 "나"의 위치를 찾고, (indexOf) "나"의 앞이나 뒤 형제 배열을 찾고.. 
        // 그 형제 배열을 이용해 해당 형제 li를 찾아, after 나 before 로 "나"를 넣는다.
        
        // 잘되면.. 아래 폐기!
        // let siblingsName = position.querySelectorAll('p.name');
        // if (siblingsName.length > 0) {  // 자음리스트 안에 이미 정보(=형제)가 하나 이상 있는 경우
        //     checkMyPosition: 
        //     for(let m = 1; m < this.userName.length; m++) {  // 추가 대상(=나)의 유저이름 길이만큼 반복
        //         for(let n = 0; n <= siblingsName.length; n++) {  // 정보 갯수만큼 반복
        //         console.log(n + ", " + siblingsName.length);
        //             let siblingNamesCode = siblingsName[n].innerText.charCodeAt(m);
        //             let myNamesCode = this.userName.charCodeAt(m);
        //             if(siblingNamesCode == myNamesCode) {  // 이름의 둘째글자(m=1)가 동일하면 다음 글자(m=2)를 비교한다(continue)... 
        //                 continue checkMyPosition;
        //             } else if (siblingNamesCode > myNamesCode) {  // 형제의 둘째글자가 내 둘째글자보다 크면, 나는 형제의 앞으로 간다... 
        //                 console.log(this.userName + ", " + myNamesCode + "<= 내이름,코드 | before | 내형제코드 => " + siblingNamesCode);
        //                 let returnItems = ["before", siblingsName[n]]
        //                 return returnItems;
        //             } else {  // 내 둘째글자가 형제의 둘째글자보다 크면 나는 형제의 뒤로 가는데.. 이 때 "그 다음 형제의 둘째글자와도 비교"해야한다..!!
        //                 console.log(this.userName + ", " + myNamesCode + "<= 내이름,코드 | append | 내형제코드 => " + siblingNamesCode);
        //                 // if (n == siblingsName.length)
        //                 // break ;
        //                 // return "append";
        //             }
        //         }
        //         // return "append";
        //     }
        // }
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

// lokeu 삭제
window.onload = function() {
    let addressList = document.querySelectorAll(".detail");
    let deleteBtn = document.querySelectorAll(".delete");

    console.log(deleteBtn);
    for(let n = 0; n < deleteBtn.length; n += 1) {
        deleteBtn[n].addEventListener('click', function(){
            let delClick = confirm("삭제하시겠습니까?");
            if (delClick == true) {
                addressList[n].remove();
            } else {
                console.log("취소");
            }
        });
    }
}

// lokeu 연락처 검색

let searchInput = document.querySelector("#searchBox input");
let searchResult = document.querySelector(".searchResult");
let searchName = document.querySelectorAll(".searchResult p.name");
let searchDetail = document.querySelectorAll(".searchResult li");

searchInput.addEventListener("keyup", function(e){
    // 1. 검색창 입력 시작 시 검색 결과 리스트 노출
    // 검색창에 아무 것도 없을 시 검색 결과 화면이 사라져야한다.
    if (searchInput.value == "") {
        searchResult.style.display = 'none';
    } else {
        searchResult.style.display = 'block';
    }
    console.log(document.querySelectorAll('.detail')[0].innerHTML);
    // detail의 값이 복사? 이동?
    //document.querySelector(".searchResult ul").innerHTML = document.querySelectorAll('.indexList .detail');

    // 2. 검색창에 글자를 입력 시 일치한 결과 출력
    for(let n = 0; n < searchName.length; n += 1) {
        if (searchName[n].innerHTML.indexOf(searchInput.value) > -1) {
            searchDetail[n].classList.add('on');
        } else {
            searchDetail[n].classList.remove('on');
        }
    }
});


/* ---------------------------------------------------------------------------------- */
let hong_gildong = new Address('홍길동', '010-111-1111', 'abc@gmail.com', true);
let bok_sooni = new Address('복순이', '02-1234-9865', 'licks277@gmail.com', false);
let kim_chulsu = new Address('김철수', '02-9685-1425', 'iron.kim@gmail.com', false);
let kim_gane = new Address('김가네', '02-1234-2343', 'kimgane@gmail.com', false);
let doe_muji = new Address('도무지', '02-2323-5498', 'doedoe@naver.com', false);
let kim_minji = new Address('김민지', '02-2323-5498', 'miimii@naver.com', false);

hong_gildong.addAddress();
bok_sooni.addAddress();
kim_chulsu.addAddress();
kim_gane.addAddress();
doe_muji.addAddress();
kim_minji.addAddress();
/* ---------------------------------------------------------------------------------- */
