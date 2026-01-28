import { UIHelper } from "./UIHelper.js";
import { ToastManager } from "./toastManager.js";
import { AccountService } from "./Services/accountService.js";
import { BetService } from "./Services/betService.js";
ToastManager.init();

const username = UIHelper.getElement("username");
const email = UIHelper.getElement("email");
const balance = UIHelper.getElement("balance");
const regDate = UIHelper.getElement("regDate");

const withdrawBtn = UIHelper.getElement("withdrawBtn");
const loadMoreBetsBtn = UIHelper.getElement("loadMoreBetsBtn");
const scrollTopBtn = document.getElementById("scrollTopBtn");

let skip = 0; //how many bets already on the page
const take = 5; //load 5 bets for a one time

document.addEventListener("DOMContentLoaded", async () => {
    await loadUserInfo();
    await loadUserBets(skip, take);

    //TODO: fix 401 if user login some time ago
});

loadMoreBetsBtn.addEventListener("click", async () => {
    skip += take;
    await loadUserBets(skip, take);
});

window.addEventListener("scroll", () => {
    if (document.documentElement.scrollTop > 200) {
        scrollTopBtn.style.display = "block";
    } else {
        scrollTopBtn.style.display = "none";
    }
});

scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

async function loadUserInfo(){
    const userInfo = await AccountService.getUserInfo();
    username.textContent = userInfo.username;
    email.textContent = userInfo.email;
    balance.textContent = userInfo.balance;
    regDate.textContent = userInfo.regDate;
}

//TODO: label 'empty' if there are no bets
async function loadUserBets(skip, take){
    const bets = await BetService.getUserBets(skip, take);

    bets.forEach(bet => {
        const balanceBefore = bet.balanceAfter - bet.winningsMoney;
        addBetCard(bet.isWin, bet.winningsMoney, bet.game, balanceBefore, bet.balanceAfter, UIHelper.formatDate(bet.date));
    });
}

function addBetCard(isWin, winnings, gameName, balanceBefore, balanceAfter, date){
    const card = document.createElement('div');
    card.className = `bet-card ${isWin ? 'win' : 'lose'}`;
    card.innerHTML = `
        <p class="game-name">${gameName}</p>
        <p class="winnings">Your winnings: ${winnings} $</p>
        <p class="balance-after">Balance: ${balanceBefore}$ → ${balanceAfter} $</p>
        <p class="bet-date">Date: ${date}</p>
    `;
    document.getElementById('betHistory').appendChild(card);
    card.style.animationDelay = '0.1s';
}