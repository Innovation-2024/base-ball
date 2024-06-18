// 이곳에 코드를 구현해주세요.

const numbers = [];
let tryCount = 0;

//* 1. 0과 9사이의 서로 다른 숫자 3개를 무작위로 뽑아 numbers 배열에 추가해주세요.
//* (단, 숫자는 중복되면 안됩니다.)
function generateNumbers() {
  while(numbers.length < 3) {
    let inputnumber = Math.floor(Math.random()*10); 
      if(!numbers.includes(inputnumber)) {
        numbers.push(inputnumber)
      }
  }
  return numbers;
}

//* 2. 사용자가 입력한 숫자가 numbers 배열에 있는지 확인하는 함수를 만들어주세요.
//* (숫자가 있으면 true, 없으면 false를 반환해야 합니다.)
function checkInputNumber(inputNumber) {
  for(let i=0; i<3; i++) {
        for(let j=0; j<3; j++) {
            if(numbers[i] == inputNumber[j]) {
                if(i === j) {
                    return true; // 숫자와 자릿수가 같을때 true
                } else {
                    return false;// 숫자는 같지만 자릿수가 다를때 false
                }
            }
        }
    }
}

document
  .getElementById("gameForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    //* 사용자가 입력한 숫자 값을 가져와, (2)에서 만든 함수를 사용해 결과를 출력해주세요.
    //* 결과값에 따라, div#result와 div#history에 결과를 추가해주세요.

    // 코드 구현
  });
