import { Validator } from "../validator.js";
import { BalanceService } from "../balanceService.js";
import { UIHelper } from "../UIHelper.js";

export class GuessNumber{
    #balanceService

    constructor(){
        this.guessNumberBetInput = UIHelper.getElement("guessNumberBet");
        this.guessNumberUserNumberInput = UIHelper.getElement("guessNumberUserNumber");
        this.guessNumberWinOrLoseEl = UIHelper.getElement("guessNumberWinOrLoseLable");
        this.guessNumberWonValueEl = UIHelper.getElement("wonValueGuessNumber");

        this.#balanceService = new BalanceService();
    }
    
    async playGuessNumberGame(){
        const userBalance = await this.#balanceService.getUserBalance();
        const isBetValid = await Validator.validateUserBet(this.guessNumberBetInput, userBalance);
        if (!isBetValid)
            return;
        const userBet = parseFloat(this.guessNumberBetInput.value);
        const userNumber = parseFloat(this.guessNumberUserNumberInput.value);
        if(isNaN(userNumber) || userNumber > 10 || userNumber < 1){
            UIHelper.showMessage("Please enter a number between 1 and 10", "error"); //TODO: Add success/error messanges
            return;
        }

        const randomNumber = Math.floor(Math.random() * 10) + 1;
        document.getElementById("guessNumberResults").style.display = "block";
        if(randomNumber === userNumber){
            this.guessNumberWinOrLoseEl.textContent = "You win!";
            this.guessNumberWinOrLoseEl.classList.remove("lose");
            this.guessNumberWinOrLoseEl.classList.add("win");
            this.guessNumberWonValueEl.textContent = userBet * 10;
            await this.#balanceService.changeBalance(userBet * 10);
        }
        else{
            this.guessNumberWinOrLoseEl.textContent = "You lost. Correct number was " + randomNumber;
            this.guessNumberWinOrLoseEl.classList.remove("win");
            this.guessNumberWinOrLoseEl.classList.add("lose");
            this.guessNumberWonValueEl.textContent = "-" + userBet;
            await this.#balanceService.changeBalance(-userBet);
        }
    }
}
