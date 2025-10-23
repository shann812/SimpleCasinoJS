import { Validator } from "../validator.js";
import { BalanceService } from "../Services/balanceService.js";
import { UIHelper } from "../UIHelper.js";
import { BetDto } from "../betDto.js";
import { BetService } from "../Services/betService.js";

export class Coinflip{
    #balanceService

    constructor(){
        this.coinflipSection = UIHelper.getElement("coinflipGame");
        this.coinflipBetInput = UIHelper.getElement("coinflipBet")
        this.coinflipWinOrLoseEl = UIHelper.getElement("coinflipWinOrLoseLabel");
        this.coinflipWonValueEl = UIHelper.getElement("wonValueCoinflip");
        
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

            await this.#placeBet(true, userBet, winnings);
        }
        else{
            this.coinflipWinOrLoseEl.textContent = "You lose";
            this.coinflipWinOrLoseEl.classList.remove("win");
            this.coinflipWinOrLoseEl.classList.add("lose");

            const winnings = -userBet;
            this.coinflipWonValueEl.textContent = winnings;


            await this.#placeBet(false, userBet, winnings);
        }
    }

    async #placeBet(isWin, userBet, winnings){
        const bet = new BetDto({
            isWin: isWin,
            betPrice: userBet,
            winnings: winnings,
            game: "coinflip"
        });

        await BetService.placeBet(bet);
    }
}