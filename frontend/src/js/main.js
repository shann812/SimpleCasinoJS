import { Coinflip } from "./games/coinflip.js";
import { GuessNumber } from "./games/guessNumber.js";
import { BalanceService } from "./balanceService.js";
import { UIHelper } from "./UIHelper.js";


const openDepositFormBtn = UIHelper.getElement("openDepositFormBtn");
const depositSection = UIHelper.getElement("depositSection");
const depositForm = UIHelper.getElement("depositForm");

const openCoinflipBtn = UIHelper.getElement("openCoinflipBtn");
const coinflipSection = UIHelper.getElement("coinflipGame");
const playCoinflipHeadsBtn = UIHelper.getElement("playCoinflipHeadsBtn");
const playCoinflipTailsBtn = UIHelper.getElement("playCoinflipTailsBtn");

const openGuessNumberBtn = UIHelper.getElement("openGuessNumberBtn");
const guessNumberSection = UIHelper.getElement("guessNumberGame");
const playGuessNumberGameBtn = UIHelper.getElement("playGuessNumberGameBtn");

openDepositFormBtn.addEventListener("click", function(event) {
    depositSection.style.display = (depositSection.style.display == "block") ? "none" : "block"
})

depositForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const balanceService = new BalanceService();
    balanceService.depositMoneyOnBalance();
});

window.addEventListener("showToastMessage", (e) => {
    showToast(e.detail.message, e.detail.type);
});

openCoinflipBtn.addEventListener("click", function(event) {
    toggleGameSectionAndHideOthers(coinflipSection);
    UIHelper.hideElement("coinflipResults");
});

openGuessNumberBtn.addEventListener("click", function(event) {
    toggleGameSectionAndHideOthers(guessNumberSection);
    UIHelper.hideElement("guessNumberResults");
})

const coinflipGame = new Coinflip();
playCoinflipHeadsBtn.addEventListener("click", function(event) {
    coinflipGame.playCoinflip("heads");
})

playCoinflipTailsBtn.addEventListener("click", function(event) {
    coinflipGame.playCoinflip("tails");
})

const guessNumberGame = new GuessNumber();
playGuessNumberGameBtn.addEventListener("click", function(event) {
    guessNumberGame.playGuessNumberGame();
})


function toggleGameSectionAndHideOthers(gameSectionToShow){
    const games = [coinflipSection, guessNumberSection];
     games.forEach(game => {
        game.style.display = ((game === gameSectionToShow) && gameSectionToShow.style.display == "none") ? "block" : "none";
    });
}

function showToast(message, type = "info"){
    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.textContent = message;

    const container = UIHelper.getElement("toast-container");
    container.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 2000);
}