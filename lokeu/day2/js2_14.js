/*
    [2.14] switch문
*/

// 복수의 if문은 switch문으로 전환 가능
let a = 2 + 3;

switch (a) {
  case 3:
    alert("작은 수");
    break;
  case 4:
    alert("같은 수");
    break;
  //여러개의 case 문을 묶는 것이 가능.
  case 5:
  case 6:
    alert("큰 수");
    break;
  default:
    alert("파악 불가능");
}

// case문 마다 break가 없으면 조건에 부합하는지 여부를 따지지 않고 이어지는 case문을 실행.
