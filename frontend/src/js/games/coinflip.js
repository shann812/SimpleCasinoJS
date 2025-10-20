import { Validator } from "../validator.js";
import { BalanceService } from "../balanceService.js";
import { UIHelper } from "../UIHelper.js";

export class Coinflip{
    #balanceService

    constructor(){
        this.coinflipSection = UIHelper.getElement("coinflipGame");
        this.coinflipBetInput = UIHelper.getElement("coinflipBet")
        this.coinflipWinOrLoseEl = UIHelper.getElement("coinflipWinOrLoseLable");
        this.coinflipWonValueEl = UIHelper.getElement("wonValueCoinflip");
        
        this.#balanceService = new BalanceService();
    }

    async playCoinflip(choosenSide){
        const userBalance = await this.#balanceService.getUserBalance();
        const isBetValid = await Validator.validateUserBet(this.coinflipBetInput, userBalance);
        if (!isBetValid)
            return;
        const userBet = parseFloat(this.coinflipBetInput.value);

        const randomNumber = Math.round(Math.random());
        document.getElementById("coinflipResults").style.display = "block";
        if((randomNumber === 0 && choosenSide == "heads") || (randomNumber === 1 && choosenSide == "tails")){
            this.coinflipWinOrLoseEl.textContent = "You won!";
            this.coinflipWinOrLoseEl.classList.remove("lose");
            this.coinflipWinOrLoseEl.classList.add("win");
            this.coinflipWonValueEl.textContent = userBet;
            await this.#balanceService.changeBalance(userBet);
        }
        else{
            this.coinflipWinOrLoseEl.textContent = "You lose";
            this.coinflipWinOrLoseEl.classList.remove("win");
            this.coinflipWinOrLoseEl.classList.add("lose");
            this.coinflipWonValueEl.textContent = '-' + userBet;
            await this.#balanceService.changeBalance(-userBet);
        }
    }
}