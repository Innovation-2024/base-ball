class BaseBall {
  constructor() {
    this.answerNumbers = [];
    this.tryCount = 0;

    this.$form = document.querySelector("#gameForm");
    this.$input = document.querySelector("#guessInput");
    this.$result = document.querySelector("#result");
    this.$tryCount = document.querySelector("#try-count");
    this.$history = document.querySelector("#history");
  }

  // 게임 시작
  start() {
    this.answerNumbers = this.generateNumbers();
    this.tryCount = 0;

    this.$form.addEventListener("submit", (e) => {
      e.preventDefault();

      this.try(this.$input.value);
      this.$input.value = "";
      this.$input.focus();
    });
  }

  // 초기 랜덤 숫자 생성
  generateNumbers() {
    const result = [];
    const candidate = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (let i = 0; i < 3; i++) {
      // 한개씩 뽑은 후에 배열에서 제거 & 뽑은 숫자개수(i)만큼 index앞당기기
      const chosen = candidate.splice(
        Math.floor(Math.random() * (9 - i)),
        1
      )[0];
      result.push(chosen);
    }

    return result;
  }

  // 사용자 input 시도
  try(inputValue) {
    if (inputValue.length !== 3) {
      alert("3자리 숫자를 입력해주세요.");
      return;
    }

    if (new Set(inputValue).size !== 3) {
      alert("중복되지 않게 입력해주세요.");
      return;
    }

    this.tryCount++;
    const { strike, ball } = this.checkNumber(inputValue);

    this.$tryCount.textContent = `시도 횟수: ${this.tryCount}`;
    this.displayResult(inputValue, strike, ball);
    this.displayHistory(inputValue, strike, ball);
  }

  // 입력값 <-> 결과값 비교
  checkNumber(input) {
    const tryNumbers = input.split("").map(Number);

    let [strike, ball] = [0, 0];
    for (let i = 0; i < this.answerNumbers.length; i++) {
      if (this.answerNumbers[i] === tryNumbers[i]) {
        strike++;
      } else if (this.answerNumbers.includes(tryNumbers[i])) {
        ball++;
      }
    }

    return { strike, ball };
  }

  // 결과, 화면에 표시
  displayResult(inputValue, strike, ball) {
    if (strike === 3) {
      this.$result.textContent = "🎉 홈런! 축하합니다!";
      this.endGame();
    } else {
      this.$result.textContent = `${inputValue} - ${strike} S ${ball} B`;
    }
  }

  // 시도 횟수, 화면에 표시
  displayHistory(inputValue, strike, ball) {
    const $li = document.createElement("li");
    $li.textContent = `${inputValue} - ${strike} S ${ball} B`;
    this.$history.appendChild($li);
  }

  endGame() {
    this.$input.disabled = true;
    this.$input.value = "";
    this.$input.placeholder = "게임이 종료되었습니다.";
    this.$form.removeEventListener("submit", () => {});

    setTimeout(() => {
      if (window.confirm("게임을 다시 시작하시겠습니까?")) {
        window.location.reload();
      }
    }, 1000);
  }
}

const baseBall = new BaseBall();

baseBall.start();

console.log(baseBall.answerNumbers);
