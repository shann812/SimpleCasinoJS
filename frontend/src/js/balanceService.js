import { UIHelper } from "./UIHelper.js";

export class BalanceService{

    constructor(){
        this.balanceEl = UIHelper.getElement("balance");
        this.depositMoneyInput = UIHelper.getElement("depositMoneySum");

        if(this.#isSessionExist()){
            this.#updateUI();
        }
        else{
            sessionStorage.setItem("userBalance", parseFloat(this.balanceEl.textContent));
        }
    }

    getUserBalance(){
        return parseFloat(sessionStorage.getItem("userBalance"));
    }

    addMoneyToBalance(value){
        sessionStorage.setItem("userBalance", this.getUserBalance() + value);
        this.#updateUI();
    }

    deductMoneyFromBalance(value){
        sessionStorage.setItem("userBalance", this.getUserBalance() - value);
        this.#updateUI();
    }

    depositMoneyOnBalance(){
        const depositValue = parseFloat(this.depositMoneyInput.value);

        if(depositValue <= 0 || isNaN(depositValue)){
            const message = "Enter correct deposit sum";
            UIHelper.showMessage(message, "error");
            return;
        }

        this.addMoneyToBalance(depositValue);
        this.depositMoneyInput.value = "";

        const message = "Your balance succesfully replenished by " + depositValue;
        UIHelper.showMessage(message, "success");
    }

    #updateUI(){
        this.balanceEl.textContent = sessionStorage.getItem("userBalance");
    }

    #isSessionExist(){
        const userBalance = sessionStorage.getItem("userBalance");
        return userBalance !== null;
    }
}