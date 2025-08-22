import { BalanceService } from "./balanceService.js";

export class Validator{
    static validateUserBet(betInput){
        const userBet = parseFloat(betInput.value);
        if(isNaN(userBet) || userBet <= 0){
            alert("Enter correct bet value");
            return false;
        }
        
        const userBalance = this.getUserBalance();
        if(userBet > this.getUserBalance()){
            //TODO: change this to new notification system (sounds cool)
            alert("Your bet exceeds your balance.");
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