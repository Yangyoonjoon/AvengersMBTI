// 문제 정보를 저장할 객체
let q = {
  1: {
    title:
      "타노스의 핑거 스냅으로 친구 호크아이의 가족들이 모두 사라졌을 때 나는",
    type: "TF",
    A: "무슨 일인지 알아보고 되돌리는 것을 돕는다.",
    B: "친구의 위로하고 옆에서 힘이 되어준다.",
  },
  2: {
    title: "우주에서 표류하고 있는 친구 토니 스타크에게 연락이 닿았을 때 나는",
    type: "TF",
    A: "표류하고 있는 이유를 물어보고 캡틴 마블의 연락처를 알아본다.",
    B: "나의 일처럼 공감하고 걱정해 준다.",
  },
  3: {
    title: "우리 팀에 새로운 팀원 캡틴 마블이 합류했을 때 나는",
    type: "EI",
    A: "먼저 다가가서 말을 걸어본다.",
    B: "언젠가 말할 일이 있겠지.. 다음을 기약한다.",
  },
  4: {
    title:
      "양자 영역에 갇힌 나를 꺼내 주기로 했던 동료들의 응답이 없을 때 나는",
    type: "JP",
    A:
      '"꺼내주기로 약속했으니 꼭 응답할 거야!" 계획대로 동료의 응답을 기다린다.',
    B: '"어쩔 수 없다.." 스스로 나가는 것을 시도한다.',
  },
  5: {
    title:
      "양자 영역에서 5시간 후 우연히 탈출하게 되었는데 바깥세상은 5년이나 흘러있다. 이 상황에서 나는",
    type: "TF",
    A: "어떻게 된 일인지 알아본다.",
    B: '"살았다!" 탈출한 것을 다행으로 여긴다.',
  },
  6: {
    title:
      "인피니티 스톤을 구하기 위해 위험하지만 양자 영역을 이용하면 시간 여행이 가능할지도 모른다는 의견이 나왔을 때 나는",
    type: "SN",
    A: '"위험하고, 확실하지 않은 방법이야" 다른 아이디어를 생각해 본다.',
    B: '"좋은 생각!" 일단 시도해본다.',
  },
  7: {
    title: "작전 회의 중 세 팀으로 나눠서 과거로 떠나기로 했을 때 나는",
    type: "EI",
    A: '"뭐 이번 기회에 친해지자!" 잘 모르는 동료라도 같이 간다.',
    B: '"친한 동료와 가야 편하지!" 평소에 잘 알던 동료들과 간다.',
  },
  8: {
    title: "과거로 가기 전 나는",
    type: "JP",
    A: '"과거에서 무슨 일이 일어날지 몰라!" 꼼꼼히 계획을 세운다.',
    B:
      '"이미 겪었던 과거로 가는 건데 무슨 일 있겠어?" 계획보다는 상황에 따라 판단한다.',
  },
  9: {
    title:
      "과거로 왔다. 그런데 과거, 엘리베이터에서 겪은 일이 똑같이 일어나려고 할 때 나는",
    type: "SN",
    A: "과거와 똑같은 방법으로 해결한다.",
    B: "새로운 방법을 사용해본다.",
  },
  10: {
    title: "타노스와 싸우게 되었을 때 나는",
    type: "SN",
    A: "평소에 사용하던 익숙하고 안정성 있는 무기를 가지고 싸운다.",
    B: "비록 사용에 있어 미숙하더라도 더 좋은 새로운 무기를 가지고 싸운다.",
  },
  11: {
    title: "타노스를 물리치고 세상을 구했다. 오늘은 실컷 놀기로 했을 때 나는",
    type: "EI",
    A: '"사람이 많아야 재밌지!" 모르는 사람이라도 불러서 다 같이 논다.',
    B: "제일 친한 사람 몇 명과 논다.",
  },
  12: {
    title:
      "과거에서 가져온 것들을 되돌려 놓으려고 다시 과거로 왔다. 임무를 완수했는데 평범한 삶을 살아보고 싶은 생각이 든다. 이 상황에서 나는",
    type: "JP",
    A: "팀원들에게 돌아온다고 약속했으니 돌아간다.",
    B:
      '"나도 평범한 삶을 살고 싶어!" 팀원들에게는 미안하지만 마음이 끌리는 대로 한다.',
  },
};

// 결과 정보를 저장할 객체
let result = {
  INTJ: {
    avenger: "닥터스트레인지",
    explain: "INTJ 설명",
    img: "img/닥터스트레인지.jpg",
    good_img: "img/스파이더맨.jpg",
    bad_img: "img/캡틴마블.jpg",
  },
  INTP: {
    avenger: "헐크",
    explain: "INTP 설명",
    img: "img/헐크.jpg",
    good_img: "img/캡틴마블.jpg",
    bad_img: "img/호크아이.jpg",
  },
  ENTJ: {
    avenger: "타노스",
    explain: "ENTJ 설명",
    img: "img/타노스.jpg",
    good_img: "img/헐크.jpg",
    bad_img: "img/스타로드.jpg",
  },
  ENTP: {
    avenger: "아이언맨",
    explain: "ENTP 설명",
    img: "img/아이언맨.jpg",
    good_img: "img/닥터스트레인지.jpg",
    bad_img: "img/캡틴아메리카.jpg",
  },
  INFJ: {
    avenger: "비전",
    explain: "INFJ 설명",
    img: "img/비전.jpg",
    good_img: "img/아이언맨.jpg",
    bad_img: "img/캡틴마블.jpg",
  },
  INFP: {
    avenger: "스칼렛위치",
    explain: "INFP 설명",
    img: "img/스칼렛위치.jpg",
    good_img: "img/로키.jpg",
    bad_img: "img/캡틴마블.jpg",
  },
  ENFJ: {
    avenger: "로키",
    explain: "ENFJ 설명",
    img: "img/로키.jpg",
    good_img: "img/블랙팬서.jpg",
    bad_img: "img/토르.jpg",
  },
  ENFP: {
    avenger: "스파이더맨",
    explain: "ENFP 설명",
    img: "img/스파이더맨.jpg",
    good: "img/닥터스트레인지.jpg",
    bad_img: "img/블랙팬서.jpg",
  },
  ISTJ: {
    avenger: "호크아이",
    explain: "ISTJ 설명",
    img: "img/호크아이.jpg",
    good_img: "img/스타로드.jpg",
    bad_img: "img/로키.jpg",
  },
  ISFJ: {
    avenger: "캡틴아메리카",
    explain: "ISFJ 설명",
    img: "img/캡틴아메리카.jpg",
    good_img: "img/토르.jpg",
    bad_img: "img/비전.jpg",
  },
  ESTJ: {
    avenger: "캡틴마블",
    explain: "ESTJ 설명",
    img: "img/캡틴마블.jpg",
    good_img: "img/헐크.jpg",
    bad_img: "img/스칼렛위치.jpg",
  },
  ESFJ: {
    avenger: "앤트맨",
    explain: "ESFJ 설명",
    img: "img/앤트맨.jpg",
    good_img: "img/블랙위도우.jpg",
    bad_img: "img/로키.jpg",
  },
  ISTP: {
    avenger: "블랙위도우",
    explain: "ISTP 설명",
    img: "img/블랙위도우.jpg",
    good_img: "img/캡틴마블.jpg",
    bad_img: "img/스파이더맨.jpg",
  },
  ISFP: {
    avenger: "블랙팬서",
    explain: "ISFP 설명",
    img: "img/블랙팬서.jpg",
    good_img: "img/앤트맨.jpg",
    bad_img: "img/스파이더맨.jpg",
  },
  ESTP: {
    avenger: "스타로드",
    explain: "ESTP 설명",
    img: "img/스타로드.jpg",
    good_img: "img/호크아이.jpg",
    bad_img: "img/로키.jpg",
  },
  ESFP: {
    avenger: "토르",
    explain: "ESFP 설명",
    img: "img/토르.jpg",
    good_img: "img/캡틴아메리카.jpg",
    bad_img: "img/로키.jpg",
  },
};
