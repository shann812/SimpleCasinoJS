export class BetDto {
    constructor({ isWin, betPrice, winnings, game }) {
        this.isWin = isWin;
        this.betPrice = betPrice;
        this.winnings = winnings;
        this.game = game;
    }
}