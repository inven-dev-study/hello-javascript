"use strict";

const PERSON_ID = "id";
const PERSON_NAME = "name";
const PERSON_PHONE = "phone";
const PERSON_ADDRESS = "address";
const PERSON_EMAIL = "email";
const PERSON_FAVORITE = "favorite";

const form = document.getElementById("form");
let addModal = document.getElementById("addModal");
let deleteModal = document.getElementById("deleteModal");
const searchBox = document.getElementById("searchBox");
const personList = document.getElementById("personListWrapper");

// 수정 여부
let isUpdateMode = false;
let contactData = {
  베르_123: {
    [PERSON_NAME]: "베르",
    [PERSON_PHONE]: "01012345678",
    [PERSON_ADDRESS]: "서울",
    [PERSON_EMAIL]: "ber@inven.co.kr",
    [PERSON_FAVORITE]: false,
  },
  배추_123: {
    [PERSON_NAME]: "배추",
    [PERSON_PHONE]: "01012345678",
    [PERSON_ADDRESS]: "서울",
    [PERSON_EMAIL]: "ber@inven.co.kr",
    [PERSON_FAVORITE]: false,
  },
  가나_123: {
    [PERSON_NAME]: "가나",
    [PERSON_PHONE]: "01012345678",
    [PERSON_ADDRESS]: "서울",
    [PERSON_EMAIL]: "ber@inven.co.kr",
    [PERSON_FAVORITE]: false,
  },
  러시아_123: {
    [PERSON_NAME]: "러시아",
    [PERSON_PHONE]: "01012345678",
    [PERSON_ADDRESS]: "서울",
    [PERSON_EMAIL]: "ber@inven.co.kr",
    [PERSON_FAVORITE]: false,
  },
  브라질_12234: {
    [PERSON_NAME]: "브라질",
    [PERSON_PHONE]: "01012345678",
    [PERSON_ADDRESS]: "서울",
    [PERSON_EMAIL]: "muey@inven.co.kr",
    [PERSON_FAVORITE]: false,
  },
  미국_123: {
    [PERSON_NAME]: "미국",
    [PERSON_PHONE]: "01012345678",
    [PERSON_ADDRESS]: "서울",
    [PERSON_EMAIL]: "muey@inven.co.kr",
    [PERSON_FAVORITE]: false,
  },
  마이_12234: {
    [PERSON_NAME]: "마이",
    [PERSON_PHONE]: "01012345678",
    [PERSON_ADDRESS]: "서울",
    [PERSON_EMAIL]: "muey@inven.co.kr",
    [PERSON_FAVORITE]: false,
  },
  뮤이_123: {
    [PERSON_NAME]: "뮤이",
    [PERSON_PHONE]: "01012345678",
    [PERSON_ADDRESS]: "서울",
    [PERSON_EMAIL]: "muey@inven.co.kr",
    [PERSON_FAVORITE]: false,
  },
  중국_12234: {
    [PERSON_NAME]: "중국",
    [PERSON_PHONE]: "01012345678",
    [PERSON_ADDRESS]: "서울",
    [PERSON_EMAIL]: "muey@inven.co.kr",
    [PERSON_FAVORITE]: false,
  },
  파나마_123: {
    [PERSON_NAME]: "파나마",
    [PERSON_PHONE]: "01012345678",
    [PERSON_ADDRESS]: "서울",
    [PERSON_EMAIL]: "muey@inven.co.kr",
    [PERSON_FAVORITE]: false,
  },
  인도_12234: {
    [PERSON_NAME]: "인도",
    [PERSON_PHONE]: "01012345678",
    [PERSON_ADDRESS]: "서울",
    [PERSON_EMAIL]: "muey@inven.co.kr",
    [PERSON_FAVORITE]: false,
  },
  테스트_123: {
    [PERSON_NAME]: "테스트",
    [PERSON_PHONE]: "01012345678",
    [PERSON_ADDRESS]: "서울",
    [PERSON_EMAIL]: "muey@inven.co.kr",
    [PERSON_FAVORITE]: false,
  },
  ABA_123: {
    [PERSON_NAME]: "ABA",
    [PERSON_PHONE]: "01012345678",
    [PERSON_ADDRESS]: "서울",
    [PERSON_EMAIL]: "ber@inven.co.kr",
    [PERSON_FAVORITE]: false,
  },
  chars_123: {
    [PERSON_NAME]: "chars",
    [PERSON_PHONE]: "01012345678",
    [PERSON_ADDRESS]: "서울",
    [PERSON_EMAIL]: "ber@inven.co.kr",
    [PERSON_FAVORITE]: false,
  },
  Detail_123: {
    [PERSON_NAME]: "Detail",
    [PERSON_PHONE]: "01012345678",
    [PERSON_ADDRESS]: "서울",
    [PERSON_EMAIL]: "ber@inven.co.kr",
    [PERSON_FAVORITE]: false,
  },
  hello_123: {
    [PERSON_NAME]: "hello",
    [PERSON_PHONE]: "01012345678",
    [PERSON_ADDRESS]: "서울",
    [PERSON_EMAIL]: "ber@inven.co.kr",
    [PERSON_FAVORITE]: false,
  },
  world_12234: {
    [PERSON_NAME]: "world",
    [PERSON_PHONE]: "01012345678",
    [PERSON_ADDRESS]: "서울",
    [PERSON_EMAIL]: "muey@inven.co.kr",
    [PERSON_FAVORITE]: false,
  },
  github_123: {
    [PERSON_NAME]: "github",
    [PERSON_PHONE]: "01012345678",
    [PERSON_ADDRESS]: "서울",
    [PERSON_EMAIL]: "muey@inven.co.kr",
    [PERSON_FAVORITE]: false,
  },
  Inven_12234: {
    [PERSON_NAME]: "Inven",
    [PERSON_PHONE]: "01012345678",
    [PERSON_ADDRESS]: "서울",
    [PERSON_EMAIL]: "muey@inven.co.kr",
    [PERSON_FAVORITE]: false,
  },
  Start_123: {
    [PERSON_NAME]: "Start",
    [PERSON_PHONE]: "01012345678",
    [PERSON_ADDRESS]: "서울",
    [PERSON_EMAIL]: "muey@inven.co.kr",
    [PERSON_FAVORITE]: false,
  },
  javascript_12234: {
    [PERSON_NAME]: "javascript",
    [PERSON_PHONE]: "01012345678",
    [PERSON_ADDRESS]: "서울",
    [PERSON_EMAIL]: "muey@inven.co.kr",
    [PERSON_FAVORITE]: false,
  },
  강동구_123: {
    [PERSON_NAME]: "강동구",
    [PERSON_PHONE]: "01012345678",
    [PERSON_ADDRESS]: "서울",
    [PERSON_EMAIL]: "muey@inven.co.kr",
    [PERSON_FAVORITE]: false,
  },
  유튜브_12234: {
    [PERSON_NAME]: "유뷰브",
    [PERSON_PHONE]: "01012345678",
    [PERSON_ADDRESS]: "서울",
    [PERSON_EMAIL]: "muey@inven.co.kr",
    [PERSON_FAVORITE]: false,
  },
  아이폰_123: {
    [PERSON_NAME]: "아이폰",
    [PERSON_PHONE]: "01012345678",
    [PERSON_ADDRESS]: "서울",
    [PERSON_EMAIL]: "muey@inven.co.kr",
    [PERSON_FAVORITE]: false,
  },
  꼬비_12234: {
    [PERSON_NAME]: "꼬비",
    [PERSON_PHONE]: "01012345678",
    [PERSON_ADDRESS]: "서울",
    [PERSON_EMAIL]: "muey@inven.co.kr",
    [PERSON_FAVORITE]: false,
  },
  쌍쌍바_123: {
    [PERSON_NAME]: "쌍쌍바",
    [PERSON_PHONE]: "01012345678",
    [PERSON_ADDRESS]: "서울",
    [PERSON_EMAIL]: "muey@inven.co.kr",
    [PERSON_FAVORITE]: false,
  },
  떠블_123: {
    [PERSON_NAME]: "떠블",
    [PERSON_PHONE]: "01012345678",
    [PERSON_ADDRESS]: "서울",
    [PERSON_EMAIL]: "muey@inven.co.kr",
    [PERSON_FAVORITE]: false,
  },
  뽀빠이_123: {
    [PERSON_NAME]: "뽀빠이",
    [PERSON_PHONE]: "01012345678",
    [PERSON_ADDRESS]: "서울",
    [PERSON_EMAIL]: "muey@inven.co.kr",
    [PERSON_FAVORITE]: false,
  },
};

window.onload = function () {
  let closeBtns = document.getElementsByClassName("close");
  for (let btn of closeBtns) {
    btn.onclick = function () {
      closeModal();
    };
  }
  loadData();
};

addBtn.onclick = function () {
  isUpdateMode = false;
  addModal.style.display = "block";
};

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let personName = document.getElementById("personName");
  if (!checkLength(personName, 2, 15)) {
    return;
  }
  let personPhone = document.getElementById("personPhone");
  if (!telValidator(personPhone)) {
    return;
  }
  let personEmail = document.getElementById("personEmail");
  if (!checkEmail(personEmail)) {
    return;
  }

  if (checkRequired([personName, personPhone])) {
    return;
  }

  // 입력 및 수정하기
  savePerson(isUpdateMode);

  closeModal();
});

function displaySubmitButton(text) {
  let saveBtn = document.querySelector("[type=submit]");
  saveBtn.innerText = text;
}

function displayPerson(person) {
  let personId = document.getElementById("personId");
  let personName = document.getElementById("personName");
  let personEmail = document.getElementById("personEmail");
  let personPhone = document.getElementById("personPhone");
  let personAddress = document.getElementById("personAddress");
  let personFavorite = document.getElementById("personFavorite");

  personId.value = person[PERSON_ID];
  personName.value = person[PERSON_NAME];
  personPhone.value = person[PERSON_PHONE];
  personEmail.value = person[PERSON_EMAIL];
  personAddress.value = person[PERSON_ADDRESS];
  personFavorite.value = person[PERSON_FAVORITE];
  displaySubmitButton("수정");
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == addModal || event.target == deleteModal) {
    closeModal();
  }
};

function closeModal() {
  addModal.style.display = "none";
  deleteModal.style.display = "none";
  isUpdateMode = false;
  let personId = document.getElementById("personId");
  let personName = document.getElementById("personName");
  let personEmail = document.getElementById("personEmail");
  let personPhone = document.getElementById("personPhone");
  let personAddress = document.getElementById("personAddress");
  let personFavorite = document.getElementById("personFavorite");
  clearInputDatas([
    personId,
    personName,
    personEmail,
    personPhone,
    personAddress,
    personFavorite,
  ]);
}

function Person(id, name, phone, email, address, favorite) {
  this.id = id;
  this.name = name;
  this.phone = phone;
  this.address = address;
  this.email = email;
  this.favorite = favorite;
  return this;
}

/**
 * 객체의 프로퍼티 키값이 될 아이디(이름_생성날짜시간) 생성
 * 이름순으로 정렬하기 위해 아이디에 이름을 사용
 * @returns 생성날짜시간
 */
function createId(name) {
  let time = Date.now();
  return `${name}_${time}`;
}

function loadData() {
  let orderObj = orderObject(contactData);
  let groupObj = createGroupObject(orderObj);

  showGroupList(groupObj);
}
/**
 * 객체에 아이디(이름_생성날짜시간)를 생성하여 프로퍼티 추가
 * @param {Person} user
 */
function createPerson(person) {
  contactData[person[PERSON_ID]] = {
    [PERSON_NAME]: person[PERSON_NAME],
    [PERSON_PHONE]: person[PERSON_PHONE],
    [PERSON_ADDRESS]: person[PERSON_ADDRESS],
    [PERSON_EMAIL]: person[PERSON_EMAIL],
    [PERSON_FAVORITE]: person[PERSON_FAVORITE],
  };

  loadData();
}
/**
 * 객체에서 해당 아이디의 프로퍼티 수정
 * @param {Person} person
 */
function updatePerson(person) {
  contactData[person[PERSON_ID]] = {
    [PERSON_NAME]: person[PERSON_NAME],
    [PERSON_PHONE]: person[PERSON_PHONE],
    [PERSON_ADDRESS]: person[PERSON_ADDRESS],
    [PERSON_EMAIL]: person[PERSON_EMAIL],
    [PERSON_FAVORITE]: person[PERSON_FAVORITE],
  };
  loadData();
}

//
/**
 * 객체에서 해당 Person 프로퍼티 정보 가져오기
 * @param {아이디} id
 * @returns Person 프로퍼티
 */
function getPerson(id) {
  let person = contactData[id];
  return new Person(
    id,
    person[PERSON_NAME],
    person[PERSON_PHONE],
    person[PERSON_EMAIL],
    person[PERSON_ADDRESS],
    person[PERSON_FAVORITE]
  );
}

/**
 * 객체에서 해당 아이디의 프로퍼티 삭제
 * @param {아이디} id
 * @returns
 */
function deletePerson(id) {
  delete contactData[id];
  loadData();
}

// /**
//  * 객체에서 해당 아이디의 프로퍼티내 즐겨찾기 여부 수정
//  * @param {아이디} id
//  * @param {즐겨찾기 여부} favorite
//  * @returns
//  */
function updateFavorite(id, favorite) {
  contactData[id].favorite = favorite;
  loadData();
}

function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "formControl error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

// Show success outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "formControl success";
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

function savePerson(isUpdate) {
  let person = getCurrentPerson(isUpdate);

  if (isUpdate) {
    updatePerson(person);
  } else {
    createPerson(person);
  }
}

function getCurrentPerson(isUpdate) {
  let newName = personName.value.trim();
  let newPersonId = isUpdate ? personId.value.trim() : createId(newName);
  let newPhone = personPhone.value.trim();
  let newEmail = personEmail.value.trim();
  let newAddress = personAddress.value.trim();
  let newFavorite = isUpdate ? personFavorite.value.trim() : false;
  return new Person(
    newPersonId,
    newName,
    newPhone,
    newEmail,
    newAddress,
    newFavorite
  );
}

/**
 * 입력할 input tag를 초기화
 * @param {입력 input tag 배열} inputArr
 */
function clearInputDatas(inputArr) {
  inputArr.forEach(function (input) {
    const formControl = input.parentElement;
    formControl.className = "formControl";
    input.value = "";
  });

  displaySubmitButton("저장");
}

/**
 * 검색 입력창 키워드에 대한 연락처 목록 보여주기
 * @param {이벤트} e
 */
function displayContactData(e) {
  let searchString = searchBox.value;
  if (searchString === "") {
    displayAllList();
  } else {
    displaySearchContact(searchString);
  }
}
// 검색창 이벤트 추가
searchBox.addEventListener("keyup", displayContactData);
// 연락처 목록 전부 보여주기
function displayAllList() {
  let orderObj = orderObject(contactData);
  let groupObj = createGroupObject(orderObj);
  showGroupList(groupObj);
}
/**
 * 검색 키워드에 대한 연락처 목록 보여주기
 * @param {검색 키워드} searchString
 */
function displaySearchContact(searchString) {
  let htmlString = "";
  personList.innerHTML = htmlString;

  for (let personId in contactData) {
    let person = contactData[personId];
    let name = person[PERSON_NAME].toUpperCase();
    let isContains = name.includes(searchString.toUpperCase());
    if (isContains) {
      htmlString += createHTMLstring(person, personId);
    }
  }

  personList.innerHTML = htmlString;
  setActionButtonsEventListner();
}

/**
 * 연락처 정보를 받아서 html string 을 생성하여 반환
 * @param {연락처정보} person
 * @returns
 */
function createHTMLstring(person, id) {
  return `
    <div class= "personInfo">
    <div id ="infoToggle" class="name" >
      
      <span id="name">${person[PERSON_NAME]}</span> 
    </div>
  
    <div class="detailInfo" style = "display:none";>
      <div class="title">
        <img src="icon/phone.svg" alt="phone"> <span> : ${person[PERSON_PHONE]} </span>
      </div>
      <div class="title">
        <img src="icon/email.svg" alt="email"> <span> : ${person[PERSON_EMAIL]} </span>
      </div>
      <div class="title">
        <img src="icon/address.svg" alt="address"> <span> : ${person[PERSON_ADDRESS]} </span>

      </div>
  
      <div class="actionButtons" id="icons">
        <button class="favoriteBtn" data-person-id="${id}" data-favorite="${person[PERSON_FAVORITE]}">
          즐겨찾기
        </button>
    
        <button class="editBtn" data-person-id="${id}">
          편집
        </button>
        <button class="deleteBtn" data-person-id="${id}">
          삭제
        </button>
      </div>
  
    </div>
    </div>
    `;
}

// 검색 목록 필터 추가 함수 끝
/**
 * 해당 문자의 초성 가져오기
 * @param {문자} str
 * @returns
 */
function getChosung(str) {
  let cho = [
    "ㄱ",
    "ㄲ",
    "ㄴ",
    "ㄷ",
    "ㄸ",
    "ㄹ",
    "ㅁ",
    "ㅂ",
    "ㅃ",
    "ㅅ",
    "ㅆ",
    "ㅇ",
    "ㅈ",
    "ㅉ",
    "ㅊ",
    "ㅋ",
    "ㅌ",
    "ㅍ",
    "ㅎ",
  ];
  let uniVal = str.charCodeAt(0);

  let code = uniVal - 44032;

  // 한글 여부 확인
  if (code > -1 && code < 11172) {
    return cho[Math.floor(code / 588)];
  } else {
    return str.charAt(0).toUpperCase();
  }
}

/**
 * 객체의 데이터를 초성으로 그룹화하여 배열에 담기
 * @param {Person 객체} items
 */
function createGroupObject(items) {
  let groupObject = {};

  for (let personId in items) {
    let person = items[personId];
    let name = person[PERSON_NAME];

    let chosung = getChosung(name);
    let chosungKey = getGroupChosungKey(chosung);
    let isNotEmpty = chosungKey in groupObject;

    if (isNotEmpty) {
      let subGroup = groupObject[chosungKey];
      let subItem = {
        [PERSON_NAME]: person[PERSON_NAME],
        [PERSON_PHONE]: person[PERSON_PHONE],
        [PERSON_ADDRESS]: person[PERSON_ADDRESS],
        [PERSON_EMAIL]: person[PERSON_EMAIL],
        [PERSON_FAVORITE]: person[PERSON_FAVORITE],
      };
      subGroup[personId] = subItem;
    } else {
      let groupItem = {
        [personId]: {
          [PERSON_NAME]: person[PERSON_NAME],
          [PERSON_PHONE]: person[PERSON_PHONE],
          [PERSON_ADDRESS]: person[PERSON_ADDRESS],
          [PERSON_EMAIL]: person[PERSON_EMAIL],
          [PERSON_FAVORITE]: person[PERSON_FAVORITE],
        },
      };
      groupObject[chosungKey] = groupItem;
    }
  }
  return groupObject;
}

/**
 * 초성으로 그룹화 하기 위한 초성 문자 반환
 * @param {초성} chosung
 * @returns
 */
function getGroupChosungKey(chosung) {
  let chosungKey = chosung;
  switch (chosung) {
    case "ㅅ":
    case "ㅆ":
      chosungKey = "ㅅ";
      break;
    case "ㄱ":
    case "ㄲ":
      chosungKey = "ㄱ";
      break;
    case "ㄷ":
    case "ㄸ":
      chosungKey = "ㄷ";
      break;
    case "ㅈ":
    case "ㅉ":
      chosungKey = "ㅈ";
      break;
    case "ㅂ":
    case "ㅃ":
      chosungKey = "ㅂ";
      break;
    default:
      chosungKey = chosung;
  }
  return chosungKey;
}

/**
 * 객체 정렬하여 정렬된 객체로 반환
 * @param {정렬안된 객체} unordered
 * @returns
 */
function orderObject(unordered) {
  let orderArr = Object.keys(unordered);
  itemsSort(orderArr);
  return orderArr
    .reduce((obj, key) => {
      obj[key] = unordered[key];
      return obj;
    }, {});
}
/**
 * 배열을 정렬
 * @param {배열} items 
 */
function itemsSort(items){
  items.sort(function(a,b) {
    let nameA = a.toUpperCase();
    let nameB = b.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB){
      return 1;
    }

    return 0;
  });
}
/**
 * 연락처 목록을 그룹화한 객체를 목록으로 html 형식 변환
 * @param {연락처 목록} items
 */
function showGroupList(items) {
  let htmlString = "";
  personList.innerHTML = htmlString;

  for (let chosungKey in items) {
    let group = items[chosungKey];
    if (group === undefined) {
    } else {
      htmlString += createChosungHTMLstring(chosungKey);
      for (let personId in group) {
        let person = group[personId];

        htmlString += createHTMLstring(person, personId);
      }
    }
  }
  personList.innerHTML = htmlString;
  setActionButtonsEventListner();
}
/**
 * 상세정보란에 액션 버튼 이벤트 리스너 등록
 */
function setActionButtonsEventListner() {
  let favoriteElements = document.getElementsByClassName("favoriteBtn");
  let editElements = document.getElementsByClassName("editBtn");
  let deleteElements = document.getElementsByClassName("deleteBtn");

  let personInfoElements = document.getElementsByClassName("personInfo");
  for (let item of personInfoElements) {
    item.addEventListener("click", clickPersonInfoToggle, false);
  }
  for (let item of favoriteElements) {
    item.addEventListener("click", clickFavoriteButton, false);
  }
  for (let item of editElements) {
    item.addEventListener("click", clickEditButton, false);
  }

  for (let item of deleteElements) {
    item.addEventListener("click", clickDeleteButton, false);
  }
}

/**
 * 초성 HTML 반환
 * @param {초성} chosungKey
 * @returns
 */
function createChosungHTMLstring(chosungKey) {
  return `
  <div class= "chosungElement">
  <span id="chosungKey">${chosungKey}</span>
  </div>
  `;
}
/**
 * 연락처 상세정보에서 즐겨찾기버튼 클릭시
 * @param {이벤트} e
 * @returns
 */
function clickFavoriteButton(e) {
  const dataset = e.target.dataset;
  let personId = dataset.personId;
  isUpdateMode = false;
  updateFavorite(personId, true);
}

/**
 * 연락처 상세정보에서 편집버튼 클릭시
 * @param {이벤트} e
 * @returns
 */
function clickEditButton(e) {
  const dataset = e.target.dataset;
  let personId = dataset.personId;
  let person = getPerson(personId);
  if (person === undefined) {
    return;
  }
  isUpdateMode = true;
  addModal.style.display = "block";
  displayPerson(person);
}

/**
 * 연락처 상세정보에서 삭제 버튼 클릭시
 * @param {이벤트} e
 */
function clickDeleteButton(e) {
  const dataset = e.target.dataset;
  let personId = dataset.personId;

  isUpdateMode = false;
  deleteModal.style.display = "block";
  let person = getPerson(personId);
  let personName = person[PERSON_NAME];
  let message = document.getElementById("deleteMessage");
  message.innerHTML = `<span>${personName} 연락처를 삭제하시겠습니까?</span>`;
  let deleteBtn = document.getElementById("deleteBtn");
  deleteBtn.setAttribute("data-person-id", personId);
  deleteBtn.setAttribute("data-person-name", personName);
  deleteBtn.addEventListener("click", clickDeleteYesButton, false);
}

/**
 * 삭제버튼 Yes 클릭시
 * @param {이벤트} e
 */
function clickDeleteYesButton(e) {
  const dataset = e.target.dataset;
  let personId = dataset.personId;
  isUpdateMode = false;

  deletePerson(personId);
  closeModal();
}

/**
 * 이름클릭시 상세정보 토글
 * @param {이벤트} e
 */
function clickPersonInfoToggle(e) {
  let detailInfo = this.querySelector(".detailInfo");
  if (detailInfo.style.display === "none") {
    detailInfo.style.display = "block";
  } else {
    detailInfo.style.display = "none";
  }
}
