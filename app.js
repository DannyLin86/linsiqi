// 获取DOM元素
const wordDisplay = document.getElementById("word");
const phoneticDisplay = document.getElementById("phonetic");
const definitionDisplay = document.getElementById("definition");
const exampleDisplay = document.getElementById("example");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const pronounceWordButton = document.getElementById("pronounce");
const pronounceExampleButton = document.getElementById("say-example");
const progressBar = document.getElementById("progress-bar");
const progressText = document.getElementById("progress-text");
const wrongWordCheckbox = document.getElementById("wrong-word-checkbox");
const wrongWordsList = document.getElementById("wrong-words-list");
const viewWrongWordsButton = document.getElementById("view-wrong-words");

let currentIndex = 0;
let wrongWords = [];

// 更新单词展示的函数
function displayWord(index) {
  const word = words[index];
  wordDisplay.textContent = word.word;
  phoneticDisplay.textContent = word.phonetic;
  definitionDisplay.textContent = word.definition;
  exampleDisplay.textContent = word.example;
  wrongWordCheckbox.checked = false;
  updateProgressBar();

  // 根据单词是否有例句来控制按钮的显示和隐藏
  pronounceExampleButton.style.display = word.example ? 'inline-block' : 'none';
}

// 更新进度条的函数
function updateProgressBar() {
  const progress = ((currentIndex + 1) / words.length) * 100;
  progressBar.style.width = `${progress}%`;
  progressText.textContent = `${currentIndex + 1}/${words.length}`;
}

// 单词发音函数
function pronounceWord() {
  const wordToSpeak = words[currentIndex].word;
  const utterance = new SpeechSynthesisUtterance(wordToSpeak);
  utterance.lang = 'en-GB'; // 设置语言为英式英语
  window.speechSynthesis.speak(utterance);
}

// 例句发音函数
function pronounceExample() {
  const exampleToSpeak = words[currentIndex].example;
  const utterance = new SpeechSynthesisUtterance(exampleToSpeak);
  utterance.lang = 'en-GB'; // 设置语言为英式英语
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

// 切换单词事件
prevButton.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + words.length) % words.length;
  displayWord(currentIndex);
});

nextButton.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % words.length;
  displayWord(currentIndex);
});

pronounceWordButton.addEventListener("click", pronounceWord);
pronounceExampleButton.addEventListener("click", pronounceExample);
viewWrongWordsButton.addEventListener("click", showWrongWordsList);

// 初始化显示第一个单词
displayWord(currentIndex);