import { UIHelper } from "./UIHelper.js";

export class BalanceService{
    constructor(){
        this.balanceEl = UIHelper.getElement("balance");
        this.depositMoneyInput = UIHelper.getElement("depositMoneySum");
    }

    getUserBalance(){
        return parseFloat(this.balanceEl.textContent);
    }

    addMoneyToBalance(value){
        this.balanceEl.textContent = this.getUserBalance() + value;
    }

    deductMoneyFromBalance(value){
        this.balanceEl.textContent = this.getUserBalance() - value;
    }

    depositMoneyOnBalance(){
        const depositValue = parseFloat(this.depositMoneyInput.value);

        if(depositValue <= 0 || isNaN(depositValue)){
            alert("Enter correct deposit sum");
            return;
        }

        this.addMoneyToBalance(depositValue);
        this.depositMoneyInput.value = "";
        //TODO: add a deposit sucssess message in events in main.js
    }
}