window.onload = function(){

    // 디데이 정보를 담는 객체
    let dDayInfo = {
        dDayIndex: 'index',
        dDayIcon: 'icon',
        dDaytitle: 'title',
        dDayDate: 'date',
        dDayResult: 'result',
    }

    // 테스트 객체 추가
    

    // 모달 팝업 열기&닫기
    let addBtn = $(".addBtn");
    let xBtn = $(".xBtn");

    addBtn.mousedown(function(){
        $(".addDay").addClass('on');
        $('.addWrap .option button.save').addClass('on');
        $('.addWrap .option button.del').removeClass('on');
        $('.addWrap .option button.change').removeClass('on');

        $('.addWrap .commonTop .tit').text('디데이 신규등록');

        dDayReset();
    });
    xBtn.mousedown(function(){
        $(".addDay").removeClass('on');
        $('.addWrap .commonTop .tit').text('');
        if ($('.dayList li').hasClass('optionOn')) $('.dayList li.optionOn').removeClass('optionOn');
    });

    // 디데이 추가하기

    // index 카운트-1
    dDayInfo.dDayIndex = $('.dayList li').length;

    let nowDate = new Date();
    let dDayLi = "";

    // 신규 디데이 생성
    $(document).on('click', '.addWrap .save', function(){
        // 제목과 날짜 입력 안했을 경우
        if (
            $.trim($('.inputWrite input').val()) == "" &&
            $.trim($('.inputDay input').val()) == ""
        ) {
            alert("제목과 날짜를 입력해주세요.");
            return false;
        }
        // 제목을 입력 안했을 경우
        else if ($.trim($('.inputWrite input').val()) == "") {
            alert("제목을 입력해주세요.");
            return false;
        }
        // 날짜를 입력 안했을 경우
        else if ($.trim($('.inputDay input').val()) == "") {
            alert("날짜를 입력해주세요.");
            return false;
        }
        dDayAdd();
        creatDday();
        dDayInfo.dDayIndex += 1;
        $('.dayList').append(dDayLi);
    });

    // 편집 화면 진입
    $(document).on('click', '.dayList li', function(){
        $(this).addClass('optionOn');

        $('.addWrap .commonTop .tit').text('디데이 수정하기');

        $('.addDay').addClass('on');
        $('.addWrap .option button.save').removeClass('on');
        $('.addWrap .option button.del').addClass('on');
        $('.addWrap .option button.change').addClass('on');

        $('.inputWrite input').val($(this).find('.tit').text());
        $('.inputDay input').val($(this).find('.day').text());
    });

    // 디데이 수정
    $(document).on('click', '.addWrap .option button.change', function(){
        // 제목을 입력 안했을 경우
        if ($.trim($('.inputWrite input').val()) == "") {
            alert("제목을 입력해주세요.");
            return false;
        }
        dDayLi = "";
        dDayAdd();
        ddayChild();
        $('.dayList li.optionOn').children().remove();
        $('.dayList li.optionOn').prepend(dDayLi);
        $('.dayList li.optionOn').removeClass('optionOn');
    });

    // 디데이 삭제 기능
    $(document).on('click', '.addWrap .option button.del', function(){
        let delCheck = confirm('삭제하시겠습니까?');
        if(delCheck == true) {
            alert('삭제되었습니다.');
            $('.dayList li.optionOn').remove();
            $(".addDay").removeClass('on');
        }
    });

    // 함수 모음

    // 디데이 리스트에 추가하기
    function dDayAdd () {
        // 입력한 제목과 날짜의 값을 객체 값으로 전환
        dDayInfo.dDaytitle = $.trim($('.inputWrite input').val());
        dDayInfo.dDayDate = $.trim($('.inputDay input').val());
        let slectDate = new Date(dDayInfo.dDayDate);

        // 디데이 계산
        let resultTime = nowDate.getTime() - slectDate.getTime();
        let resultDate = Math.round(resultTime/(1000*60*60*24));
        dDayInfo.dDayResult = resultDate;

        // +day 일 때
        if (dDayInfo.dDayResult > 0) {
            dDayInfo.dDayResult = "+" + dDayInfo.dDayResult;
        } else if (dDayInfo.dDayResult == 0) {
            dDayInfo.dDayResult = "-day";
        }

        $('.addDay').removeClass('on');

        dDayReset();
    }

    function creatDday () {
        dDayLi =  '<li data-length="'+ dDayInfo.dDayIndex +'">';
        ddayChild ();
        dDayLi += '</li>';
    }

    function ddayChild () {
        dDayLi += '<div class="left">';
        dDayLi += '<div class="icon">';
        dDayLi += '</div>';
        dDayLi += '<div class="text">';
        dDayLi += '<p class="tit">' + dDayInfo.dDaytitle + '</p>';
        dDayLi += '<p class="day">' + dDayInfo.dDayDate + '</p>';
        dDayLi += '</div>';
        dDayLi += '</div>';
        dDayLi += '<div class="right">';
        dDayLi += '<p> D' + dDayInfo.dDayResult + '</p>';
        dDayLi += '</div>';
    }

    // input 값 초기화
    function dDayReset () {
        document.getElementById('dTitle').value = "";
        document.getElementById('dDate').value = "";
    }
}