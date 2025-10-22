export class BetDto {
  constructor({ result, betPrice, winnings, game }) {
    this.result = result;
    this.betPrice = betPrice;
    this.winnings = winnings;
    this.game = game;
  }
}