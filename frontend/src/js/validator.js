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

    static validateUserRegistration(user){
        if(user.userName.lenght < 4 || user.userName.lenght > 20){
            UIHelper.showMessage("User name must be 4-20 characters");
            return;
        }
            //password
        if(!user.email.includes("@")){
            UIHelper.showMessage("Please enter correct email");
            return;
        }

        if(user.password !== user.passwordRepeat){
            UIHelper.showMessage("Passwords do not match")
            return;
        }

        return true;
    }

    static validateUserLogin(loginUser){
        //TODO: validate email separate in another method
        if(!loginUser.email.includes("@")){
            UIHelper.showMessage("Please enter correct email");
            return;
        }
        
        return true;
    }

    //TODO: this is trashcode
    static getUserBalance(){
        const _balanceService = new BalanceService();
        return _balanceService.getUserBalance();
    }
}