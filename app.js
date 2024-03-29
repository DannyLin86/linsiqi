// 获取DOM元素
const wordDisplay = document.getElementById("word");
const phoneticDisplay = document.getElementById("phonetic");
const definitionDisplay = document.getElementById("definition");
const exampleDisplay = document.getElementById("example");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const pronounceButton = document.getElementById("pronounce");
const progressBar = document.getElementById("progress-bar");
const progressText = document.getElementById("progress-text");
const wrongWordCheckbox = document.getElementById("wrong-word-checkbox");
const wrongWordsList = document.getElementById("wrong-words-list");
const viewWrongWordsButton = document.getElementById("view-wrong-words");

let currentIndex = 0;
let wrongWords = []; // 错题本数组

// 更新单词展示的函数
function displayWord(index) {
  const word = words[index];
  wordDisplay.textContent = word.word;
  phoneticDisplay.textContent = word.phonetic;
  definitionDisplay.textContent = word.definition;
  exampleDisplay.textContent = word.example;
  wrongWordCheckbox.checked = false; // 清除复选框状态
  updateProgressBar();
}

// 更新进度条的函数
function updateProgressBar() {
  const progress = ((currentIndex + 1) / words.length) * 100;
  progressBar.style.width = `${progress}%`;
  progressText.textContent = `${currentIndex + 1}/${words.length}`;
}

// 发音函数
function pronounceWord() {
  const word = words[currentIndex].word;
  const utterance = new SpeechSynthesisUtterance(word);
  window.speechSynthesis.speak(utterance);
}

// 监听复选框变化，将单词添加至错题本
wrongWordCheckbox.addEventListener("change", function(event) {
  if (event.target.checked) {
    wrongWords.push(words[currentIndex]);
  } else {
    const indexToRemove = wrongWords.findIndex(word => word.word === words[currentIndex].word);
    if (indexToRemove !== -1) {
      wrongWords.splice(indexToRemove, 1);
    }
  }
});

// 显示错题本的单词列表
function showWrongWordsList() {
  wrongWordsList.innerHTML = "";
  wrongWords.forEach((word, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}. ${word.word} - ${word.definition}`;
    wrongWordsList.appendChild(li);
  });
}

// 显示错题本的单词列表并添加发音功能
function showWrongWordsList() {
  wrongWordsList.innerHTML = "";
  wrongWords.forEach((word, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}. ${word.word} - ${word.definition}`;
    
    // 创建发音按钮
    const pronounceBtn = document.createElement('button');
    pronounceBtn.textContent = '发音';
    pronounceBtn.classList.add('pronounce-btn'); // 添加CSS类名以便样式化
    pronounceBtn.dataset.word = word.word; // 将单词存入data属性便于后续取用

    pronounceBtn.addEventListener('click', function() {
      const utterance = new SpeechSynthesisUtterance(this.dataset.word);
      window.speechSynthesis.speak(utterance);
    });

    li.appendChild(pronounceBtn); // 将发音按钮添加到单词列表项中
    wrongWordsList.appendChild(li);
  });
}

// 切换单词事件
prevButton.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + words.length) % words.length;
  displayWord(currentIndex);
});

nextButton.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % words.length;
  displayWord(currentIndex);
});

pronounceButton.addEventListener("click", pronounceWord);

viewWrongWordsButton.addEventListener("click", showWrongWordsList);

// 初始化显示第一个单词
displayWord(currentIndex);