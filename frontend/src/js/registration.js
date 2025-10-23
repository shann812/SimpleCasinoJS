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
        await AccountService.registUser(user);
    };
})