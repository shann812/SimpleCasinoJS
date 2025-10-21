import { UIHelper } from "./UIHelper.js";

export class AccountService{

    static async registUser(user){
        try{
            const response = await fetch("https://localhost:7181/api/users/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user)
            });
    
            const result = await response.json();
    
            if(!response.ok || !result.success){
                if (Array.isArray(result.errors)) {
                    result.errors.forEach(err => UIHelper.showMessage(err, "error"));
                } else {
                    UIHelper.showMessage("Unknown error occurred (frontend)", "error");
                }
                return;
            }

            await AccountService.loginUser({
                email: user.email,
                password: user.password
            });
            UIHelper.showMessage(result.data ?? "Account created successfully", "success");
            window.location.href = "index.html";
        }
        catch(ex){
            UIHelper.showMessage("Network error", "error");
            console.error(err);     
        }
    }

    static async loginUser(userLogin){
        try{
            const response = await fetch("https://localhost:7181/api/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userLogin)
            });
            if(!response.ok){
                const jsonErrors = await response.json();

                if (Array.isArray(jsonErrors.errors)) {
                    jsonErrors.errors.forEach(err => UIHelper.showMessage(err, "error"));
                } else {
                    UIHelper.showMessage("Unknown error occurred (frontend)", "error");
                }
            }
            else{
                const data = await response.json();

                localStorage.setItem("token", data.token);
                localStorage.setItem("username", data.username);
                localStorage.setItem("role", data.role);

                //TODO: fix toasts
                UIHelper.showMessage("Logged in successfully", "success");
                window.location.href = "index.html";
            }
        }
        catch(err){
            UIHelper.showMessage("Network error", "error");
            console.error(err);
        }
    }

    static async logoutUser(){
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("role");
        location.reload();
    }

    static isUserLogin(){
        const token = localStorage.getItem("token");
        const username = localStorage.getItem("username");
        return token && username;
    }

    static async getUserInfo(){
        const response = await fetch("https://localhost:7181/api/users/me", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        });

        const result = await response.json();
        if(!response.ok || !result.success){
            //go to index and show errors
            //TODO: make function in UIHelper to show all message in result
        }

        //TODO: refactor message to data (OperationResult)
        const userInfo = {
            username: result.message.username,
            email: result.message.email,
            balance: result.message.balance,
            regDate: result.message.registrationDate
        }

        return userInfo;
    }
}