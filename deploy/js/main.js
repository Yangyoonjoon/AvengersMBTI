// class name
const RIGHT_CN = "right",
  LEFT_CN = "left",
  NONE_CN = "none",
  TEST_END_CN = "test-end",
  BTN_HOVER_CN = "button-hover",
  OPACITY0_CN = "opacity-0",
  MOBILE_CN = "mobile";

let isMoving = false;

// 문제 번호
let num = 1;

// 시작 버튼을 눌렀을때
function start() {
  $(".start").addClass(NONE_CN);
  $(".question").removeClass(NONE_CN);
  $(".progress").removeClass(NONE_CN);
  $("#question-ad").removeClass(NONE_CN);
  next();
}

// A 버튼을 눌렀을때
$("#A").click(() => {
  if (!isMoving) {
    let type = $("#type").val();
    let preValue = $("#" + type).val();
    $("#" + type).val(parseInt(preValue) + 1);
    next();
  }
});

// B 버튼을 눌렀을때
$("#B").click(() => {
  if (!isMoving) {
    next();
  }
});

function changeQuestion() {
  // 문제 교체
  $("#title").html(q[num]["title"]);
  $("#type").val(q[num]["type"]);
  $("#A").html(q[num]["A"]);
  $("#B").html(q[num]["B"]);
  num++;
}

// 다음 단계로 가는 함수
function next() {
  // 문제가 끝났으면
  if (num >= 13) {
    $(".question").addClass(NONE_CN);
    $(".bottom").addClass(NONE_CN);
    $(".loading").removeClass(NONE_CN);
    $(".wrapper").addClass(TEST_END_CN);
    $(".progress").addClass(NONE_CN);

    // mbti 구하는 로직
    let mbti = "";
    $("#EI").val() < 2 ? (mbti += "I") : (mbti += "E");
    $("#SN").val() < 2 ? (mbti += "N") : (mbti += "S");
    $("#TF").val() < 2 ? (mbti += "F") : (mbti += "T");
    $("#JP").val() < 2 ? (mbti += "P") : (mbti += "J");

    // 결과 출력
    $("#img").attr(
      "src",
      `https://avengersmbti-files.netlify.app/${result[mbti]["img"]}`
    );
    $("#img").attr("alt", result[mbti]["avenger"]);
    $("#avenger").html(result[mbti]["avenger"]);
    $("#explain").html(result[mbti]["explain"]);
    $("#good-img").attr(
      "src",
      `https://avengersmbti-files.netlify.app/${result[mbti]["good_img"]}`
    );
    $("#bad-img").attr(
      "src",
      `https://avengersmbti-files.netlify.app/${result[mbti]["bad_img"]}`
    );

    $("#seatpicker-img1").attr(
      "src",
      "https://avengersmbti-files.netlify.app/seatpicker-img1.jpg"
    );
    $("#seatpicker-img2").attr(
      "src",
      "https://avengersmbti-files.netlify.app/seatpicker-img2.jpg"
    );

    // 로딩
    setTimeout(() => {
      $(".loading").addClass(NONE_CN);
      $(".result").removeClass(NONE_CN);
      $(".wrapper").addClass("fit-content");
    }, 2800);
  } else {
    isMoving = true;
    $(".progress-bar").attr("style", `width: calc(100 / 12 * ${num}%)`);
    $(".progress-bar").html(`${num}/12`);

    if (num === 1) {
      $(".question").addClass(RIGHT_CN);
      changeQuestion();
      setTimeout(() => {
        $(".question").removeClass(RIGHT_CN);
        isMoving = false;
      }, 300);
    } else {
      $(".question").addClass(LEFT_CN);
      setTimeout(() => {
        changeQuestion();
        $(".question").removeClass(LEFT_CN);
        $(".question").addClass(RIGHT_CN);
        $(".question").addClass(NONE_CN);
        setTimeout(() => {
          $(".question").removeClass(NONE_CN);
          setTimeout(() => {
            $(".question").removeClass(RIGHT_CN);
            isMoving = false;
          }, 100);
        }, 100);
      }, 300);
    }
  }
}

// 댓글 달기 버튼을 눌렀을때
$("#chat_btn").click(() => {
  const chat = document.querySelector("#chat");
  const location = chat.offsetTop;
  scrollTo({ top: location, behavior: "smooth" });
});

// 다시하기 버튼을 눌렀을때
$("#retry").click(() => {
  location.reload();
});

// 모바일인지 확인하는 함수
function isMobile() {
  const UserAgent = navigator.userAgent;

  if (
    UserAgent.match(
      /iPhone|iPad|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i
    ) != null ||
    UserAgent.match(/LG|SAMSUNG|Samsung/) != null
  ) {
    return true;
  } else {
    return false;
  }
}

function handleEnter(event) {
  const btn = event.target;
  btn.classList.add(BTN_HOVER_CN);
}

function handleLeave(event) {
  const btn = event.target;
  btn.classList.remove(BTN_HOVER_CN);
}

function init() {
  // 첫 화면
  setTimeout(() => {
    $(".logo").removeClass(OPACITY0_CN);
    $(".wrapper").removeClass(NONE_CN);
    setTimeout(() => {
      $(".logo-bg").addClass(OPACITY0_CN);
      setTimeout(() => {
        $(".audio").removeClass(NONE_CN);
        $(".logo-bg").addClass(NONE_CN);
      }, 500);
    }, 700);
  }, 700);

  if (!isMobile()) {
    const btns = document.querySelectorAll(".btn-hover");
    btns.forEach((btn) => {
      btn.addEventListener("mouseenter", handleEnter);
      btn.addEventListener("mouseleave", handleLeave);
    });
  } else {
    $(".wrapper").addClass(MOBILE_CN);
  }
}

init();
