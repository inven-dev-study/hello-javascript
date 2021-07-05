'use strict';
const ID_NAME = "id";
const TITLE_NAME = "title";
const D_DAY_DATE_NAME = "dDayDate";
const ICON_CLASS_NAME = "iconClassName";
const BG_IMAGE_NAME = "bgImageName";

let modalDDayTitleElement = document.getElementById('modalDDayTitle');
let modalDDayBGImageElement = document.getElementById('modalDDayBgImage');
let modalDDayIconElement = document.getElementById('modalDDayIcon');
let modalDDayDateElement = document.getElementById('modalDDayDate');

let addModal = document.getElementById("addModal");
let deleteBtn = document.getElementById('deleteBtn');
let closeModalBtn = document.getElementById('closeModalBtn');
let modalTitle = document.querySelector('.modalTitle');
let saveBtn = document.querySelector('.saveBtn');


let isUpdate = false;

// 배경 이미지 파일명
let bgImageNames = [
"airplane.png", 
"black_friday.webp", 
"makarong.jpeg", 
"seoul.jpeg", 
"walter.jpeg", 
"sky.jpeg", 
"tour.jpeg",
"anvandegi.jpeg",
"dekapo.jpeg",
"overwatch.jpeg",
"genesisx.jpeg",
"minion.jpeg",
];
// 아이콘 이미지 클래스명
let iconImageClassNames = [
"fas fa-cloud-moon",
"fab fa-android",
"fas fa-bomb",
"fas fa-baseball-ball",
"fas fa-coffee",
"fas fa-cat",
"fas fa-bolt",
"fab fa-apple",
"fas fa-box",
"fas fa-car",
"fas fa-couch",
"fas fa-church",
"fas fa-cheese",
"fas fa-check-square",
"fas fa-carrot",
"fas fa-candy-cane",
"fas fa-brush",
"fas fa-book",
"fas fa-bath",
"fas fa-bowling-ball",
];

/**
 * D-Day 객체
 *{ 타이틀, 날짜, 아이콘 클래스명, 배경 이미지 파일명}
 */

let dDayArr = [
  {[ID_NAME]: "000", [TITLE_NAME]: "제네시스", [D_DAY_DATE_NAME]: "2025-01-01", [ICON_CLASS_NAME]: iconImageClassNames[5], [BG_IMAGE_NAME]: "genesisx.jpeg"},
  {[ID_NAME]: "111", [TITLE_NAME]: "베르 생일", [D_DAY_DATE_NAME]: "1980-12-27", [ICON_CLASS_NAME]: iconImageClassNames[0], [BG_IMAGE_NAME]: "minion.jpeg"},
  {[ID_NAME]: "222", [TITLE_NAME]: "입사일", [D_DAY_DATE_NAME]: "2014-04-28", [ICON_CLASS_NAME]: iconImageClassNames[1], [BG_IMAGE_NAME]: "overwatch.jpeg"},
  {[ID_NAME]: "333", [TITLE_NAME]: "오늘날짜", [D_DAY_DATE_NAME]: "2021-07-02", [ICON_CLASS_NAME]: iconImageClassNames[2], [BG_IMAGE_NAME]: "sky.jpeg"},
  {[ID_NAME]: "444", [TITLE_NAME]: "여름 휴가", [D_DAY_DATE_NAME]: "2021-08-15", [ICON_CLASS_NAME]: iconImageClassNames[3], [BG_IMAGE_NAME]: "tour.jpeg"},
  {[ID_NAME]: "555", [TITLE_NAME]: "맥북프로 사는날", [D_DAY_DATE_NAME]: "2021-12-25", [ICON_CLASS_NAME]: iconImageClassNames[4], [BG_IMAGE_NAME]: "black_friday.webp"},
  {[ID_NAME]: "666", [TITLE_NAME]: "군대 제대한 날", [D_DAY_DATE_NAME]: "2002-10-28", [ICON_CLASS_NAME]: iconImageClassNames[5], [BG_IMAGE_NAME]: "airplane.png"},
  {[ID_NAME]: "777", [TITLE_NAME]: "베르 퇴사하는 날", [D_DAY_DATE_NAME]: "2050-12-31", [ICON_CLASS_NAME]: iconImageClassNames[6], [BG_IMAGE_NAME]: "walter.jpeg"},

];

/**
 * 초기 배열 리스트 보여주기
 */
function displayList(){
  let ulElement = document.querySelector(".items");
  for (let i=0; i < dDayArr.length; i++){
    let item = dDayArr[i];
    let liElement = createDomListItem(item);
    ulElement.appendChild(liElement);
  }
}

/**
 * index에 해당하는 요일 반환
 * @param {요일에 해당하는 index} date 
 * @returns 
 */
function getWeekDay(date) {
  let days = ['일', '월', '화', '수', '목', '금', '토'];
  return days[date.getDay()];
}

/**
 * 두자리 숫자형 문자열 반환
 * @param {숫자} n 
 * @returns 
 */
function getNumberFormat(number){
  return (number >= 10) ? number : "0" + number;
}

/**
 * YYYY-MM-DD (요일) 형식의 날짜 문자열 반환
 * @param {2021-01-01 형식의 날짜 문자열} dDayDate 
 * @returns 
 */
function getDDayDate(dDayDate){
  let newDate = new Date(dDayDate);
  let year = newDate.getFullYear();
  let month = getNumberFormat(newDate.getMonth() + 1);
  let day = getNumberFormat(newDate.getDate());
  let weekDay = getWeekDay(newDate);

  return `${year}-${month}-${day} (${weekDay})`;
}

/**
 * 두 날짜의 차이 일수를 정수로 반환
 * @param {시작일자} startDate 
 * @param {끝일자} endDate 
 * @returns 
 */
function getDiffDay(startDate, endDate){
  let diff = endDate.getTime() - startDate.getTime();
  return Math.ceil(diff / (1000*60*60*24));
}

/**
 * 두 날짜의 차이 일수를 문자열로 반환
 * @param {시작일자} startDate 
 * @param {끝일자} endDate 
 * @returns 
 */
function getStrDiffDay(startDate, endDate){
  let diffDay = getDiffDay(startDate, endDate);
  if (diffDay == 0) {
    diffDay = `D-Day`;
  }else if(diffDay > 0){
    diffDay = `D+${diffDay}`;
  }else{
    diffDay = `D${diffDay}`;
  }
  return diffDay;
}

/**
 * 아이콘 선택 클래스명 변경
 * @param {이벤트} e 
 */
function chooseIconClassName(e){
  let t = e.target;
  let className = t.className;
  let iconPopupLayout = document.querySelector('.iconPopupLayout');
  let gridLayout = document.querySelector('.iconGridLayout');
  iconPopupLayout.style.display = 'none';
  gridLayout.remove();
  modalDDayIconElement.className = className
  
}
/**
 * 아이콘 Grid Layout 에 들어갈 item Dom 생성
 * @param {아이콘 클래스명 문자열} iconClassName 
 * @returns 
 */
function createDomGridItem(iconClassName){
  let parentElement = document.createElement('div');
  let iconElement = document.createElement("i");
  iconElement.className = iconClassName;
  parentElement.appendChild(iconElement);
  iconElement.addEventListener('click', chooseIconClassName);
  return parentElement;
}

/**
 * 배경 Grid Layout 에 들어갈 item Dom 생성
 * @param {배경 이미지명 문자열} iconClassName 
 * @returns 
 */
function createDomGridImageItem(imageName){
  let parentElement = document.createElement('div');
  parentElement.style = `background-image: url('./img/${imageName}');`
  parentElement.className = 'item';
  parentElement.dataset.imageName = imageName;
  parentElement.addEventListener('click', chooseBGImageName);
  return parentElement;
}



/**
 * 디데이 목록을 구성하는 아이템 Dom 생성
 * @param {디데이 아이템} item 
 * @returns 
 */
function createDomListItem(item){
  let id = item[ID_NAME];
  let title = item[TITLE_NAME];
  let setDate = item[D_DAY_DATE_NAME];
  let iconClassName = item[ICON_CLASS_NAME];
  let bgImageName = item[BG_IMAGE_NAME];
  let nowDate = new Date();
  nowDate.setHours(0,0,0,0);
  
  let dDayDate = new Date(setDate);
  dDayDate.setHours(0,0,0,0);

  let diffDay = getStrDiffDay(dDayDate, nowDate);
  let parentElement = document.createElement("li");
  parentElement.className = `item ${id}`;
  parentElement.dataset.dDayId = id;
  parentElement.id = `dDayId${id}`
  parentElement.style = `background-image: url('./img/${bgImageName}');`
  parentElement.addEventListener('click', showUpdateModal);

  let iconElement = document.createElement("i");
  iconElement.className = iconClassName;
  iconElement.dataset.dDayId = id;
  
  let infoElement = document.createElement("div");
  infoElement.className = "info";
  infoElement.dataset.dDayId = id;

  let itemTitleElement = createSpanElement("itemTitle", title);
  let itemDateElement = createSpanElement("itemDate", getDDayDate(setDate));
  let itemDDayElement = createSpanElement("itemDDay", `${diffDay}`);
  itemTitleElement.dataset.dDayId = id;
  itemDateElement.dataset.dDayId = id;
  itemDDayElement.dataset.dDayId = id;

  infoElement.appendChild(itemTitleElement);
  infoElement.appendChild(itemDateElement);
  
  parentElement.appendChild(iconElement);
  parentElement.appendChild(infoElement);
  parentElement.appendChild(itemDDayElement);
  return parentElement;
}

/**
 * 디데이 목록 item에 들어갈 span dom 생성
 * @param {클래스명} className 
 * @param {내용} textContent 
 * @returns 
 */
function createSpanElement(className, textContent){
  let spanElement = document.createElement("span");
  spanElement.className = className;
  spanElement.textContent = textContent;
  return spanElement;
}


 function DDay(id, title, dDayDate, iconClassName, bgImageName){
   return {
     id, title, dDayDate, iconClassName, bgImageName
   }
 };

 /**
  * 해당하는 디데이 배열에서 삭제
  * @param {디데이 id} dDayId 
  * @returns 
  */
 function deleteDDay(dDayId){
   // 배열에서 id로 객체를 검색해서 해당 배열 index 반환
   let itemIndex = findIndexFromDDayId(dDayId);
   if (itemIndex < 0) {
     return;
   }
   // 해당 배열 index의 요소 1개를 제거
   dDayArr.splice(itemIndex,1);
 }

 function findIndexFromDDayId(dDayId){
  return dDayArr.findIndex(item => item[ID_NAME] == dDayId);
 }

/**
 * 이벤트 등록
 */
 function setEventListner(){
  closeModalBtn.addEventListener('click', closeModal);
  addDDayBtn.addEventListener('click', clickAddModalButon);
  deleteBtn.addEventListener('click', clickDeleteBtn);
  modalDDayIconElement.addEventListener('click', showIconGridLayout);
  saveBtn.addEventListener('click', saveDDay);
  modalDDayBGImageElement.addEventListener('click', showBGImageGridLayout)
 }

 /**
  * 디데이 저장 및 수정
  * @param {이벤트} e 
  * @returns 
  */
 function saveDDay(e){
  if (!modalDDayTitleElement.checkValidity()){
    return;
  }
  let title = modalDDayTitleElement.value.trim();

  if (!modalDDayDateElement.checkValidity()) {
    return;
  }

  let dDayDate = modalDDayDateElement.value;
  let dataSet = e.target.dataset
  let dDayId = (isUpdate) ? dataSet.dDayId : new Date().getTime();
  let iconClassName = modalDDayIconElement.className;
  let bgImageName = modalDDayBGImageElement.dataset.imageName;

  let newDDay = new DDay(dDayId, title, dDayDate, iconClassName, bgImageName);
  let newElement = createDomListItem(newDDay);

  if(isUpdate){
    let updateItemIndex = findIndexFromDDayId(dDayId);
    if (updateItemIndex < 0) {
      return;
    }
    // 해당 배열 index의 요소 1개를 제거
    dDayArr.splice(updateItemIndex,1, newDDay);
    let updateElement = document.querySelector(`#dDayId${dDayId}`);
    var parentUl = updateElement.parentNode;
    parentUl.insertBefore(newElement, updateElement);
    updateElement.remove();

  }else{
    dDayArr.push(newDDay);
    let ulElement = document.querySelector(".items");
    ulElement.appendChild(newElement);
  }
  closeModal();
  
 }

/**
 * 디데이 수정 모달 보여주기
 * @param {이벤트} e 
 */
 function showUpdateModal(e){
  isUpdate = true;
  let dataSet = e.target.dataset;
  let dDayId = dataSet.dDayId;
  displayModal(true, dDayId);
 }

 /**
  * 디데이 추가 모달 보여주기
  * @param {이벤트} e 
  */
 function clickAddModalButon(e){
  isUpdate = false;
  displayModal(false, -1);
 }

 /**
  * 수정여부에 따른 모달창 보여주기
  * @param {수정여부} isUpdate 
  * @param {디데이 id} dDayId 
  */
function displayModal(isUpdate, dDayId){
  modalTitle.textContent = (isUpdate) ? "D-Day 수정" : "D-Day 추가";
  deleteBtn.style.display = (isUpdate) ?  "block" : "none";
  addModal.style.display = "block";

  let dDayTitle = "";
  let dDayDate = "";
  let dDayIconClassName = iconImageClassNames[0];
  let dDayBGImageName = bgImageNames[0];
  if(isUpdate){
    saveBtn.dataset.dDayId = dDayId;
    let dDayData = getCurrentDDay(dDayId);
    if (dDayData){
      dDayTitle = dDayData[TITLE_NAME];
      dDayDate = dDayData[D_DAY_DATE_NAME];  
      dDayIconClassName = dDayData[ICON_CLASS_NAME];
      dDayBGImageName = dDayData[BG_IMAGE_NAME];
    }
  }
  deleteBtn.dataset.dDayId = (isUpdate) ? dDayId : -1;
  modalDDayTitleElement.value = dDayTitle;
  modalDDayDateElement.value = dDayDate;
  modalDDayIconElement.className = dDayIconClassName;
  modalDDayBGImageElement.style = `background-image: url('./img/${dDayBGImageName}');`
  modalDDayBGImageElement.dataset.imageName = dDayBGImageName;
 
}

/**
 * 배열내에 디데이 id에 해당하는 첫번째 요소를 찾아서 반환(없으면 undefined)
 * @param {디데이 id} dDayId 
 * @returns 
 */
function getCurrentDDay(dDayId){
  return dDayArr.find(item => item[ID_NAME] == dDayId);
}
/**
 * 입력값 초기화
 */
function clearInputData(){
  modalDDayTitleElement.value = "";
  modalDDayDateElement.value = "";
  modalDDayBGImageElement.style = `background-image: url('./img/${bgImageNames[0]}');`
  modalDDayIconElement.className = iconImageClassNames[0];
  isUpdate = false;
}

/**
 * 입력 및 수정 모달창 닫기
 */
function closeModal(){
  addModal.style.display = "none";
  deleteBtn.style.display = "none";
  clearInputData();
}

/**
 * 삭제 버튼 클릭시 
 * @param {이벤트} e 
 */
function clickDeleteBtn(e){
  // 배열 삭제
  let dataSet = e.target.dataset;
  let dDayId = dataSet.dDayId;
  deleteDDay(dDayId);
  // li dom 삭제
  let deleteElement = document.querySelector(`#dDayId${dDayId}`);
  deleteElement.remove();
  closeModal();
}

/**
 * 아이콘 Grid layout 보여주기
 */
function showIconGridLayout(){
  let iconPopupLayout = document.querySelector('.iconPopupLayout');
  let gridLayout = document.createElement("div");
  gridLayout.className = "iconGridLayout";
  for(let iconClassName of iconImageClassNames){
    let gridItem = createDomGridItem(iconClassName);
    gridLayout.appendChild(gridItem);
  }

  iconPopupLayout.appendChild(gridLayout);
  iconPopupLayout.style.display = 'block';
}



/**
 * 배경 선택 이미지명 변경
 * @param {이벤트} e 
 */
 function chooseBGImageName(e){
  let t = e.target;
  let imageName = t.dataset.imageName;
  let iconPopupLayout = document.querySelector('.iconPopupLayout');
  let gridLayout = document.querySelector('.bgGridLayout');
  iconPopupLayout.style.display = 'none';
  gridLayout.remove();
  modalDDayBGImageElement.style = `background-image: url('./img/${imageName}');`
  modalDDayBGImageElement.dataset.imageName = imageName;
  
}

/**
 * 배경 Grid layout 보여주기
 */
function showBGImageGridLayout(){
  let iconPopupLayout = document.querySelector('.iconPopupLayout');
  let gridLayout = document.createElement("div");
  gridLayout.className = "bgGridLayout";
  for(let imageName of bgImageNames){
    let gridItem = createDomGridImageItem(imageName);
    gridLayout.appendChild(gridItem);
  }

  iconPopupLayout.appendChild(gridLayout);
  iconPopupLayout.style.display = 'block';
}





window.onclick = function (event) {
  if (event.target == addModal) {
    closeModal();
  }
};

 displayList();
 setEventListner();


 // 문제점
 // 자식노드 클릭됨, 부모만 클릭 되게 가능?
