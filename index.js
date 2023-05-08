const titleDisplay = document.querySelector('.titleDisplay');
const startDisplay = document.querySelector('.startDisplay');
const judgeDisplay = document.querySelector('.judge');

const startBtn = document.querySelector('.gameStartBtn');
const finishedBtn = document.querySelector('.finishedBtn');
const openBtn = document.querySelector('.openBtn');
const betPlusBtn = document.querySelector('.betPlusBtn');
const betMinusBtn = document.querySelector('.betMinusBtn');

const gameStartText = document.querySelector('.gameStart');
const enemyCard = document.querySelector('.enemyCard');
const playerCard = document.querySelector('.playerCard');
const enemyText = document.querySelector('.enemyCard__text');
const playerText = document.querySelector('.playerCard__text');
const betMoney = document.querySelector('.betMoney');
const playMoney = document.querySelector('.playerMoney');

const numbers = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

let numberCards = {
  "A": 1,
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  "10": 10,
  "J": 11,
  "Q": 12,
  "K": 13
}

let money = 1000;
let bet = 0;
let count = 1;

//配列をシャッフル
function shuffleArray(array) {
  const cloneArray = [...array]

  for (let i = cloneArray.length - 1; i >= 0; i--) {
    let rand = Math.floor(Math.random() * (i + 1))
    // 配列の要素の順番を入れ替える
    let tmpStorage = cloneArray[i]
    cloneArray[i] = cloneArray[rand]
    cloneArray[rand] = tmpStorage
  }

  return cloneArray
}

//勝敗の判定
function judge(numberCards, myCard, enemyCard) {
  if(numberCards[myCard] > numberCards[enemyCard]) {
    judgeDisplay.innerHTML = "you win!!";
    money = money + (bet * 2);
  } else if(numberCards[myCard] === numberCards[enemyCard]) {
    judgeDisplay.innerHTML = "draw!!";
  } else {
    judgeDisplay.innerHTML = "you lose!!";
    money = money - bet;
  }
  playMoney.innerHTML = `所持金:${money}$`;
  bet = 0;
  betMoney.innerHTML = `BET!! ${bet}$`;
}

//ゲーム開始
startBtn.addEventListener('click', () => {
  titleDisplay.classList.add('notDisplay');
  startDisplay.classList.remove('notDisplay');
  gameStartText.classList.toggle('animate');
  finishedBtn.classList.toggle('notDisplay');
});

//お金をかける
betPlusBtn.addEventListener('click', () => {
    bet = bet + 100;
    if(bet > money) {
      bet = money;
    } 
    betMoney.innerHTML = `BET!! ${bet}$`;
});

//掛金を減らす
betMinusBtn.addEventListener('click', () => {
    bet = bet - 100;
    if(bet < 0) {
      bet = 0;
    }
    betMoney.innerHTML = `BET!! ${bet}$`;
});

//カードを開く
openBtn.addEventListener('click', () => {

  if(bet === 0) {
    alert("お金をかけてください");
    return;
  }
  
  let shuffledNumbers = shuffleArray(numbers);
  let enemyCardNum = shuffledNumbers[0];
  enemyText.innerHTML = enemyCardNum;

  shuffledNumbers = shuffleArray(numbers);
  let myCardNum = shuffledNumbers[0];
  playerText.innerHTML = myCardNum;

  enemyCard.classList.add('opened');
  playerCard.classList.add('opened');

  judge(numberCards, myCardNum, enemyCardNum);

  openBtn.innerHTML = "OPEN NEXT CARD";

  if(money == 0) {
    setTimeout(() => {
      alert("破産しました…");
      window.location.reload();
    }, 1000);
  }

  if(money > 10000) {
    setTimeout(() => {
      alert(`${count}回目でクリアです！！`);
      window.location.reload();
    }, 1000);
  }

  count = count + 1;
});

//ゲームを止める
finishedBtn.addEventListener('click', () => {
  let confirm = window.confirm("ゲームを終了しますか");
  if(confirm) {
    startDisplay.classList.add('notDisplay');
    titleDisplay.classList.remove('notDisplay');
    window.location.reload();
  }
});