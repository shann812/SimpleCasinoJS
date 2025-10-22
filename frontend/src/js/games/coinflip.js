import { Validator } from "../validator.js";
import { BalanceService } from "../balanceService.js";
import { UIHelper } from "../UIHelper.js";
import { BetDto } from "../betDto.js";

export class Coinflip{
    #balanceService

    constructor(){
        this.coinflipSection = UIHelper.getElement("coinflipGame");
        this.coinflipBetInput = UIHelper.getElement("coinflipBet")
        this.coinflipWinOrLoseEl = UIHelper.getElement("coinflipWinOrLoseLable");
        this.coinflipWonValueEl = UIHelper.getElement("wonValueCoinflip");

        this.game = "coinflip";
        
        this.#balanceService = new BalanceService();
    }

    //TODO: refactor this method
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

            const winnings = userBet;
            this.coinflipWonValueEl.textContent = winnings;

            const bet = new BetDto({
                isWin: true,
                betPrice: userBet,
                winnings: winnings,
                game: this.game
            });
            await this.#balanceService.changeBalance(winnings);
            // await BetService.addBet(true, userBet, winnings, "coinflip");
        }
        else{
            this.coinflipWinOrLoseEl.textContent = "You lose";
            this.coinflipWinOrLoseEl.classList.remove("win");
            this.coinflipWinOrLoseEl.classList.add("lose");

            const winnings = -userBet;
            this.coinflipWonValueEl.textContent = winnings;

            const bet = new BetDto({
                isWin: false,
                betPrice: userBet,
                winnings: winnings,
                game: this.game
            });
                
            await this.#balanceService.changeBalance(winnings);
            // await BetService.addBet(false, userBet, winnings, "coinflip");
        }
    }
}