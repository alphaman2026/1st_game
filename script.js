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

function saveScore(newScore) {
  let scores = JSON.parse(localStorage.getItem("scores")) || [];

  scores.push(newScore);
  scores.sort((a, b) => b - a); // 내림차순

  scores = scores.slice(0, 5); // top 5

  localStorage.setItem("scores", JSON.stringify(scores));
}

function showRanking() {
  const list = document.getElementById("rankingList");
  const scores = JSON.parse(localStorage.getItem("scores")) || [];

  list.innerHTML = "";

  scores.forEach((s, i) => {
    const li = document.createElement("li");
    li.textContent = `${i + 1}등 - ${s}점`;
    list.appendChild(li);
  });
}

function getMessage(score) {
  if (score >= 10) return "🔥 완벽해요!! 프로 가수급입니다!!";
  if (score >= 7) return "👏 잘했어요! 박수👏👏";
  if (score >= 4) return "👍 괜찮아요! 점점 늘고 있어요!";
  return "😊 처음이니까 괜찮아요! 다시 도전!";
}



let isComposing = false;

// 한글 입력 시작
input.addEventListener("compositionstart", () => {
  isComposing = true;
});

// 한글 입력 완료
input.addEventListener("compositionend", () => {
  isComposing = false;
});

// 입력 이벤트
input.addEventListener("input", () => {
  if (isComposing) return; // 👉 핵심: 조합 중이면 무시

  if (current.text.startsWith(input.value)) {
    input.style.borderColor = "lime";
  } else {
    input.style.borderColor = "red";
  }

  if (input.value.trim() === current.text) {
    score++;
    scoreEl.textContent = score;

    // 👉 순서 중요
    input.value = "";
    input.blur();   // 조합 상태 완전 종료
    input.focus();  // 다시 입력 가능

    setProverb();
    time += 3;
  }
});
// 타이머
setInterval(() => {
  time--;
  timeEl.textContent = time;

if (time <= 0) {
  saveScore(score);

  const message = getMessage(score);

  document.body.innerHTML = `
    <div style="text-align:center; margin-top:100px;">
      <h1>🎤 게임 종료!</h1>
      <h2>점수: ${score}</h2>
      <p class="end-message">${message}</p>
      <button onclick="location.reload()">다시하기</button>
    </div>
  `;

  return;
}
}, 1000);

// 시작
setProverb();

showRanking();
