import { UIHelper } from "./UIHelper.js";
import { ToastManager } from "./toastManager.js";
ToastManager.init();

const username = UIHelper.getElement("username");
const email = UIHelper.getElement("email");
const balance = UIHelper.getElement("balance");
const regDate = UIHelper.getElement("regDate");

const withdrawBtn = UIHelper.getElement("withdrawBtn");