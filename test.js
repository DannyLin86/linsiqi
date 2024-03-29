// 获取DOM元素
const clueDisplay = document.getElementById("clue");
const option1Button = document.getElementById("option1");
const option2Button = document.getElementById("option2");
const option3Button = document.getElementById("option3");
const option4Button = document.getElementById("option4");
const progressBar = document.getElementById("progress-bar");
const progressText = document.getElementById("progress-text");
const wrongWordsList = document.getElementById("wrong-words-list");
const scoreDisplay = document.getElementById("score"); // 新增获取分数显示元素

let currentWordIndex = 0;
let wrongWords = [];
let randomWords = [...words]; // 创建一个新数组，用于随机测试
let isTranslatingToEnglish = true; // 默认为从中文翻译到英文
let correctOptionIndex; // 正确答案的选项索引
let correctAnswersCount = 0; // 新增变量记录答对题目数
let totalScore = 0; // 新增变量记录总分

// 初始化分数显示为0
if (scoreDisplay) {
  scoreDisplay.textContent = `得分：0/${randomWords.length}`;
}

// 更新进度条的函数
function updateProgressBar() {
    const progress = ((currentWordIndex + 1) / randomWords.length) * 100;
    progressBar.style.width = `${progress}%`;
    progressText.textContent = `${currentWordIndex + 1}/${randomWords.length}`;
  }
  
  // 更新提示、选项和进度条的函数
  function updateTest() {
    const currentWord = randomWords[currentWordIndex];
    const clue = isTranslatingToEnglish ? currentWord.definition : currentWord.word;
    clueDisplay.textContent = clue;
  
    const options = [currentWord.word];
    correctOptionIndex = 0;
  
    // 随机生成三个错误选项
    while (options.length < 4) {
      const randomIndex = Math.floor(Math.random() * randomWords.length);
      const randomWord = randomWords[randomIndex].word;
      if (!options.includes(randomWord)) {
        options.push(randomWord);
      }
    }
  
    // 随机排列选项
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
      if (options[i] === currentWord.word) {
        correctOptionIndex = i;
      }
    }
  
    // 更新选项按钮的文本
    option1Button.textContent = options[0];
    option2Button.textContent = options[1];
    option3Button.textContent = options[2];
    option4Button.textContent = options[3];
  
    updateProgressBar();
  }
  

// 检查答案的函数
function checkAnswer(optionIndex) {
    if (optionIndex === correctOptionIndex) {
      correctAnswersCount++;
      totalScore++; // 每答对一题，总分加1
      alert("回答正确!");
      currentWordIndex = (currentWordIndex + 1) % randomWords.length;
      updateTest();
      updateScore();
    } else {
      const currentWord = randomWords[currentWordIndex];
      wrongWords.push(currentWord);
      alert(`回答错误!正确答案是: ${currentWord.word}`);
      currentWordIndex = (currentWordIndex + 1) % randomWords.length;
      updateTest();
      updateScore();
      
      // 显示最新错题本列表
      showWrongWordsList();
    }
  }

// 更新分数显示的函数
function updateScore() {
  if (scoreDisplay) {
    scoreDisplay.textContent = `得分：${correctAnswersCount}/${randomWords.length}`;
  }
}

// 显示错题本的单词列表
function showWrongWordsList() {
    wrongWordsList.innerHTML = "";
    wrongWords.forEach((word, index) => {
      const li = document.createElement("li");
      li.textContent = `${index + 1}. ${word.word} - ${word.definition}`;
      wrongWordsList.appendChild(li);
    });
  }
  

// 为选项按钮添加事件监听器
option1Button.addEventListener("click", () => checkAnswer(0));
option2Button.addEventListener("click", () => checkAnswer(1));
option3Button.addEventListener("click", () => checkAnswer(2));
option4Button.addEventListener("click", () => checkAnswer(3));

// 初始化测试
updateTest();