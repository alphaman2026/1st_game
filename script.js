
input.addEventListener("input", () => {
  if (current.startsWith(input.value)) {
    input.style.borderColor = "green";
  } else {
    input.style.borderColor = "red";
  }

  if (input.value.trim() === current) {
    score++;
    scoreEl.textContent = score;

    input.value = "";
    input.style.borderColor = "black";

    setProverb();
    time += 3;
  }
});

const proverbs = [
  "가는 말이 고와야 오는 말이 곱다",
  "백문이 불여일견",
  "호랑이도 제 말 하면 온다",
  "원숭이도 나무에서 떨어진다",
  "고생 끝에 낙이 온다",
  "티끌 모아 태산",
  "세 살 버릇 여든까지 간다",
  "아는 길도 물어가라",
  "우물 안 개구리",
  "등잔 밑이 어둡다"
];

let current = "";
let score = 0;
let time = 15;

const proverbEl = document.getElementById("proverb");
const input = document.getElementById("input");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");

// 랜덤 속담
function getRandom() {
  return proverbs[Math.floor(Math.random() * proverbs.length)];
}

// 속담 세팅
function setProverb() {
  current = getRandom();
  proverbEl.textContent = current;
}

// 입력 체크
input.addEventListener("input", () => {
  if (input.value.trim() === current) {
    score++;
    scoreEl.textContent = score;

    input.value = "";
    setProverb();

    time += 3; // 시간 보너스
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
