export class UIHelper{
    static getElement(id){
        return document.getElementById(id);
    }

    static showElement(id){
        const el = document.getElementById(id);
        el.style.display = "block"
    }

    static hideElement(id){
        const el = document.getElementById(id);
        el.style.display = "none"
    }

    static showMessage(message, type = "info") {
        const event = new CustomEvent("showToastMessage", {
            detail: { message, type }
        });
        window.dispatchEvent(event);
    }

    static showErrors(badResult){
        if (Array.isArray(badResult.errors)) {
            badResult.errors.forEach(err => UIHelper.showMessage(err, "error"));
        } else {
            UIHelper.showMessage("Unknown error occurred (frontend)", "error");
        }
    }

    static formatDate(rawDate){
        const date = new Date(rawDate);

        const formatted = new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false
        }).format(date);
        
        return formatted;
    }
}