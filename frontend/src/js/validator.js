import { BalanceService } from "./balanceService.js";
import { UIHelper } from "./UIHelper.js";

export class Validator{
    static validateUserBet(betInput){
        const userBet = parseFloat(betInput.value);
        if(isNaN(userBet) || userBet <= 0){
            UIHelper.showMessage("Enter correct bet value", "error");
            return false;
        }
        
        const userBalance = this.getUserBalance();
        if(userBet > this.getUserBalance()){
            UIHelper.showMessage("Your bet exceeds your balance.", "error");
            return false;
        }

        return true;
    }

    //TODO: this is trashcode
    static getUserBalance(){
        const _balanceService = new BalanceService();
        return _balanceService.getUserBalance();
    }
}