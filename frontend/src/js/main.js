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
const depositSection = UIHelper.getElement("depositSection");
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
playCoinflipHeadsBtn.addEventListener("click", async function(event) {
    await coinflipGame.playCoinflip("heads");
})

playCoinflipTailsBtn.addEventListener("click", async function(event) {
    await coinflipGame.playCoinflip("tails");
})

const guessNumberGame = new GuessNumber();
playGuessNumberGameBtn.addEventListener("click", async function(event) {
    await guessNumberGame.playGuessNumberGame();
})


function toggleGameSectionAndHideOthers(gameSectionToShow){
    const games = [coinflipSection, guessNumberSection];
     games.forEach(game => {
        game.style.display = ((game === gameSectionToShow) && gameSectionToShow.style.display == "none") ? "block" : "none";
    });
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