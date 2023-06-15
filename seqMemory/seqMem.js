var gridItems = document.querySelectorAll(".grid-item");
var container = document.getElementById("container")
var startButton = document.getElementById("startButton");
var scoreDisplay = document.getElementById("scoreDisplay");

var sequence = [];
var userSequence = [];
var score = 0;
var isGameActive = false;

var effectSound = new Audio("sound/Blop Sound.mp3");
var CorrectSound = new Audio("sound/Correct 2.mp3");
var wrongSound = new Audio("sound/wrong.mp3");

// 시작버튼 
startButton.addEventListener("click", function() {
  if (!isGameActive) {
    resetGame();
    isGameActive = true;
    startButton.disabled = true;
    container.classList.remove("game-over");
    showSequence();
  }
});

// 게임 리셋
function resetGame() {
  sequence = [];
  userSequence = [];
  score = 0;
  scoreDisplay.innerHTML = "색이 바뀌는 버튼을 기억하세요 !<br> Score: " + score;
}

//게임 진행
function showSequence() {
  var randomIndex = Math.floor(Math.random() * gridItems.length);

  sequence.push(randomIndex);
  var delay = 1000;
  sequence.forEach(function(index, idx) {
    setTimeout(function() {
      effectSound.play();
      gridItems[index].style.backgroundColor = "white";     
      setTimeout(function() {
        gridItems[index].style.backgroundColor = "rgb(20, 105, 217)";
        
        if (idx === sequence.length - 1) {
          enableGridClick();
          scoreDisplay.innerHTML = "바뀐 순서대로 누르세요 !<br> Score: " + score;
        }
      }, 300);
    }, delay);

    delay += 800;
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
  //effectSound.play();
  this.style.backgroundColor = "white";
  
  
  setTimeout(function() {
    gridItems[clickedIndex].style.backgroundColor = "rgb(20, 105, 217)";
  }, 300);

  var isCorrect = checkUserSequence();
  if (!isCorrect) {
    endGame();
  // 레벨 통과
  } else if (userSequence.length === sequence.length) {
    CorrectSound.play(); 
    score++;
    scoreDisplay.innerHTML = "색이 바뀌는 버튼을 기억하세요 !<br> Score: " + score;
    userSequence = [];
    disableGridClick();
    showSequence();
  }
}

// 유저 클릭 체크
function checkUserSequence() {
  for (var i = 0; i < userSequence.length; i++) {
    if (userSequence[i] !== sequence[i]) {  
      wrongSound.play();    
      return false;
    }
  }
  effectSound.play();
  return true;
}

// 게임종료 시 
function endGame() {
  isGameActive = false;
  startButton.disabled = false;
  scoreDisplay.innerHTML = "Game Over! <br> Score: " + score;
  disableGridClick();
  
  container.classList.add("game-over");
}
