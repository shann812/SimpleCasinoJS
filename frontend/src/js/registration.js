import { UIHelper } from "./UIHelper.js";
import { Validator } from "./validator.js";
import { ToastManager } from "./toastManager.js";
ToastManager.init();

const registrationForm = UIHelper.getElement("registrationForm");

registrationForm.addEventListener("submit", async function(e) {
    e.preventDefault();

    var user = {
        email: UIHelper.getElement("email").value,
        userName: UIHelper.getElement("userName").value,
        password: UIHelper.getElement("password").value,
        passwordRepeat: UIHelper.getElement("passwordRepeat").value
    }

    if(Validator.validateUserRegistration(user)){
        await registUser(user);
    };
})

async function registUser(user){
    const result = await fetch("https://localhost:7181/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
    });
    if(!result.ok){
        const jsonErrors = await result.json();

        if (Array.isArray(jsonErrors.errors)) {
            jsonErrors.errors.forEach(err => UIHelper.showMessage(err, "error"));
        } else {
            UIHelper.showMessage("Unknown error occurred (frontend)", "error");
        }
    }
    else{
        //TODO: start session (generate JWT token)
        //TODO: this is doesnt work, must show toast in main page
        window.location.href = "index.html";
        UIHelper.showMessage("Account created succsessfully", "success");
    }
}