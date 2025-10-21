import { UIHelper } from "./UIHelper.js";
import { ToastManager } from "./toastManager.js";
import { AccountService } from "./AccountService.js";
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
}