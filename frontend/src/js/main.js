import { Coinflip } from "./games/coinflip.js";
import { GuessNumber } from "./games/guessNumber.js";
import { BalanceService } from "./balanceService.js";
import { UIHelper } from "./UIHelper.js";
import { ToastManager } from "./toastManager.js";
ToastManager.init();

//TODO: fix style, add header
const loginBtn = UIHelper.getElement("loginBtn");
const registrationBtn = UIHelper.getElement("registrationBtn");
const loginFormSection = UIHelper.getElement("loginFormSection");
const loginForm = UIHelper.getElement("loginForm");

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


loginBtn.addEventListener("click", function(event) {
    loginFormSection.style.display = (loginFormSection.style.display == "block") ? "none" : "block"
})

loginForm.addEventListener("submit", async function(e) {
    e.preventDefault();

    var userLogin = {
        email: UIHelper.getElement("email").value,
        password: UIHelper.getElement("password").value,
    }
    
    if(Validator.validateUserLogin(userLogin)){
        await loginUser(userLogin);
    };
})

registrationBtn.addEventListener("click", function(event) {
    window.location.href = "registration.html";
})

openDepositFormBtn.addEventListener("click", function(event) {
    depositSection.style.display = (depositSection.style.display == "block") ? "none" : "block"
})

depositForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const balanceService = new BalanceService();
    balanceService.depositMoneyOnBalance();
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

function loginUser(userLogin){
    //TODO: connection with api
}