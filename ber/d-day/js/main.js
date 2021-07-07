'use strict';
const ID_NAME = 'id';
const TITLE_NAME = 'title';
const D_DAY_DATE_NAME = 'dDayDate';
const STICKER_CLASS_NAME = 'stickerClassName';
const BG_IMAGE_NAME = 'bgImageName';
const IS_1DAY_SET_DATE = 'is1DaySetDate';

let modalDDayTitleElement = document.getElementById('modalDDayTitle');
let modalDDayBGImageElement = document.getElementById('modalDDayBgImage');
let modalDDayStickerElement = document.getElementById('modalDDaySticker');
let modalDDayDateElement = document.getElementById('modalDDayDate');
let modal1DaySetDateElement = document.getElementById('modal1DaySetDate');

let gridLayoutContainer = document.querySelector('.gridLayoutContainer');


let addModal = document.getElementById('addModal');
let deleteBtn = document.getElementById('deleteBtn');
let closeModalBtn = document.getElementById('closeModalBtn');
let modalTitle = document.querySelector('.modalTitle');
let saveBtn = document.querySelector('.saveBtn');

let isUpdate = false;

// 배경 이미지 파일명
let bgImageNames = [
  'airplane.png',
  'black_friday.webp',
  'makarong.jpeg',
  'seoul.jpeg',
  'walter.jpeg',
  'sky.jpeg',
  'tour.jpeg',
  'anvandegi.jpeg',
  'dekapo.jpeg',
  'overwatch.jpeg',
  'genesisx.jpeg',
  'minion.jpeg',
];
// 스티커 이미지 클래스명
let stickerImageClassNames = [
  'fas fa-cloud-moon',
  'fab fa-android',
  'fas fa-bomb',
  'fas fa-baseball-ball',
  'fas fa-coffee',
  'fas fa-cat',
  'fas fa-bolt',
  'fab fa-apple',
  'fas fa-box',
  'fas fa-car',
  'fas fa-couch',
  'fas fa-church',
  'fas fa-cheese',
  'fas fa-check-square',
  'fas fa-carrot',
  'fas fa-candy-cane',
  'fas fa-brush',
  'fas fa-book',
  'fas fa-bath',
  'fas fa-bowling-ball',
];

/**
 * D-Day 객체
 *{ 타이틀, 날짜, 스티커 클래스명, 배경 이미지 파일명}
 */

let dDayArr = [
  
  {
    [ID_NAME]: '111',
    [TITLE_NAME]: '베르 생일',
    [D_DAY_DATE_NAME]: '1980-12-27',
    [STICKER_CLASS_NAME]: stickerImageClassNames[0],
    [BG_IMAGE_NAME]: 'minion.jpeg',
    [IS_1DAY_SET_DATE]: false,
  },
  {
    [ID_NAME]: '222',
    [TITLE_NAME]: '입사일',
    [D_DAY_DATE_NAME]: '2014-04-28',
    [STICKER_CLASS_NAME]: stickerImageClassNames[1],
    [BG_IMAGE_NAME]: 'sky.jpeg',
    [IS_1DAY_SET_DATE]: false,
  },
  {
    [ID_NAME]: '33',
    [TITLE_NAME]: '이전날짜',
    [D_DAY_DATE_NAME]: '2021-07-07',
    [STICKER_CLASS_NAME]: stickerImageClassNames[2],
    [BG_IMAGE_NAME]: 'overwatch.jpeg',
    [IS_1DAY_SET_DATE]: true,
  },
  {
    [ID_NAME]: '333',
    [TITLE_NAME]: '오늘날짜',
    [D_DAY_DATE_NAME]: '2021-07-08',
    [STICKER_CLASS_NAME]: stickerImageClassNames[2],
    [BG_IMAGE_NAME]: 'airplane.png',
    [IS_1DAY_SET_DATE]: true,
  },

  {
    [ID_NAME]: '3333',
    [TITLE_NAME]: '내일날짜',
    [D_DAY_DATE_NAME]: '2021-07-09',
    [STICKER_CLASS_NAME]: stickerImageClassNames[2],
    [BG_IMAGE_NAME]: 'tour.jpeg',
    [IS_1DAY_SET_DATE]: true,
  },

  {
    [ID_NAME]: '444',
    [TITLE_NAME]: '맥북프로 사는날',
    [D_DAY_DATE_NAME]: '2021-12-25',
    [STICKER_CLASS_NAME]: stickerImageClassNames[4],
    [BG_IMAGE_NAME]: 'black_friday.webp',
    [IS_1DAY_SET_DATE]: false,
  },
  {
    [ID_NAME]: '555',
    [TITLE_NAME]: '여름 휴가',
    [D_DAY_DATE_NAME]: '2021-08-15',
    [STICKER_CLASS_NAME]: stickerImageClassNames[3],
    [BG_IMAGE_NAME]: 'anvandegi.jpeg',
    [IS_1DAY_SET_DATE]: true,
  },
  {
    [ID_NAME]: '666',
    [TITLE_NAME]: '군대 제대한 날',
    [D_DAY_DATE_NAME]: '2002-10-28',
    [STICKER_CLASS_NAME]: stickerImageClassNames[5],
    [BG_IMAGE_NAME]: 'sky.jpeg',
    [IS_1DAY_SET_DATE]: false,
  },
  {
    [ID_NAME]: '777',
    [TITLE_NAME]: '베르 퇴사하는 날',
    [D_DAY_DATE_NAME]: '2050-12-31',
    [STICKER_CLASS_NAME]: stickerImageClassNames[6],
    [BG_IMAGE_NAME]: 'walter.jpeg',
    [IS_1DAY_SET_DATE]: false,
  },
  {
    [ID_NAME]: '888',
    [TITLE_NAME]: '제네시스',
    [D_DAY_DATE_NAME]: '2025-01-01',
    [STICKER_CLASS_NAME]: stickerImageClassNames[5],
    [BG_IMAGE_NAME]: 'genesisx.jpeg',
    [IS_1DAY_SET_DATE]: false,
  },
];

/**
 * 초기 배열 리스트 보여주기
 */
function displayList() {
  let ulElement = document.querySelector('.items');
  for (let i = 0; i < dDayArr.length; i++) {
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
function getNumberFormat(number) {
  return number >= 10 ? number : '0' + number;
}

/**
 * YYYY-MM-DD (요일) 형식의 날짜 문자열 반환
 * @param {2021-01-01 형식의 날짜 문자열} dDayDate
 * @returns
 */
function getDDayDate(dDayDate) {
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
function getDiffDay(startDate, endDate) {
  let diff = endDate.getTime() - startDate.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

/**
 * 두 날짜의 차이 일수를 문자열로 반환(설정일로부터 1일 여부 적용)
 * @param {시작일자} startDate
 * @param {끝일자} endDate
 * @param {설정일로부터 1일 여부} is1DaySetDate
 * @returns
 */
function getStrDiffDay(startDate, endDate, is1DaySetDate) {
  let diffDay = getDiffDay(startDate, endDate);
  
  if (diffDay == 0) {
    diffDay = (is1DaySetDate) ? `D+1`: `D-Day`;
  } else if (diffDay > 0) {
    diffDay = (is1DaySetDate) ? `D+${diffDay+1}`: `D+${diffDay}`;
  } else {
    diffDay = `D${diffDay}`;
  }
  return diffDay;
}

/**
 * 스티커 선택 클래스명 변경
 * @param {이벤트} e
 */
function chooseStickerClassName(e) {
  let t = e.target;
  let className = t.className;
  let gridLayout = document.querySelector('.stickerGridLayout');
  gridLayoutContainer.style.display = 'none';
  gridLayout.remove();
  modalDDayStickerElement.className = className;
}
/**
 * 스티커 Grid Layout 에 들어갈 item Dom 생성
 * @param {스티커 클래스명 문자열} stickerClassName
 * @returns
 */
function createDomGridItem(stickerClassName) {
  let parentElement = document.createElement('div');
  let stickerElement = document.createElement('i');
  stickerElement.className = stickerClassName;
  parentElement.appendChild(stickerElement);
  stickerElement.addEventListener('click', chooseStickerClassName);
  return parentElement;
}

/**
 * 배경 Grid Layout 에 들어갈 item Dom 생성
 * @param {배경 이미지명 문자열} imageName
 * @returns
 */
function createDomGridImageItem(imageName) {
  let parentElement = document.createElement('div');
  parentElement.style = `background-image: url('./img/${imageName}');`;
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
function createDomListItem(item) {
  let id = item[ID_NAME];
  let title = item[TITLE_NAME];
  let setDate = item[D_DAY_DATE_NAME];
  let stickerClassName = item[STICKER_CLASS_NAME];
  let bgImageName = item[BG_IMAGE_NAME];
  let is1DaySetDate = item[IS_1DAY_SET_DATE];

  let nowDate = new Date();
  nowDate.setHours(0, 0, 0, 0);

  let dDayDate = new Date(setDate);
  dDayDate.setHours(0, 0, 0, 0);

  let diffDay = getStrDiffDay(dDayDate, nowDate, is1DaySetDate);
  let parentElement = document.createElement('li');
  parentElement.className = `item ${id}`;
  parentElement.dataset.dDayId = id;
  parentElement.id = `dDayId${id}`;
  parentElement.style = `background-image: url('./img/${bgImageName}');`;
  parentElement.addEventListener('click', showUpdateModal);

  let stickerElement = document.createElement('i');
  stickerElement.className = stickerClassName;
  stickerElement.dataset.dDayId = id;

  let infoElement = document.createElement('div');
  infoElement.className = 'info';
  infoElement.dataset.dDayId = id;

  let itemTitleElement = createSpanElement('itemTitle', title);
  let itemDateElement = createSpanElement('itemDate', getDDayDate(setDate));
  let itemDDayElement = createSpanElement('itemDDay', `${diffDay}`);
  itemTitleElement.dataset.dDayId = id;
  itemDateElement.dataset.dDayId = id;
  itemDDayElement.dataset.dDayId = id;

  infoElement.appendChild(itemTitleElement);
  infoElement.appendChild(itemDateElement);

  parentElement.appendChild(stickerElement);
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
function createSpanElement(className, textContent) {
  let spanElement = document.createElement('span');
  spanElement.className = className;
  spanElement.textContent = textContent;
  return spanElement;
}

function DDay(id, title, dDayDate, stickerClassName, bgImageName, is1DaySetDate) {
  return {
    id,
    title,
    dDayDate,
    stickerClassName,
    bgImageName,
    is1DaySetDate
  };
}

/**
 * 해당하는 디데이 배열에서 삭제
 * @param {디데이 id} dDayId
 * @returns
 */
function deleteDDay(dDayId) {
  // 배열에서 id로 객체를 검색해서 해당 배열 index 반환
  let itemIndex = findIndexFromDDayId(dDayId);
  if (itemIndex < 0) {
    return;
  }
  // 해당 배열 index의 요소 1개를 제거
  dDayArr.splice(itemIndex, 1);
}

/**
 * 배열에 아이디로 검색하여 해당 index 반환
 * @param {디데이 아이디} dDayId 
 * @returns 
 */
function findIndexFromDDayId(dDayId) {
  return dDayArr.findIndex((item) => item[ID_NAME] == dDayId);
}

/**
 * 이벤트 등록
 */
function setEventListner() {
  closeModalBtn.addEventListener('click', closeModal);
  addDDayBtn.addEventListener('click', clickAddModalButon);
  deleteBtn.addEventListener('click', clickDeleteBtn);
  modalDDayStickerElement.addEventListener('click', showStickerGridLayout);
  saveBtn.addEventListener('click', saveDDay);
  modalDDayBGImageElement.addEventListener('click', showBGImageGridLayout);
}

/**
 * 입력값 DDay 객체 반환
 * @param {디데이 아이디} id 
 * @returns 
 */
function getInputData(id){
  let title = modalDDayTitleElement.value.trim();
  let dDayDate = modalDDayDateElement.value;
  
  let dDayId = (isUpdate) ? id : new Date().getTime();
  let stickerClassName = modalDDayStickerElement.className;
  let bgImageName = modalDDayBGImageElement.dataset.imageName;
  let is1DaySetDate = modal1DaySetDateElement.checked;

  return new DDay(
    dDayId,
    title,
    dDayDate,
    stickerClassName,
    bgImageName,
    is1DaySetDate
  );
}
/**
 * 디데이 저장 및 수정
 * @param {이벤트} e
 * @returns
 */
function saveDDay(e) {
  if (!modalDDayTitleElement.checkValidity()) {
    return;
  }
  
  if (!modalDDayDateElement.checkValidity()) {
    return;
  }

  let dDayId = e.target.dataset.dDayId;
  let newDDay = getInputData(dDayId);
  let newElement = createDomListItem(newDDay);

  if (isUpdate) {
    updateDDay(dDayId, newDDay, newElement);
  } else {
    pushDDay(newDDay, newElement);
  }
  closeModal();
}

/**
 * dDayId 해당 배열 객체를 삭제하고 해당 위치(index)에 수정한 객체를 추가한다.
 * 수정할 DOM 을 찾아서 해당위치에 새로운 DOM 을 추가하고 이전 DOM은 삭제한다.
 * @param {수정할 DDay ID} dDayId 
 * @param {수정된 DDay 객체} newDDay 
 * @param {수정된 DDay DOM} newElement 
 * @returns 
 */
function updateDDay(dDayId, newDDay, newElement){
  let updateItemIndex = findIndexFromDDayId(dDayId);
    if (updateItemIndex < 0) {
      return;
    }
    // 해당 배열 index의 요소 1개를 제거
    dDayArr.splice(updateItemIndex, 1, newDDay);
    let updateElement = document.querySelector(`#dDayId${dDayId}`);
    var parentUl = updateElement.parentNode;
    parentUl.insertBefore(newElement, updateElement);
    updateElement.remove();
}
/**
 * 새로 추가된 DDay 객체를 배열에 추가하고 새로운 dom 추가 
 * @param {새로운 DDay 객체} newDDay 
 * @param {추가될 DOM} newElement 
 */
function pushDDay(newDDay, newElement){
  dDayArr.push(newDDay);
  let ulElement = document.querySelector('.items');
  ulElement.appendChild(newElement);
}

/**
 * 디데이 수정 모달 보여주기
 * @param {이벤트} e
 */
function showUpdateModal(e) {
  isUpdate = true;
  let dataSet = e.target.dataset;
  let dDayId = dataSet.dDayId;
  displayModal(true, dDayId);
}

/**
 * 디데이 추가 모달 보여주기
 * @param {이벤트} e
 */
function clickAddModalButon(e) {
  isUpdate = false;
  displayModal(false, -1);
}

/**
 * 수정여부에 따른 모달창 보여주기
 * @param {수정여부} isUpdate
 * @param {디데이 id} dDayId
 */
function displayModal(isUpdate, dDayId) {
  modalTitle.textContent = isUpdate ? 'D-Day 수정' : 'D-Day 추가';
  deleteBtn.style.display = isUpdate ? 'block' : 'none';
  addModal.style.display = 'block';

  let dDayTitle = '';
  let dDayDate = '';
  let dDayStickerClassName = stickerImageClassNames[0];
  let dDayBGImageName = bgImageNames[0];
  let is1DaySetDate = false;
  if (isUpdate) {
    saveBtn.dataset.dDayId = dDayId;
    let dDayData = getCurrentDDay(dDayId);
    if (dDayData) {
      dDayTitle = dDayData[TITLE_NAME];
      dDayDate = dDayData[D_DAY_DATE_NAME];
      dDayStickerClassName = dDayData[STICKER_CLASS_NAME];
      dDayBGImageName = dDayData[BG_IMAGE_NAME];
      is1DaySetDate = dDayData[IS_1DAY_SET_DATE];
    }
  }
  deleteBtn.dataset.dDayId = isUpdate ? dDayId : -1;
  modalDDayTitleElement.value = dDayTitle;
  modalDDayDateElement.value = dDayDate;
  modalDDayStickerElement.className = dDayStickerClassName;
  modalDDayBGImageElement.style = `background-image: url('./img/${dDayBGImageName}');`;
  modalDDayBGImageElement.dataset.imageName = dDayBGImageName;
  modal1DaySetDateElement.checked = is1DaySetDate;
}

/**
 * 배열내에 디데이 id에 해당하는 첫번째 요소를 찾아서 반환(없으면 undefined)
 * @param {디데이 id} dDayId
 * @returns
 */
function getCurrentDDay(dDayId) {
  return dDayArr.find((item) => item[ID_NAME] == dDayId);
}
/**
 * 입력값 초기화
 */
function clearInputData() {
  modalDDayTitleElement.value = '';
  modalDDayDateElement.value = '';
  modalDDayBGImageElement.style = `background-image: url(./img/${bgImageNames[0]});`;
  modalDDayStickerElement.className = stickerImageClassNames[0];
  modal1DaySetDateElement.checked = false;
  isUpdate = false;
}

/**
 * 입력 및 수정 모달창 닫기
 */
function closeModal() {
  addModal.style.display = 'none';
  deleteBtn.style.display = 'none';
  clearInputData();
}

/**
 * 삭제 버튼 클릭시
 * @param {이벤트} e
 */
function clickDeleteBtn(e) {
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
 * 스티커 Grid layout 보여주기
 */
function showStickerGridLayout() {
  let gridLayout = document.createElement('div');
  gridLayout.className = 'stickerGridLayout';
  for (let stickerClassName of stickerImageClassNames) {
    let gridItem = createDomGridItem(stickerClassName);
    gridLayout.appendChild(gridItem);
  }

  gridLayoutContainer.appendChild(gridLayout);
  gridLayoutContainer.style.display = 'block';
}

/**
 * 배경 선택 이미지명 변경
 * @param {이벤트} e
 */
function chooseBGImageName(e) {
  let t = e.target;
  let imageName = t.dataset.imageName;
  let gridLayout = document.querySelector('.bgGridLayout');
  gridLayoutContainer.style.display = 'none';
  gridLayout.remove();
  modalDDayBGImageElement.style = `background-image: url(./img/${imageName});`;
  modalDDayBGImageElement.dataset.imageName = imageName;
}

/**
 * 배경 Grid layout 보여주기
 */
function showBGImageGridLayout() {
  let gridLayout = document.createElement('div');
  gridLayout.className = 'bgGridLayout';
  for (let imageName of bgImageNames) {
    let gridItem = createDomGridImageItem(imageName);
    gridLayout.appendChild(gridItem);
  }

  gridLayoutContainer.appendChild(gridLayout);
  gridLayoutContainer.style.display = 'block';
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
