const data = [
  {
    text: "가는 말이 고와야 오는 말이 곱다",
    meaning: "내가 남에게 잘해야 남도 나에게 잘한다"
  },
  {
    text: "백문이 불여일견",
    meaning: "백 번 듣는 것보다 한 번 보는 것이 낫다"
  },
  {
    text: "고생 끝에 낙이 온다",
    meaning: "어려움을 이겨내면 좋은 일이 온다"
  },
  {
    text: "티끌 모아 태산",
    meaning: "작은 것도 모이면 큰 것이 된다"
  },
  {
    text: "등잔 밑이 어둡다",
    meaning: "가까운 곳의 일을 잘 모른다"
  }
];

let current = {};
let score = 0;
let time = 15;

const proverbEl = document.getElementById("proverb");
const meaningEl = document.getElementById("meaning");
const input = document.getElementById("input");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");

// 랜덤 선택
function getRandom() {
  return data[Math.floor(Math.random() * data.length)];
}

// 문제 세팅
function setProverb() {
  current = getRandom();
  proverbEl.textContent = current.text;
  meaningEl.textContent = current.meaning;
}

// 입력 체크
input.addEventListener("input", () => {
  if (current.text.startsWith(input.value)) {
    input.style.borderColor = "lime";
  } else {
    input.style.borderColor = "red";
  }

  if (input.value.trim() === current.text) {
    score++;
    scoreEl.textContent = score;

    input.value = "";
    input.style.borderColor = "#ccc";

    setProverb();
    time += 3;
  }
});

// 타이머
setInterval(() => {
  time--;
  timeEl.textContent = time;

  if (time <= 0) {
    alert(`게임 종료! 점수: ${score}`);
    location.reload();
  }
}, 1000);

// 시작
setProverb();
