import { UIHelper } from "./UIHelper.js";

export class BetService{

    static async recordBet(betDto){
        const response = await fetch("https://localhost:7181/api/bets", {
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
        
    }
}

//get 10 bets method