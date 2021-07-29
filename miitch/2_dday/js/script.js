

/* 변수 모음 */
var $writePage = $('#CreateSchedule');  // 새 일정 만들기 팝업
var $dDayListBox = $('#dDayList');  // 리스트 ul
var $dDayList = $('.dDay');  // 리스트 li
var $detailPage = $('#detailPopup');  // 리스트에서 클릭 시 나오는 상세(?) 팝업
var $detailCloseButton = $detailPage.find('.closeButton'); // $detailPage 닫기
var $detailDeleteButton = $detailPage.find('.deleteButton');  // $detailPage 삭제
var $popupForDelete = $('#popupForDelete');  // $detailPage에서 "삭제" 누르면 나오는 "삭제하시겠습니까?" 팝업
var $doDelete = $popupForDelete.find('.do');  // $popupForDelete 확인(삭제하기)
var $undoDelete = $popupForDelete.find('.undo');  // $popupForDelete 돌아가기
var dDayItems = {}  // 데이터 들어갈 객체
var itemsId = "";  // 리스트에서 아이템 선택 시 해당 아이템 정보 "dDay_$$$$$$$$"
var mode = "load";  // "load" , "new" , "update"
/*-----------------------------------------------------*/
/* 날짜 세팅 */
/*-----------------------------------------------------*/
/**
 * 메인화면의 시간을 정기적으로 갱신함
 */
function getTime() {
  var today = new Date();	// 현재 날짜와 시간
  var sYear = today.getFullYear();
  var sMonth = today.getMonth() + 1;
  var sDate = today.getDate();
  var sHours = today.getHours();
  var sMin = today.getMinutes();
  var sSec = today.getSeconds();

  if (sMonth < 10) sMonth = "0" + sMonth;
  if (sDate < 10) sDate = "0" + sDate;
  if (sHours < 10) sHours = "0" + sHours;
  if (sMin < 10) sMin = "0" + sMin;
  if (sSec < 10) sSec = "0" + sSec;

  var board = $("#todayInfoTitle");
  var output = '<p id="date">' + sYear + '-' + sMonth + '-' + sDate + '</p>'
             + '<p id="time">' + sHours + ':' + sMin + ':' + sSec + '</p>';

  board.html(output);

  setTimeout(getTime, 1000);
};

/**
 * 새 일정 만들기의 목표일 date input 의 기본값을 "오늘 날짜"로 함
 * @returns Date
 */
function getTodaysDate() {
  var today = new Date();
  var month = (today.getMonth() + 1);               
  var day = today.getDate();

  if (month < 10) month = "0" + month;
  if (day < 10) day = "0" + day;

  var today = today.getFullYear() + '-' + month + '-' + day;

  return today;
};

/**
 * 새 일정 만들기에 아이콘을 추가함
 */
function setIconList() {
  var newIconList = $('#newIconList');
  var iconCount = 9;

  for( var i = 1; i <= iconCount; i++ ) {
    var iconNo = "iconNo" + i;
    var icon = '<li>'
              + '<input type="radio" name="icon" id="'+ iconNo + '" value="'+ iconNo + '">'
              + '<label for="'+ iconNo + '">'
              + '<img src="images/' + iconNo + '.png">'
              + '</label></li>';

    newIconList.append(icon);
  }
}
/*-----------------------------------------------------*/

/*-----------------------------------------------------*/
/* 새 일정 만들기 */

/** 데이터를 저장 */
function appendData() {
  if( $('input[name="newDesc"]').val() == "" ) { 
    alert('일정을 입력해주세요.');
    return false; 
  }

  $writePage.removeClass('active').slideUp();

  if( mode == "new" ) {
    var uniqueKey = 'dDay_' + new Date().getTime();
    // createObject(uniqueKey);
    dDayItems[uniqueKey] = {
      'icon': $('input[name="icon"]:checked').val(),
      'description': $('input[name="newDesc"]').val(),
      'date': $('input[name="newDate"]').val(),
    }
    writeToStorage();
    setList(uniqueKey);
  } else if ( mode == "update" ) {
    createObject(itemsId);
    writeToStorage();
    setList(itemsId);
  }
}

/**
 * dDayItems 객체에 저장
 * @param {string} key 
 */
function createObject(key) {
  dDayItems[key] = {
    'icon': $('input[name="icon"]:checked').val(),
    'description': $('input[name="newDesc"]').val(),
    'date': $('input[name="newDate"]').val(),
  }
}


/**로컬스토리지에 보존된 값을 객체화 */
function loadStorageToObject() { 
  dDayItems = window.localStorage.getItem('dDayItems') != null ? JSON.parse(window.localStorage.getItem('dDayItems')) : {};
}

/**dDayItems 객체를 로컬스토리지에 저장 */
function writeToStorage() { window.localStorage.setItem('dDayItems', JSON.stringify(dDayItems)); }


/**
 * 저장된 데이터를 화면으로 보냄
 * @param {string} targetKey  // for new or update
 */
function setList(targetKey = "") {
  if ( mode == "load" ) {
    for (var key in dDayItems) {
      $dDayListBox.append(createList(key, dDayItems[key]));
    }
  } else if ( mode == "new" ) {
    $dDayListBox.append(createList(targetKey, dDayItems[targetKey]));
  } else if ( mode == "update" ) {
    var list = $('.dDay');
    var listLen = list.length;
    for( var i = 0; i < listLen; i++ ) {
      if (list[i].dataset.id == targetKey) {
        $(list[i]).html(createList(targetKey, dDayItems[targetKey]));
      }
    }
  }
}


/**
 * 화면으로 보낼 데이터(html)를 작성
 * @param {string} key  // "dDay_$$$$$$$"
 * @param {object} items   // { "icon": "iconNo$", "descrition":"string", "date":"yyyy-mm-dd" } 
 * @returns html source
 */
function createList(key, items) {
  var durationDate = getDuration(dDayItems[key]["date"]);

  var moment = (durationDate >= -2 && 0 > durationDate) ? "soon" :
               (durationDate > 0) ? "over" :
               (durationDate == 0) ? "today" : "normal";

  var dDayCount = (durationDate == 0) ? "D-DAY" :
                  (durationDate > 0) ? "D+" + durationDate :
                  (durationDate < 0) ? "D" + durationDate : "";

  var html = "";

  if(mode == "load" || mode == "new") {
    html = '<li class="dDay" data-id="' + key +'">'
         + '<div class="icon"><img src="images/'+ items['icon'] +'.png"></div>'
         + '<div class="text"><p class="desc">'+ items['description'] +'</p><p class="date">'+ items['date'] +'</p></div>'
         + '<div class="goal '+ moment +'">'+ dDayCount +'</div>'
         + '</li>';
  } else if( mode == "update" ) {
    html = '<div class="icon"><img src="images/'+ items['icon'] +'.png"></div>'
         + '<div class="text"><p class="desc">'+ items['description'] +'</p><p class="date">'+ items['date'] +'</p></div>'
         + '<div class="goal '+ moment +'">'+ dDayCount +'</div>';
  }
  return html;
}


/**
 * D-DAY 를 계산해서 반환하는 함수
 * @param {string} time yyyy-mm-dd
 * @returns {number} dd
 */
function getDuration(time) {
  var result = 0;
  var goal = new Date(time).getTime();

  var nowDate = new Date();
  var nowDateYMD = new Date(nowDate.getFullYear() + "-" + ("0" + (nowDate.getMonth() + 1)).slice(-2) + "-" + ("0" + nowDate.getDate()).slice(-2)).getTime();

  result = (nowDateYMD - goal) / (1000*3600*24);

  return result;
}


/*-----------------------------------------------------*/
function deleteList() {
  $('[data-id=' + itemsId + ']').remove();
  delete dDayItems[itemsId];
  writeToStorage();
}

/*-----------------------------------------------------*/
function updateData() {
  mode = "update";
  var iconNum = dDayItems[itemsId]["icon"].slice(6);
  $('input[name="icon"]').removeAttr('checked');
  $('input[name="icon"]')[iconNum - 1].checked = true;
  $('input[name="newDesc"]').val(dDayItems[itemsId]["description"]);
  $('input[name="newDate"]').val(dDayItems[itemsId]["date"]);
  setPaper();

  // createObject(itemsId);
}

/*-----------------------------------------------------*/
function setPaper() {
  var updateText = "";
  var defaultText = "새 일정 생성";
  if ( mode == "update" ) {
    updateText = "일정 수정";
  } else {
    updateText = defaultText;
  }
  $writePage.find('h2').text(updateText);
}

/*-----------------------------------------------------*/
/* 디테일 페이지 */
/*-----------------------------------------------------*/
function setdetailPage() {
      var target = dDayItems[itemsId];
      var durationDate = getDuration(target['date']);
      var dateText = "";

      if (durationDate > 0) {
        dateText = target['date'] + "로부터 " + durationDate + "일 지났습니다.";
      } else if (durationDate == 0) {
        dateText = "D-DAY!!";
      } else if (durationDate < 0) {
        dateText = target['date'] + "까지 " + Math.abs(durationDate) + "일 남았습니다.";
      }

      var detailHtml = '<div class="icon"><img src="images/' + target['icon'] + '.png" alt=""></div>'
      + '<div class="text"><p class="desc">' + target['description'] + '</p>'
      + '<p class="date">' + dateText + '</p></div>';

      $('#detailInfoBlock').html(detailHtml);
}


/*-----------------------------------------------------*/
/* UI 클릭 이벤트 */
/*-----------------------------------------------------*/
$('#addButton').on('click', function() {
  if( $writePage.hasClass('active') ) {
    $writePage.removeClass('active').slideUp();
  } else {
    mode = "new";
    $('input[name="icon"]').removeAttr('checked');
    $('input[name="icon"]')[0].checked = true;
    $('input[name="newDesc"]').val('');
    $('input[name="newDate"]').val(getTodaysDate());

    $writePage.addClass('active').slideDown();
  }
});

$('#submit').on('click', appendData);


$(document).on('click', '.dDay', function() {
  itemsId = $(this).data('id');
    if ( !$detailPage.hasClass('active') ) { 
      $detailPage.fadeIn().addClass('active');
      setdetailPage();
    }
});


$('#topButtonBlock button').on('click', function() {
  if ( $(this).hasClass('deleteButton') ) {
    $popupForDelete.addClass('active');
  } else if ( $(this).hasClass('closeButton') ) {
    $popupForDelete.removeClass('active');
    $detailPage.fadeOut().removeClass('active');
  } else if ( $(this).hasClass('updateButton') ) {
    $writePage.fadeIn().addClass('active');
    $detailPage.fadeOut().removeClass('active');
    updateData();
  }
});

$('#popupForDelete button').on('click', function() {
  if ( $(this).hasClass('do') ) {
    deleteList();
    $popupForDelete.removeClass('active');
    $detailPage.removeClass('active').fadeOut();
  } else if ( $(this).hasClass('undo') ) {
    $popupForDelete.removeClass('active');
  }
});

/*-----------------------------------------------------*/
/* 초기 실행 */
getTime();
$('input[name="newDate"]').val(getTodaysDate());
setIconList();
loadStorageToObject();
setList();

/** 정렬기능? */