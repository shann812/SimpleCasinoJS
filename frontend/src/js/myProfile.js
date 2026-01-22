import { UIHelper } from "./UIHelper.js";
import { ToastManager } from "./toastManager.js";
import { AccountService } from "./Services/accountService.js";
ToastManager.init();

const username = UIHelper.getElement("username");
const email = UIHelper.getElement("email");
const balance = UIHelper.getElement("balance");
const regDate = UIHelper.getElement("regDate");

const withdrawBtn = UIHelper.getElement("withdrawBtn");

document.addEventListener("DOMContentLoaded", async () => {
    await loadUserInfo();

    //TODO: fix 401 if user login some time ago
});

async function loadUserInfo(){
    const userInfo = await AccountService.getUserInfo();
    username.textContent = userInfo.username;
    email.textContent = userInfo.email;
    balance.textContent = userInfo.balance;

    //TODO: fix the date output
    regDate.textContent = userInfo.regDate;

    loadUserBets(userInfo.lastTenBets);
}

function loadUserBets(lastTenBets){
    lastTenBets.array.forEach(bet => {
        addBetCard(bet.isWin, bet.winnings, bet.gameName, bet.balanceAfter, bet.date);
    });
}

function addBetCard(isWin, winnings, gameName, balanceAfter, date){
    const card = document.createElement('div');
    card.className = `bet-card ${isWin ? 'win' : 'lose'}`;
    card.innerHTML = `
        <p class="game-name">${gameName}</p>
        <p class="winnings">Your winnings: ${winnings} $</p>
        <p class="bet-date">Date: ${betDate}</p>
        <p class="balance-after">Balance after: ${balanceAfterBet} $</p>
    `;
    document.getElementById('betHistory').appendChild(card);
    card.style.animationDelay = '0.1s';
}