"use strict";

const USER_ID = "id";
const USER_NAME = "name";
const USER_PHONE = "phone";
const USER_ADDRESS = "address";
const USER_EMAIL = "email";
const USER_IS_FAVORITE = "isFavorite";

const form = document.getElementById("form");
const userId = document.getElementById("userId");
const userName = document.getElementById("userName");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const address = document.getElementById("address");
const isFavorite = document.getElementById("isFavorite");

let modal = document.getElementById("add-modal");
let deleteModal = document.getElementById("delete-modal");
let addBtn = document.getElementById("addBtn");
let updateBtn = document.getElementById("updateBtn");
let favoriteBtn = document.getElementById("favoriteBtn");
let deleteBtn = document.getElementById("deleteBtn");
let noBtn = document.getElementById("delete-no");
let yesBtn = document.getElementById("delete-yes");
let closeBtns = document.getElementsByClassName("close");


// 수정 여부
let isUpdateMode = false;

// let users = {};
let users = {
  베르_123: {
    name: "베르",
    phone: "01012345678",
    address: "서울",
    email: "ber@inven.co.kr",
    isFavorite: false,
  },
  뮤이_123: {
    name: "뮤이",
    phone: "01012345678",
    address: "서울",
    email: "muey@inven.co.kr",
    isFavorite: false,
  },
};

// detailinfo 들어갈 때 예시 작성
// for(let i=0;i<5;i++){
//  var elem=document.createElement('div');
//  elem.appendChild(document.createTextNode('The man who mistook his wife for a hat'));
//  document.getElementById('personinfo').appendChild(elem)
// }

// 객체를 배열에 담음
let arr=[
  {
  name: "베르",
    phone: "01012345678",
    address: "서울",
    email: "ber@inven.co.kr",
    isFavorite: false,
  },{
    name: "뮤이",
    phone: "01012345678",
    address: "서울",
    email: "muey@inven.co.kr",
    isFavorite: false,
  },
];

// 한글 초성 빼기
function cho_hangul(hangeul,str) {
  let result= "";
  for( i = 0; i < 1; i++) {
    let code = str.charCodeAt(i)-44032;

    if(code>-1 && code<11172){
      let chosung=hangeul[Math.floor(code/588)]
      result=chosung;
    }
  }
return result;
}


var hangeul =  ["ㄱ","ㄲ","ㄴ","ㄷ","ㄸ","ㄹ","ㅁ","ㅂ","ㅃ","ㅅ","ㅆ","ㅇ","ㅈ","ㅉ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];

  for ( var i=0; i < hangeul.length; i++) {
    // 노란색 자음 바 반복문
    let letter=hangeul[i];

    // personlist 자식요소 생성
    let nameElem=document.createElement('div')
    nameElem.setAttribute("class", "detailinfo");


    for(let j=0;j<arr.length;j++){

      try {
      // 주석 친 부분을 사용하면 ㄱ 이 없어지는 오류..가 있어 일단 주석처리
      //   let name=arr[i].name
      
      // let firstLetter=cho_hangul(hangeul,name)
      // // let firstLetter=cho_hangul(hangeul,'가오')
      // console.log('firstLetter: ',firstLetter)

      // if(firstLetter==letter){ // 객체 이름의 초성과 한글 배열의 값이 같다면
      
      //   console.log('yeah: ',letter)
      //   console.log('yeah2: ',name)
      // }else{
      //   console.log('yeah3: ',letter)
      //   console.log('yeah4: ',name)
      // }

      let br = document.createElement("br");
      nameElem.appendChild(document.createTextNode(`${arr[j].name}`));
      nameElem.appendChild(br);
    
      } catch (error) {        
        console.log('error: ',error)
      }
    } 

    // <div class ="personlist" id="person_0" > 생성
    var elem=document.createElement('div')
    
    elem.appendChild(document.createTextNode(`${hangeul[i]}`));
    elem.setAttribute('class','personlist')
    elem.setAttribute('id',`person_${i}`)

    elem.appendChild(nameElem)

    document.getElementById('personListWrapper').appendChild(elem)
    // document.getElementById('personlist').innerHTML =  `<div class="personlist">${hangeul[i]}</div>`;

  }


window.onload = function(){
  for(let btn of closeBtns){
    btn.onclick = function() {
      closeModal();
    }
  }
};

// user toggle, 이름을 클릭하면 detailinfo 폴딩 동작 (수정필요), 이 부분 주석 풀면 addBtn이 동작하지 않음.
// toggleBtn.onclick = function() {
//   if(document.getElementById('detailinfo').style.display === 'none') {
//     document.getElementById('detailinfo').style.display = 'block';
//   } else {
//     document.getElementById('detailinfo').style.display = 'none';
//   }
// }


// When the user clicks on the button, open the modal
addBtn.onclick = function () {
    isUpdateMode = false;
  modal.style.display = "block";
  clearInputDatas([userName, phone, email, address]);
};

// 처음에 form에 submit 새로고침 이슈 때문에 saveBtn을 만들어놨는데,
// 이벤트리스너가 있더라고용 ! (제가 쓴 코드가 아니여서 알아보기가 어렵고
// 또 주말인데 여쭤보기가 좀 불편해하실까봐 여기에 모든 것을.. 적습니당 ) 
// 뭐가 좀더 나은지 알아봤는데 submit 이벤트 리스너는 스크롤 리스닝이나 소켓통신할 때 쓰인대서,
// saveBtn을 만들어봤는데, 수정하기 어렵거나 복잡하다면 submit 이벤트 리스너 그대로
// 하는게 좋겠다고 생각합니당. 
saveBtn.onclick = function (e) {
  e.preventDefault()
  let name=document.getElementById('userName').value
  let phone=document.getElementById('phone').value
  let email=document.getElementById('email').value
  let address=document.getElementById('address').value

  
  console.log('name: ',name)
  console.log('phone: ',phone)
  console.log('email: ',email)
  console.log('address: ',address)

  let obj={
    name: name,
    phone: phone,
    address:address,
    email: email,
    isFavorite: false,
  }

  if(obj != null) {
    arr.push(obj);
    document.querySelector(".detailinfo").value="";
  } 

  showList();

  // location.reload();
  //   isUpdateMode = false;
  // modal.style.display = "block";
  // clearInputDatas([userName, phone, email, address]);
};

document.getElementById('personinfo').appendChild = `
<div id="personinfo-element" class="personinfo-element" >
    <div class="toggle-name" id="toggleBtn" >
        <img class="profileimg" src="/icon/person.svg"/>
        <span>${arr.name}</span>
    </div>
    <div class="detailinfo" id="detailinfo" style="display: none;">
        <p>Name : ${arr.name}</p>
        <p>Phone : ${arr.phone}</p>
        <p>Address : ${arr.address}</p>
        <p>Email : ${arr.email}</p>
        <button id="updateBtn">Update User</button>
        <button id="favoriteBtn">즐겨찾기</button>
        <button id="deleteBtn">삭제</button>
    </div>
</div>
`;

function showList() {
  let list = "<div id='personinfo-element'>";

  for (let i = 0; i < arr.length; i++) {
    
  }
}


updateBtn.onclick = function() {
    isUpdateMode = true;
    modal.style.display = "block";
    let user = getUser('베르_123');
    displayUser(user);
    //console.log(users);
}

favoriteBtn.onclick = function() {
    updateFavorite('베르_123', true);
    //console.log(users);
}
deleteBtn.onclick = function(){
  isUpdateMode = false;
  deleteModal.style.display = "block";
  //console.log(users);
  arr.splice(userName, 1);
  showList();
}



// function displaySubmitButton(text){
//     let saveBtn = document.querySelector('[type=submit]')
//     saveBtn.innerText = text;
// }

function displayUser(user){
    userId.value = user.id;
    userName.value = user.name;
    phone.value = user.phone;
    email.value = user.email;
    address.value = user.address;
    isFavorite.value = user.isFavorite;
    displaySubmitButton("수정");
    
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal || event.target == deleteModal) {
    closeModal();
  }
};

function closeModal(){
    modal.style.display = "none";
    deleteModal.style.display = "none";
    isUpdateMode = false;
}

function User(id, name, phone, email, address, isFavorite) {
  this.id = id;
  this.name = name;
  this.phone = phone;
  this.address = address;
  this.email = email;
  this.isFavorite = isFavorite;
  return this;
}

/**
 * 객체의 프로퍼티 키값이 될 아이디(이름_생성날짜시간) 생성
 * 이름순으로 정렬하기 위해 아이디에 이름을 사용
 * @returns 생성날짜시간
 */
function createUserId(name) {
  let time = Date.now();
  return `${name}_${time}`;
}

/**
 * 객체에 아이디(이름_생성날짜시간)를 생성하여 프로퍼티 추가
 * @param {유저} user
 */
function createUser(user) {
  users[user.id] = {
    [USER_NAME]: user.name,
    [USER_PHONE]: user.phone,
    [USER_ADDRESS]: user.address,
    [USER_EMAIL]: user.email,
    [USER_IS_FAVORITE]: user.isFavorite,
  };
  console.log(users);
}
/**
 * 객체에서 해당 아이디의 프로퍼티 수정
 * @param {유저} user
 */
function updateUser(user) {
  let isNotEmpty = user.id in users;
  if (!isNotEmpty) {
    alert("주소록 정보를 찾을수 없습니다.");
    return;
  }

  users[user.id] = {
    [USER_NAME]: user.name,
    [USER_PHONE]: user.phone,
    [USER_ADDRESS]: user.address,
    [USER_EMAIL]: user.email,
    [USER_IS_FAVORITE]: user.isFavorite,
  };
  console.log(users);
}

//
/**
 * 객체에서 해당 user 프로퍼티 정보 가져오기
 * @param {아이디} id
 * @returns user 프로퍼티
 */
function getUser(id) {
  let isNotEmpty = id in users;
  if (!isNotEmpty) {
    alert("주소록 정보를 찾을수 없습니다.");
    return;
  }
  let user = users[id];
   
  return new User(id, user.name, user.phone, user.email, user.address, user.isFavorite);
}

/**
 * 객체에서 해당 아이디의 프로퍼티 삭제
 * @param {아이디} id
 * @returns
 */
function deleteUser(id) {
  let isNotEmpty = id in users;
  if (!isNotEmpty) {
    alert("주소록 정보를 찾을수 없습니다.");
    return;
  }

  delete users[id];
  console.log(users);
}

// /**
//  * 객체에서 해당 아이디의 프로퍼티내 즐겨찾기 여부 수정
//  * @param {아이디} id
//  * @param {즐겨찾기 여부} isFavorite
//  * @returns
//  */
function updateFavorite(id, isFavorite) {
  let isNotEmpty = id in users;
  if (!isNotEmpty) {
    alert("주소록 정보를 찾을수 없습니다.");
    return;
  }
  users[id].isFavorite = isFavorite;
  console.log(users);
}


function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

// Show success outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

// Check email is valid
function checkEmail(input) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
    return true;
  } else {
    showError(input, "유효하지 않은 Email입니다.");
    return false;
  }
}

function telValidator(input) {
  let telNumber = input.value.trim();
  let replaceNumber = telNumber.replaceAll("-", "");
  const re = /^[0-9]{2,3}[0-9]{3,4}[0-9]{4}/;
  if (re.test(replaceNumber)) {
    showSuccess(input);
    return true;
  } else {
    showError(input, `유효하지 않는 전화번호입니다.`);
    return false;
  }
}

// Check required fields
function checkRequired(inputArr) {
  let isRequired = false;
  inputArr.forEach(function (input) {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)}은 필수 입력값 입니다.`);
      isRequired = true;
    } else {
      showSuccess(input);
    }
  });

  return isRequired;
}

// Check input length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
    return false;
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
    return false;
  } else {
    showSuccess(input);
    return true;
  }
}
// Get fieldname
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Event listeners
form.addEventListener("submit", function (e) {
  e.preventDefault();
  
  if (!checkLength(userName, 2, 15)) {
    return;
  }

  if (!telValidator(phone)) {
    return;
  }

  if (!checkEmail(email)) {
    return;
  }

  if (checkRequired([userName, phone])) {
    return;
  }

  // 입력 및 수정하기
  saveUser(isUpdateMode);
  
  closeModal();
  
});


function saveUser(isUpdate){
  if (isUpdate){
    updateUser(getCurrentUser(isUpdate));
  }else{
    createUser(getCurrentUser(isUpdate));
  }
}

function getCurrentUser(isUpdate){
  let newName = userName.value.trim();
  let newUserId = (isUpdate) ? userId.value.trim() : createUserId(newName);
  let newPhone = phone.value.trim();
  let newEmail = email.value.trim();
  let newAddress = address.value.trim();
  let newIsFavorite = (isUpdate) ? isFavorite.value.trim() : false;
  return new User(newUserId, newName, newPhone, newEmail, newAddress, newIsFavorite);
}


function clearInputDatas(inputArr){
  inputArr.forEach(function (input) {
    const formControl = input.parentElement;
    formControl.className = "form-control";
    input.value = "";
  });

  displaySubmitButton("저장");
}

noBtn.onclick = function(){
  closeModal();
}
yesBtn.onclick = function(){
  deleteUser("베르_123");
  closeModal();
  console.log(users);

}

// 이미지??




