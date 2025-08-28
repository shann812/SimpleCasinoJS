export class ToastManager {
    static init() {
        window.addEventListener("showToastMessage", (e) => {
            const { message, type } = e.detail;
            ToastManager.showToast(message, type);
        });
    }

    static showToast(message, type = "info") {
        const container = document.getElementById("toast-container");
        if (!container) return;

        const toast = document.createElement("div");
        toast.className = `toast toast-${type}`;
        toast.textContent = message;

        container.appendChild(toast);

        setTimeout(() => {
            toast.remove();
        }, 2000);
    }
}