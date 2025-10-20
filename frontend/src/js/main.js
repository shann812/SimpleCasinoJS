import { Coinflip } from "./games/coinflip.js";
import { GuessNumber } from "./games/guessNumber.js";
import { BalanceService } from "./balanceService.js";
import { UIHelper } from "./UIHelper.js";
import { Validator } from "./validator.js";
import { ToastManager } from "./toastManager.js";
ToastManager.init();

const loginBtn = UIHelper.getElement("loginBtn");
const registrationBtn = UIHelper.getElement("registrationBtn");
const loginFormSection = UIHelper.getElement("loginFormSection");
const loginForm = UIHelper.getElement("loginForm");

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
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    const userSection = UIHelper.getElement("userSection");
    const authSection = UIHelper.getElement("authSection");
    const balanceSection = UIHelper.getElement("balanceSection");

    const usernameSpan = UIHelper.getElement("usernameDisplay");
    const logoutBtn = UIHelper.getElement("logoutBtn");

    //TODO: saparate this to other methods
    const isUserLogin = token && username
    if (isUserLogin) {
        usernameSpan.textContent = username;
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

    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("role");
        location.reload();
    });
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
        await loginUser(userLogin);
    };
})

registrationBtn.addEventListener("click", function(event) {
    window.location.href = "registration.html";
})

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
    if(!isUserLogin()){
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

function isUserLogin(){
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    return token && username;
}

//WHY LOGIN IS HERE
async function loginUser(userLogin){
    try{
        const response = await fetch("https://localhost:7181/api/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userLogin)
        });
        if(!response.ok){
            const jsonErrors = await response.json();

            if (Array.isArray(jsonErrors.errors)) {
                jsonErrors.errors.forEach(err => UIHelper.showMessage(err, "error"));
            } else {
                UIHelper.showMessage("Unknown error occurred (frontend)", "error");
            }
        }
        else{
            const data = await response.json();

            localStorage.setItem("token", data.token);
            localStorage.setItem("username", data.username);
            localStorage.setItem("role", data.role);

            //TODO: fix toasts
            UIHelper.showMessage("Logged in successfully", "success");
            window.location.href = "index.html";
        }
    }
    catch(err){
        UIHelper.showMessage("Network error", "error");
        console.error(err);
    }
}

window.showModal = showModal;
window.closeModal = closeModal;