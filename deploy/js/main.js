// class name
const RIGHT_CN = "right",
  LEFT_CN = "left",
  NONE_CN = "none",
  TEST_END_CN = "test-end",
  BTN_HOVER_CN = "button-hover",
  OPACITY0_CN = "opacity-0",
  MOBILE_CN = "mobile",
  LMOBILE_CN = "large-mobile",
  NOTAPPEAR_CN = "notAppear";

const audio = new Audio("https://avengersmbti-files.netlify.app/어벤져스.mp3");
const musicBtn = document.querySelector("#music_btn");

// 문제가 이동 중 인지
let isMoving = false;
// 트리거를 사용했는지
let isTrigger1Used = false;
let isTrigger2Used = false;
let isTrigger3Used = false;
// 음악을 재생할 것인지
let isMusicOn = true;
// 테스트를 시작하였는지 (음악 컨트롤을 위해)
let isTestStart = false;

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
  isTestStart = true;
  if (isMusicOn) {
    playMusic();
  }
  next();

  // 모든 캐릭터 보기 생성
  loadAvengers();
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
      $(".question").addClass(OPACITY0_CN);
      changeQuestion();
      setTimeout(() => {
        $(".question").removeClass(RIGHT_CN);
        $(".question").removeClass(OPACITY0_CN);
        isMoving = false;
      }, 300);
    } else {
      $(".question").addClass(LEFT_CN);
      $(".question").addClass(OPACITY0_CN);
      setTimeout(() => {
        changeQuestion();
        $(".question").removeClass(LEFT_CN);
        $(".question").addClass(RIGHT_CN);
        $(".question").addClass(NONE_CN);
        setTimeout(() => {
          $(".question").removeClass(NONE_CN);
          setTimeout(() => {
            $(".question").removeClass(RIGHT_CN);
            $(".question").removeClass(OPACITY0_CN);
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

    // 등장 애니메이션 초기화
    $("#img").addClass(NOTAPPEAR_CN);
    $("#avenger").addClass(NOTAPPEAR_CN);
    $("#explain").addClass(NOTAPPEAR_CN);
    $(".good-bad-title").addClass(NOTAPPEAR_CN);
    $(".good-bad").addClass(NOTAPPEAR_CN);
    $("#avengers_btn").addClass(NOTAPPEAR_CN);
    $("#mission_btn").addClass(NOTAPPEAR_CN);
    $(".jocoding").addClass(NOTAPPEAR_CN);
    $(".my-ad").addClass(NOTAPPEAR_CN);
    $("#retry_btn").addClass(NOTAPPEAR_CN);
    isTrigger1Used = false;
    isTrigger2Used = false;
    isTrigger3Used = false;

    setAppearTime(
      document.querySelector("#img"),
      document.querySelector("#avenger"),
      document.querySelector("#explain")
    );
  }, 2750);
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

  // my-ad
  $("#faceshapeai-img").attr(
    "src",
    "https://avengersmbti-files.netlify.app/faceshapeai.png"
  );
  $("#seatpicker-img").attr(
    "src",
    "https://avengersmbti-files.netlify.app/seatpicker.png"
  );
  $("#nickname-img").attr(
    "src",
    "https://avengersmbti-files.netlify.app/nickname.png"
  );
}

// avenger 페이지 변경 함수
function changeAvenger(mbti) {
  $(".result").addClass(NONE_CN);
  $(".loading").removeClass(NONE_CN);
  $(".wrapper").removeClass("fit-content");
  paintResult(mbti);

  scrollTo({ top: 0 });

  // 로딩
  loading();
}

// 모든 캐릭터 보기를 했을때 보여줄 화면을 생성하는 함수
function loadAvengers() {
  const avengers = document.querySelector(".avengers");

  // 반복 하면서 모든 캐릭터 생성
  for (let i = 0; i < MBTI.length; i++) {
    const div = document.createElement("div");
    const name = document.createElement("h4");
    const img = document.createElement("img");

    name.className = "name";
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

  // 미션 삭제
  const mission = document.querySelector("#mission");
  mission.classList.add(NONE_CN);
});

// 모든 캐릭터 보기 버튼을 눌렀을때
$("#avengers_btn").click(() => {
  $(".result-main").addClass(NONE_CN);
  $(".loading").removeClass(NONE_CN);
  $(".wrapper").removeClass("fit-content");

  // 모든 캐릭터 보기 로딩
  setTimeout(() => {
    $(".loading").addClass(NONE_CN);
    $(".avengers").removeClass(NONE_CN);
    $(".wrapper").addClass("fit-content");
  }, 2750);
});

// 다시하기 버튼을 눌렀을때
$("#retry_btn").click(() => {
  location.reload();
});

// 폰트 라이선스 버튼을 눌렀을때
$("#font_btn").click(() => {
  const fontCopyright = document.querySelector("#font-copyright");
  fontCopyright.classList.toggle(NONE_CN);
  const location = fontCopyright.offsetTop;
  scrollTo({ top: location, behavior: "smooth" });
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

// 복사 버튼을 클릭했을때
$("#copy_btn").click(() => {
  copyToClipboard("https://avengersmbti.netlify.app/");
  alert("복사 완료! 감사합니다!");
});
$("#url_btn").click(() => {
  copyToClipboard("https://avengersmbti.netlify.app/");
  alert("복사 완료! 감사합니다!");
});

// 클립보드로 복사하는 함수
function copyToClipboard(val) {
  let t = document.createElement("textarea");
  document.body.appendChild(t);
  t.value = val;
  t.select();
  document.execCommand("copy");
  document.body.removeChild(t);
}

// 등장하는 함수
function appear(dom) {
  dom.classList.remove(NOTAPPEAR_CN);
}

// 시간 간격을 두고 세개의 dom이 등장하는 함수
function setAppearTime(dom1, dom2, dom3) {
  setTimeout(() => {
    appear(dom1);
    setTimeout(() => {
      appear(dom2);
      setTimeout(() => {
        appear(dom3);
      }, 300);
    }, 300);
  }, 300);
}

// 미션 버튼을 클릭했을때
function handleMission(missionBtn) {
  missionBtn.classList.add(NONE_CN);
  const mission = document.querySelector("#mission");
  mission.classList.remove(NONE_CN);
  setTimeout(() => {
    appear(mission);
  }, 100);
}

// 스크롤이 생겼을 경우 실행되는 함수
function handleScroll() {
  const trigger1 = document.querySelector("#trigger1");
  const trigger2 = document.querySelector("#trigger2");
  const trigger3 = document.querySelector("#trigger3");

  const height = window.innerHeight;

  if (window.scrollY + height >= trigger1.offsetTop && !isTrigger1Used) {
    isTrigger1Used = true;

    setAppearTime(
      document.querySelector(".good-bad-title"),
      document.querySelector(".good-bad"),
      document.querySelector("#avengers_btn")
    );
  } else if (window.scrollY + height >= trigger2.offsetTop && !isTrigger2Used) {
    isTrigger2Used = true;

    // 미션 버튼
    const missionBtn = document.querySelector("#mission_btn");
    appear(missionBtn);
    missionBtn.addEventListener("click", () => {
      handleMission(missionBtn);
    });
  } else if (window.scrollY + height >= trigger3.offsetTop && !isTrigger3Used) {
    isTrigger3Used = true;

    setAppearTime(
      document.querySelector(".jocoding"),
      document.querySelector(".my-ad"),
      document.querySelector("#retry_btn")
    );
  }
}

// 음악을 재생하는 함수
function playMusic() {
  musicBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
  isMusicOn = true;
  if (isTestStart) {
    audio.play();
  }
}

// 음악을 정지하는 함수
function pauseMusic() {
  musicBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
  isMusicOn = false;
  audio.pause();
}

function handleMusic() {
  if (isMusicOn) {
    pauseMusic();
  } else {
    playMusic();
  }
}

function handleResize() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  if (width <= 800 && height >= 1000) {
    $(".wrapper").addClass(MOBILE_CN);
  } else if (width <= 1200 && height >= 1300) {
    $(".wrapper").addClass(LMOBILE_CN);
  } else {
    $(".wrapper").removeClass(MOBILE_CN);
    $(".wrapper").removeClass(LMOBILE_CN);
  }
}

function init() {
  // 첫 화면 로딩
  setTimeout(() => {
    $(".logo").removeClass(OPACITY0_CN);
    $(".wrapper").removeClass(NONE_CN);
    setTimeout(() => {
      $(".logo-bg").addClass(OPACITY0_CN);
      $(".start").removeClass(NONE_CN);
      setTimeout(() => {
        $(".logo-bg").addClass(NONE_CN);
        appear(document.querySelector(".start"));
        setTimeout(() => {
          appear(document.querySelector(".bottom-menu"));
        }, 500);
      }, 700);
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
  handleResize();
  musicBtn.onclick = handleMusic;
  window.addEventListener("scroll", handleScroll);
  window.addEventListener("resize", handleResize);
  audio.addEventListener("play", () => {
    playMusic();
  });
  audio.addEventListener("pause", () => {
    pauseMusic();
  });
}

init();
