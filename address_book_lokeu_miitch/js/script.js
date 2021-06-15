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

    this.isFavorite = function() {
        // 즐겨찾기 여부 체크
        // this.favorite = ??
    }

    this.changeInfo = function() {
        // 수정
    }

    this.delAddress = function() {
        // 삭제
    }

    this.test = function() {
        console.log(this.userName);
    }
}


let test1 = new Address('홍길동', '010-111-1111', 'abc@gmail.com', false);
test1.test();