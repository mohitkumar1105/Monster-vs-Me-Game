const monsterHealthBar = document.getElementById('monster-health');
const playerHealthBar = document.getElementById('player-health');
const bonusLifeEl = document.getElementById('bonus-life');

const attackBtn = document.getElementById('attack-btn');
const strongAttackBtn = document.getElementById('strong-attack-btn');
const healBtn = document.getElementById('heal-btn');
const logBtn = document.getElementById('log-btn');





const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;

let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

let battleLog = [];


const logEventPlayerAttack = "playerAttack";
const logEventPlayerStrongAttack = 'playerStrongAttack';
const logEventMonsterAttack = 'monsterAttack';
const logEventHealValue = 'healValue';
const logEventGameOver = 'gameOver'



adjustHealthBars(chosenMaxLife)




function showLog(ev, val, monsterheath, playerhealth) {
  let logEntries = {
    event: ev,
    value: val,
    finalMonsterHealth: monsterheath,
    finalPlayerHealth: playerhealth,
  }

  if (ev === logEventPlayerAttack) {
    logEntries.target = "Monster"

  } else if (ev === logEventPlayerStrongAttack) {

    logEntries = {
      event: ev,
      value: val,
      taget: 'Monster',
      finalMonsterHealth: monsterheath,
      finalPlayerHealth: playerhealth,
    };
  } else if (ev === logEventMonsterAttack) {

    logEntries = {
      event: ev,
      value: val,
      taget: 'player',
      finalMonsterHealth: monsterheath,
      finalPlayerHealth: playerhealth,
    };
  } else if (ev === logEventGameOver) {


    logEntries = {
      event: ev,
      value: val,
      finalMonsterHealth: monsterheath,
      finalPlayerHealth: playerhealth,
    };
  }
  battleLog.push(logEntries);
}






function reset() {
  currentMonsterHealth = chosenMaxLife;
  currentPlayerHealth = chosenMaxLife;
  resetGame(chosenMaxLife);
}

function endRound() {
  const initialPlayerHealth = currentPlayerHealth;
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;

  showLog(logEventMonsterAttack, playerDamage, currentMonsterHealth, currentPlayerHealth)

  if (currentPlayerHealth <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    currentPlayerHealth = initialPlayerHealth;
    setPlayerHealth(initialPlayerHealth);
    alert('You would be dead but the bonus life saved you!');
  }

  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert('You won!');
    showLog(logEventGameOver, 'player  Won!', currentMonsterHealth, currentPlayerHealth)
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert('You lost!');
    showLog(logEventGameOver, 'monster  Won!', currentMonsterHealth, currentPlayerHealth)
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
    alert('You have a draw!');
    showLog(logEventGameOver, 'Draw game!', currentMonsterHealth, currentPlayerHealth)
  }

  if (currentMonsterHealth <= 0 || currentPlayerHealth <= 0) {
    reset();
  }


}







function attackMonster(mode) {
  let maxDamage;
  let logEvent;
  if (mode === 'ATTACK') {
    maxDamage = ATTACK_VALUE;
    logEvent = logEventPlayerAttack
  } else if (mode === 'STRONG_ATTACK') {
    maxDamage = STRONG_ATTACK_VALUE;
    logEvent = logEventPlayerStrongAttack
  }
  const damage = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= damage;
  showLog(logEvent, damage, currentMonsterHealth, currentPlayerHealth)
  endRound();


}

function attackHandler() {
  attackMonster('ATTACK');
}

function strongAttackHandler() {
  attackMonster('STRONG_ATTACK');
}

function healPlayerHandler() {
  let healValue;
  if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
    alert("You can't heal to more than your max initial health.");
    healValue = chosenMaxLife - currentPlayerHealth;
  } else {
    healValue = HEAL_VALUE;
  }
  increasePlayerHealth(healValue);
  currentPlayerHealth += healValue;
  showLog(logEventHealValue, healValue, currentMonsterHealth, currentPlayerHealth)
  endRound();
}

function printLog(){
  console.log(battleLog)
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);
logBtn.addEventListener('click', printLog)











function adjustHealthBars(maxlife) {

  monsterHealthBar.value = maxlife;
  monsterHealthBar.max = maxlife;
  playerHealthBar.value = maxlife;
  playerHealthBar.max = maxlife
}


function dealMonsterDamage(damage) {
  const dealtDamage = Math.random() * damage;
  monsterHealthBar.value = +monsterHealthBar.value - dealtDamage;
  return dealtDamage;
}

function dealPlayerDamage(damage) {
  const dealtDamage = Math.random() * damage;
  playerHealthBar.value = +playerHealthBar.value - dealtDamage;
  return dealtDamage;
}

function increasePlayerHealth(healValue) {
  playerHealthBar.value = +playerHealthBar.value + healValue;
}

function resetGame(value) {
  playerHealthBar.value = value;
  monsterHealthBar.value = value;
}

function removeBonusLife() {
  bonusLifeEl.parentNode.removeChild(bonusLifeEl);
}

function setPlayerHealth(health) {
  playerHealthBar.value = health;
}
