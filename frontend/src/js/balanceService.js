import { UIHelper } from "./UIHelper.js";

export class BalanceService{

    constructor(){
        this.balanceEl = UIHelper.getElement("balance");
        this.depositMoneyInput = UIHelper.getElement("depositMoneySum");

        if(this.#isSessionExist()){
            this.updateUI();
        }
        else{
            //TODO: please login or create account message
        }
    }

    async getUserBalance(){
        const response = await fetch("https://localhost:7181/api/balance", {
            method: "GET",
            headers: { 
                "Authorization": "Bearer " + localStorage.getItem("token") 
            }
        });

        const result = await response.json();

        if(!response.ok || !result.success){
            console.log("нашло ошибку" + "respo" + result.errors[0]);
            if (Array.isArray(result.errors)) {
                result.errors.forEach(err => UIHelper.showMessage(err, "error"));
            } else {
                UIHelper.showMessage("Unknown error occurred (frontend)", "error");
            }
            return;
        }

        return Number(result.message);
    }

    async changeBalance(amount){
        const response = await fetch("https://localhost:7181/api/balance/change", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token") 
            },
            body: JSON.stringify({ amount })
        });

        const result = await response.json();
        if(!response.ok || !result.success){ //TODO: separete this block to another method in UIHelper
            if (Array.isArray(result.errors)) {
                result.errors.forEach(err => UIHelper.showMessage(err, "error"));
            } else {
                UIHelper.showMessage("Unknown error occurred (frontend)", "error");
            }
            return;
        }

        await this.updateUI();
    }

    depositMoneyOnBalance(){
        const depositValue = parseFloat(this.depositMoneyInput.value);

        if(depositValue <= 0 || isNaN(depositValue)){
            const message = "Enter correct deposit sum";
            UIHelper.showMessage(message, "error");
            return;
        }

        this.changeBalance(depositValue);
        this.depositMoneyInput.value = "";

        const message = "Your balance succesfully replenished by " + depositValue;
        UIHelper.showMessage(message, "success");
    }

    async updateUI(){
        const balance = await this.getUserBalance();
        this.balanceEl.textContent = balance;
    }

    #isSessionExist(){ //chzh
        const userBalance = sessionStorage.getItem("userBalance");
        return userBalance !== null;
    }
}