import { UIHelper } from "./UIHelper.js";

export class Validator{

    static async validateUserBet(betInput, userBalance){
        const userBet = parseFloat(betInput.value);
        if(isNaN(userBet) || userBet <= 0){
            UIHelper.showMessage("Enter correct bet value", "error");
            return false;
        }
        
        if(userBet > userBalance){
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

        if(!user.email.includes("@")){
            UIHelper.showMessage("Please enter correct email");
            return;
        }

        if(user.password.lenght < 6){
            UIHelper.showMessage("Password must be at least 6 characters");
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
}