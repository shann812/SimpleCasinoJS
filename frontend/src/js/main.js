import { Coinflip } from "./games/coinflip.js";
import { GuessNumber } from "./games/guessNumber.js";
import { BalanceService } from "./balanceService.js";
import { UIHelper } from "./UIHelper.js";
import { Validator } from "./validator.js";
import { ToastManager } from "./toastManager.js";
import { AccountService } from "./AccountService.js";
ToastManager.init();

const loginBtn = UIHelper.getElement("loginBtn");
const registrationBtn = UIHelper.getElement("registrationBtn");
const loginForm = UIHelper.getElement("loginForm");

const userSection = UIHelper.getElement("userSection");
const authSection = UIHelper.getElement("authSection");
const balanceSection = UIHelper.getElement("balanceSection");

const usernameSpan = UIHelper.getElement("usernameDisplay");
const myProfileBtn = UIHelper.getElement("myProfileBtn");
const logoutBtn = UIHelper.getElement("logoutBtn");

const openDepositFormBtn = UIHelper.getElement("openDepositFormBtn");
const depositForm = UIHelper.getElement("depositForm");

const openCoinflipBtn = UIHelper.getElement("openCoinflipBtn");
const coinflipSection = UIHelper.getElement("coinflipGame");
const playCoinflipHeadsBtn = UIHelper.getElement("playCoinflipHeadsBtn");
const playCoinflipTailsBtn = UIHelper.getElement("playCoinflipTailsBtn");

const openGuessNumberBtn = UIHelper.getElement("openGuessNumberBtn");
const guessNumberSection = UIHelper.getElement("guessNumberGame");
const playGuessNumberGameBtn = UIHelper.getElement("playGuessNumberGameBtn");


document.addEventListener("DOMContentLoaded", () => {
    showToastIfStored();
    updateUI();
});

document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            closeModal(modal.id);
        }
    });
});

loginBtn.addEventListener('click', () => showModal('loginModal'));

loginForm.addEventListener("submit", async function(e) {
    e.preventDefault();

    var userLogin = {
        email: UIHelper.getElement("email").value,
        password: UIHelper.getElement("password").value,
    }
    
    if(Validator.validateUserLogin(userLogin)){
        await AccountService.loginUser(userLogin);
    };
})

registrationBtn.addEventListener("click", function(event) {
    window.location.href = "registration.html";
})

myProfileBtn.addEventListener("click", () => {
        window.location.href = "myProfile.html";
});

logoutBtn.addEventListener("click", () => {
        AccountService.logoutUser();
});

openDepositFormBtn.addEventListener('click', () => showModal('depositModal'));

depositForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const balanceService = new BalanceService();
    balanceService.depositMoneyOnBalance();
    closeModal("depositModal");
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
playCoinflipHeadsBtn.addEventListener("click", async function(event) {
    if(!checkIsUserLogin()) return;
    await coinflipGame.playCoinflip("heads");
})

playCoinflipTailsBtn.addEventListener("click", async function(event) {
    await coinflipGame.playCoinflip("tails");
})

const guessNumberGame = new GuessNumber();
playGuessNumberGameBtn.addEventListener("click", async function(event) {
    if(!checkIsUserLogin()) return;
    await guessNumberGame.playGuessNumberGame();
})


function checkIsUserLogin(){
    if(!AccountService.isUserLogin()){
        UIHelper.showMessage("Please login to play", "error");
        return false;
    }
    return true;
}

function toggleGameSectionAndHideOthers(gameSectionToShow){
    const games = [coinflipSection, guessNumberSection];
     games.forEach(game => {
        game.style.display = ((game === gameSectionToShow) && gameSectionToShow.style.display == "none") ? "block" : "none";
    });
}

function showModal(modalId) {
    document.getElementById(modalId).classList.add('show');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('show');
}

function showToastIfStored(){
    const message = localStorage.getItem("toastMessage");
    const type = localStorage.getItem("toastType");

    if (message) {
        UIHelper.showMessage(message, type || "info");
        localStorage.removeItem("toastMessage");
        localStorage.removeItem("toastType");
    }
}

function updateUI(){
    if (AccountService.isUserLogin()) {
        usernameSpan.textContent = localStorage.getItem("username");
        userSection.style.display = "block";
        authSection.style.display = "none";
        balanceSection.style.visibility = "visible";

        const balanceService = new BalanceService();
        balanceService.updateUI();
    } else {
        userSection.style.display = "none";
        authSection.style.display = "block";
        balanceSection.style.visibility = "hidden";
    }
}

window.showModal = showModal;
window.closeModal = closeModal;