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

    static showErrors(){
        
    }
}