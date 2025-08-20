const balanceEl = getElement("balance");
const depositSection = getElement("depositSection");
const depositForm = getElement("depositForm");
const depositMoneyInput = getElement("depositMoneySum");

const coinflipSection = getElement("coinflipGame");
const coinflipBetInput = getElement("coinflipBet")
const coinflipWinOrLoseEl = getElement("coinflipWinOrLoseLable");
const coinflipWonValueEl = getElement("wonValueCoinflip");

const guessNumberSection = getElement("guessNumberGame");
const guessNumberBetInput = getElement("guessNumberBet");
const guessNumberUserNumberInput = getElement("guessNumberUserNumber");
const guessNumberWinOrLoseEl = getElement("guessNumberWinOrLoseLable");
const guessNumberWonValueEl = getElement("wonValueGuessNumber");


depositForm.addEventListener("submit", function(event) {
    event.preventDefault();
    depositMoneyOnBalance();
});

function getElement(id){
    return document.getElementById(id);
}
function getUserBalance(){
    return parseFloat(balanceEl.textContent);
}

function addMoneyToBalance(value){
    balanceEl.textContent = getUserBalance() + value;
}

function deductMoneyFromBalance(value){
    balanceEl.textContent = getUserBalance() - value;
}

function showElement(id){
    const el = document.getElementById(id);
    el.style.visibility = "visible"
}

function hideElement(id){
    const el = document.getElementById(id);
    el.style.visibility = "hidden"
}

function showAndHideDepositForm(){
    depositSection.style.visibility = (depositSection.style.visibility == "visible") ? "hidden" : "visible"
}

function depositMoneyOnBalance(){
    const depositValue = parseFloat(depositMoneyInput.value);

    if(depositValue <= 0 || isNaN(depositValue)){
        alert("Enter correct deposit sum");
        return;
    }

    addMoneyToBalance(depositValue);
    depositMoneyInput.value = "";
    showAndHideDepositForm();
}

function validateUserBet(betInput){
    const userBet = parseFloat(betInput.value);
    if(isNaN(userBet) || userBet <= 0){
        alert("Enter correct bet value");
        return false;
    }
    if(userBet > getUserBalance()){
        alert("Your bet exceeds your balance.");
        return false;
    }

    return true;
}

function openCoinflipGame(){
    coinflipSection.style.visibility = (coinflipSection.style.visibility == "visible") ? "hidden" : "visible";
    hideElement("coinflipResults");
}

function playCoinflip(choosenSide){
    if(!validateUserBet(coinflipBetInput)) return;
    const userBet = parseFloat(coinflipBetInput.value);

    const randomNumber = Math.round(Math.random());
    showElement("coinflipResults");
    if((randomNumber === 0 && choosenSide == "heads") || (randomNumber === 1 && choosenSide == "tails")){
        coinflipWinOrLoseEl.textContent = "You won!";
        coinflipWonValueEl.textContent = userBet;
        addMoneyToBalance(userBet);
    }
    else{
        coinflipWinOrLoseEl.textContent = "You lose";
        coinflipWonValueEl.textContent = '-' + userBet;
        deductMoneyFromBalance(userBet);
    }
}

function openGuessNumberGame(){
    guessNumberSection.style.visibility = (coinflipSection.style.visibility == "visible") ? "hidden" : "visible";
    hideElement("guessNumberResults");
}

function playGuessNumberGame(){
    if(!validateUserBet(guessNumberBetInput)) return;
    const userBet = parseFloat(guessNumberBetInput.value);
    const userNumber = parseFloat(guessNumberUserNumberInput.value);
    if(isNaN(userNumber) || userNumber > 10 || userNumber < 1){
        alert("Please enter a number between 1 and 10");
        return;
    }

    const randomNumber = Math.floor(Math.random() * 10) + 1;
    showElement("guessNumberResults");
    if(randomNumber === userNumber){
        guessNumberWinOrLoseEl.textContent = "You win!";
        guessNumberWonValueEl.textContent = userBet * 10;
        addMoneyToBalance(userBet * 10);
    }
    else{
        guessNumberWinOrLoseEl.textContent = "You lost. Correct number was " + randomNumber;
        guessNumberWonValueEl.textContent = "-" + userBet;
        deductMoneyFromBalance(userBet);
    }
}