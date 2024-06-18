// 재PR
const numbers = [];
let tryCount = 0;

function generateNumbers() {
  while (numbers.length < 3) {
    let inputNumber = Math.floor(Math.random() * 10);
    if (!numbers.includes(inputNumber)) {
      numbers.push(inputNumber);
    }
  }
  return numbers;
}

function checkInputNumber(inputNumber) {
  let guess = inputNumber.split("").map(Number);
  let strikes = 0;
  let balls = 0;

  for (let i = 0; i < 3; i++) {
    if (numbers[i] === guess[i]) {
      strikes++;
    } else if (numbers.includes(guess[i])) {
      balls++;
    }
  }

  return [strikes, balls];
}

generateNumbers();
console.log("사용자가 선택한 숫자:", numbers);


document.getElementById("gameForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const guessInput = document.getElementById("guessInput").value;
  const resultDiv = document.getElementById("result");
  const historyDiv = document.getElementById("history");


  if (!isValidInput(guessInput)) {
    resultDiv.textContent = "잘못된 입력입니다. 숫자는 모두 서로 다른 값이어야 합니다.";
    return;
  }

  tryCount++;


  const [strikes, balls] = checkInputNumber(guessInput);


  resultDiv.textContent = `${strikes}S ${balls}B`;
  historyDiv.innerHTML += `<p>${tryCount}번째 시도: ${guessInput} <br> ${strikes}S ${balls}B</p>`;


  if (strikes === 3) {
    resultDiv.textContent = `축하합니다! ${tryCount}번 시도 끝에 맞추셨습니다. 게임을 종료합니다.`;
    tryCount = 0;
    generateNumbers();
  }

  document.getElementById("guessInput").value = "";
});


function isValidInput(input) {
  const inputArray = input.split("");
  return new Set(inputArray).size === 3;
}
