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



/*
    연락처 검색

    0. 작업 전 느낀 사항
    - 예제, 참고 사이트, 주소록 어플을 살펴본 결과 검색 결과를 출력해주는 창이 하나 더 있다는 것을 발견
    - html 마크업 추가의 필요성을 느낌

    1. 검색창에 입력 시작 시 '검색 결과 리스트' 노출
    2. 검색창에 글자 입력 시 일치한 결과 출력
    3. 검색창에 결과가 없을 시 '결과 없음' 텍스트 노출
*/

// 1. 검색창 입력 시작 시 검색 결과 리스트 노출
let searchInput = document.querySelector("#searchBox input");
let searchResult = document.querySelector(".searchResult");
let indexList = document.querySelectorAll(".detail p.name");

searchInput.addEventListener("keydown", function(e){
    //searchResult.style.display = 'block';

    // 2. 검색창에 글자를 입력 시 일치한 결과 출력
    // 2-1. 글자 입력한 값을 받아야 한다.
    console.log(searchInput.value);


    // 2-2. 입력한 글자와 일치하는 주소록 정보를 찾아야한다.
    for(let n = 0; n < indexList.length; n += 1) {
        if (searchInput.value == indexList[n].innerText) {
            console.log("일치");
        }
    }
});