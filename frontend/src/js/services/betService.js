import { UIHelper } from "../UIHelper.js";
import { BalanceService } from "./balanceService.js";

export class BetService{

    static async placeBet(betDto){
        const response = await fetch("https://localhost:7181/api/bets/place", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json"
            },
            body: JSON.stringify(betDto)
        });

        const result = await response.json();
        if(!response.ok || !result.success){
            UIHelper.showErrors(result);
            return;
        }

        //for balance update, i can return newBalance from server to update it and don`t call getBalance 2nd time
        const _balanceService = new BalanceService();
    }

    static async getUserBets(skip, take){
        const response = await fetch(`https://localhost:7181/api/bets/my?skip=${skip}&take=${take}`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json"
            },
        });

        const result = await response.json();
        if(!response.ok || !result.success){
            UIHelper.showErrors(result);
            return;
        }

        return result.data;
    }
}
