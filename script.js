var gridItems = document.querySelectorAll(".grid-item");
var startButton = document.getElementById("startButton");
var scoreDisplay = document.getElementById("scoreDisplay");

var sequence = [];
var userSequence = [];
var score = 0;
var isGameActive = false;

// 시작버튼 
startButton.addEventListener("click", function() {
  if (!isGameActive) {
    resetGame();
    isGameActive = true;
    startButton.disabled = true;
    showSequence();
  }
});

// 게임 리셋
function resetGame() {
  sequence = [];
  userSequence = [];
  score = 0;
  scoreDisplay.textContent = "Level : " + score;
}

//게임 진행
function showSequence() {
  var randomIndex = Math.floor(Math.random() * gridItems.length);

  sequence.push(randomIndex);

  var delay = 1000;
  sequence.forEach(function(index, idx) {
    setTimeout(function() {
      gridItems[index].style.backgroundColor = "white";
      
      setTimeout(function() {
        gridItems[index].style.backgroundColor = "rgb(20, 105, 217)";

        if (idx === sequence.length - 1) {
          enableGridClick();
        }
      }, 300);
    }, delay);

    delay += 1000;
  });
}

function enableGridClick() {
  gridItems.forEach(function(item) {
    item.addEventListener("click", handleGridClick);
  });
}

function disableGridClick() {
  gridItems.forEach(function(item) {
    item.removeEventListener("click", handleGridClick);
  });
}

//사용자 클릭
function handleGridClick() {
  var clickedIndex = Array.from(gridItems).indexOf(this);

  userSequence.push(clickedIndex);
  this.style.backgroundColor = "white";
  
  setTimeout(function() {
    gridItems[clickedIndex].style.backgroundColor = "rgb(20, 105, 217)";
  }, 300);

  var isCorrect = checkUserSequence();
  if (!isCorrect) {
    endGame();
  // 맞췄다면
  } else if (userSequence.length === sequence.length) { 
    score++;
    scoreDisplay.textContent = "Level : " + score;
    userSequence = [];
    disableGridClick();
    showSequence();
  }
}

// 맞췃는지 체크
function checkUserSequence() {
  for (var i = 0; i < userSequence.length; i++) {
    if (userSequence[i] !== sequence[i]) {
      return false;
    }
  }
  return true;
}

// 게임종료 시 
function endGame() {
  isGameActive = false;
  startButton.disabled = false;
  scoreDisplay.innerHTML = "Game Over! <br> Score: " + score;
  disableGridClick();
}
