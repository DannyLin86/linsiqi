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

// 监听复选框变化，将单词添加至错题本并即时更新错题本列表
wrongWordCheckbox.addEventListener("change", function(event) {
  if (event.target.checked) {
    wrongWords.push(words[currentIndex]);
    showWrongWordsList(); // 添加这一行，使得添加错题后立即刷新错题本列表
  } else {
    const indexToRemove = wrongWords.findIndex(word => word.word === words[currentIndex].word);
    if (indexToRemove !== -1) {
      wrongWords.splice(indexToRemove, 1);
      showWrongWordsList(); // 同样在此处也可以考虑调用，但通常在查看错题本时整体刷新即可
    }
  }
});

// 在showWrongWordsList函数内部遍历每个单词添加发音按钮事件
function showWrongWordsList() {
  const wrongWordsList = document.getElementById("wrong-words-list");
  wrongWordsList.innerHTML = "";
  
  wrongWords.forEach((word, index) => {
    const li = document.createElement("li");
    const wordWithButton = document.createElement("span");
    wordWithButton.classList.add("word-with-button");

    const wordText = document.createElement("span");
    wordText.classList.add("word-text");
    wordText.textContent = `${word.word} - ${word.definition}`;

    const pronounceBtn = document.createElement("button");
    pronounceBtn.classList.add("pronounce-word-btn");
    pronounceBtn.textContent = "发音";

    pronounceBtn.addEventListener("click", () => {
      const utterance = new SpeechSynthesisUtterance(word.word);
      utterance.lang = 'en-GB';
      window.speechSynthesis.speak(utterance);
    });

    wordWithButton.appendChild(wordText);
    wordWithButton.appendChild(pronounceBtn);
    li.appendChild(wordWithButton);

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


// 初始化显示第一个单词
displayWord(currentIndex);