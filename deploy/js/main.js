// class name
const RIGHT_CN = "right",
  LEFT_CN = "left",
  NONE_CN = "none",
  TEST_END_CN = "test-end",
  BTN_HOVER_CN = "button-hover",
  OPACITY0_CN = "opacity-0",
  MOBILE_CN = "mobile";

// 문제가 이동 중 인지
let isMoving = false;

// 문제 번호
let num = 1;

// mbti 리스트
const MBTI = [
  "INFP",
  "ENFP",
  "INFJ",
  "ENFJ",
  "INTJ",
  "ENTJ",
  "INTP",
  "ENTP",
  "ISFP",
  "ESFP",
  "ISTP",
  "ESTP",
  "ISFJ",
  "ESFJ",
  "ISTJ",
  "ESTJ",
];

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

// 문제 교체하는 함수
function changeQuestion() {
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
    paintResult(mbti);

    // 로딩
    loading();
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

// 결과 사진을 불러올 동안 로딩
function loading() {
  setTimeout(() => {
    $(".loading").addClass(NONE_CN);
    $(".result").removeClass(NONE_CN);
    $(".result-main").removeClass(NONE_CN);
    $(".wrapper").addClass("fit-content");
  }, 2800);
}

// 결과를 출력하는 함수
function paintResult(mbti) {
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
  $("#good-img").attr("alt", result[mbti]["good"]);
  $("#bad-img").attr("alt", result[mbti]["bad"]);
  $("#good-img").removeClass();
  $("#bad-img").removeClass();
  $("#good-img").addClass(result[mbti]["good_mbti"]);
  $("#bad-img").addClass(result[mbti]["bad_mbti"]);

  // seatpicker
  $("#seatpicker-img1").attr(
    "src",
    "https://avengersmbti-files.netlify.app/seatpicker-img1.jpg"
  );
  $("#seatpicker-img2").attr(
    "src",
    "https://avengersmbti-files.netlify.app/seatpicker-img2.jpg"
  );
}

// avenger 페이지 변경 함수
function changeAvenger(mbti) {
  $(".result").addClass(NONE_CN);
  $(".loading").removeClass(NONE_CN);
  $(".wrapper").removeClass("fit-content");
  paintResult(mbti);

  // 로딩
  loading();
}

// 최고의 팀원 이미지 클릭
$("#good-img").click(() => {
  const img = document.querySelector("#good-img");
  const mbti = img.className;
  changeAvenger(mbti);
});

// 최악의 팀원 이미지 클릭
$("#bad-img").click(() => {
  const img = document.querySelector("#bad-img");
  const mbti = img.className;
  changeAvenger(mbti);
});

// 댓글 달기 버튼을 눌렀을때
$("#chat_btn").click(() => {
  const chat = document.querySelector("#chat");
  const location = chat.offsetTop;
  scrollTo({ top: location, behavior: "smooth" });
});

// 모든 캐릭터 보기 버튼을 눌렀을때
$("#avengers_btn").click(() => {
  $(".result-main").addClass(NONE_CN);
  $(".loading").removeClass(NONE_CN);
  $(".wrapper").removeClass("fit-content");

  const avengers = document.querySelector(".avengers");

  // 자식 요소 모두 삭제
  while (avengers.hasChildNodes()) {
    avengers.removeChild(avengers.firstChild);
  }

  // 반복 하면서 모든 캐릭터 생성
  for (let i = 0; i < MBTI.length; i++) {
    const div = document.createElement("div");
    const name = document.createElement("h4");
    const img = document.createElement("img");

    name.innerText = result[MBTI[i]]["avenger"];

    img.className = MBTI[i];
    img.src = `https://avengersmbti-files.netlify.app/${
      result[MBTI[i]]["img"]
    }`;
    img.alt = result[MBTI[i]]["avenger"];
    img.addEventListener("click", (event) => {
      avengers.classList.add(NONE_CN);
      const mbti = event.target.className;
      changeAvenger(mbti);
    });

    div.appendChild(name);
    div.appendChild(img);
    avengers.appendChild(div);
  }

  // 모든 캐릭터 사진을 가져올 동안 로딩
  setTimeout(() => {
    $(".loading").addClass(NONE_CN);
    avengers.classList.remove(NONE_CN);
    $(".wrapper").addClass("fit-content");
  }, 4800);
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
  // 첫 화면 로딩
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
