import { UIHelper } from "./UIHelper";
import { Validator } from "./validator";
import { ToastManager } from "./toastManager.js";
ToastManager.init();

const registrationForm = UIHelper.getElement("registrationForm");

window.addEventListener("showToastMessage", (e) => {
    const { message, type } = e.detail;
    showToast(message, type);
});

registrationForm.addEventListener("submit", function(e) {
    e.preventDefault();

    var user = {
        email: UIHelper.getElement("email").value,
        userName: UIHelper.getElement("userName").value,
        password: UIHelper.getElement("password").value,
        passwordRepeat: UIHelper.getElement("passwordRepeat").value
    }

    if(Validator.validateUserRegistration(user)){
        //TODO: logic
    };
})