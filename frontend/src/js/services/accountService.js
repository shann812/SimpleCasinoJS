import { UIHelper } from "../UIHelper.js";

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
                UIHelper.showErrors(result);
                return;
            }

            await AccountService.loginUser({
                email: user.email,
                password: user.password
            });
            UIHelper.showMessage(result.data ?? "Account created successfully", "success");
            setTimeout(() => {
                window.location.href = "index.html";
            }, 1000);
        }
        catch(ex){
            UIHelper.showMessage(ex, "error");
            console.error(ex);     
        }
    }

    static async loginUser(userLogin){
        try{
            const response = await fetch("https://localhost:7181/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userLogin)
            });

            const result = await response.json();
            if(!response.ok || !result.success)
                UIHelper.showErrors(result);
            else{
                localStorage.setItem("token", result.data.token);
                localStorage.setItem("username", result.data.username);
                localStorage.setItem("role", result.data.role);

                UIHelper.showMessage("Logged in successfully", "success");
                setTimeout(() => {
                    window.location.href = "index.html";
                }, 1000);
            }
        }
        catch(ex){
            UIHelper.showMessage("Network error", "error");
            console.error(ex);
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
            localStorage.setItem("toastMessage", result.error);
            localStorage.setItem("toastType", "error");
            window.location.href = "index.html";
        }

        const userInfoResult = result.data;
        const userInfo = {
            username: userInfoResult.username,
            email: userInfoResult.email,
            balance: userInfoResult.balance,
            regDate: UIHelper.formatDate(userInfoResult.registrationDate),
        }

        return userInfo;
    }
}