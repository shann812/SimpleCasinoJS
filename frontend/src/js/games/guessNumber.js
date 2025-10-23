import { Validator } from "../validator.js";
import { BalanceService } from "../Services/balanceService.js";
import { UIHelper } from "../UIHelper.js";
import { BetService } from "../Services/betService.js";
import { BetDto } from "../betDto.js";

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

            const winnings = userBet * 10;
            this.guessNumberWonValueEl.textContent = winnings;
            await this.#placeBet(true, userBet, winnings);
        }
        else{
            this.guessNumberWinOrLoseEl.textContent = "You lost. Correct number was " + randomNumber;
            this.guessNumberWinOrLoseEl.classList.remove("win");
            this.guessNumberWinOrLoseEl.classList.add("lose");

            const winnings = -userBet;
            this.guessNumberWonValueEl.textContent = winnings;
            await this.#placeBet(false, userBet, winnings);
        }
    }

    async #placeBet(isWin, userBet, winnings){
        const bet = new BetDto({
            isWin: isWin,
            betPrice: userBet,
            winnings: winnings,
            game: "guessNumber"
        });
    
        await BetService.placeBet(bet);
    }
}
