const numbers = generateNumber();
let tryCount = 0;

function generateNumber() {
    const numbers = [];
    while (numbers.length < 3) {
        let inputnumber = Math.floor(Math.random() * 10);
        if (!numbers.includes(inputnumber)) {
            numbers.push(inputnumber);
        }
    }
    return numbers;
}

function checkInputNumber(inputNumber) {
    let strike = 0;
    let ball = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (numbers[i] == inputNumber[j]) {
                if (i === j) {                                                                                                                                                                                                                                                                                                            
                    strike++;
                } else {
                    ball++;
                }
            }
        }
    }
    return { strike, ball };
}

document.getElementById('gameForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const guessInput = document.getElementById('guessInput').value;
    if (guessInput.length !== 3 || isNaN(guessInput)) {
        alert('3자리 숫자를 입력하세요.');
        return;
    }
    const inputNumber = guessInput.split('').map(Number);
    const result = checkInputNumber(inputNumber);
    tryCount++;

    const resultDiv = document.getElementById('result');
    const tryCountDiv = document.getElementById('try-count');
    const historyDiv = document.getElementById('history');

    resultDiv.textContent = `결과: ${result.strike} 스트라이크, ${result.ball} 볼`;
    tryCountDiv.textContent = `시도 횟수: ${tryCount}`;
    
    const historyItem = document.createElement('div');
    historyItem.classList.add('history-item');
    historyItem.textContent = `${guessInput} - ${result.strike}S ${result.ball}B`;
    historyDiv.appendChild(historyItem);

    if (result.strike === 3) {
        alert(`축하합니다! ${tryCount}번 만에 맞추셨습니다.`);
        window.location.reload();
    }
});
