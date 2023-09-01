import { API, storage } from "../../utils/index.js"
import { URL } from "../../data/index.js";
import { home } from "../Home/index.js";

async function logout(event) {
    event.preventDefault();

    try {
        const token = storage.getSessionStorage("token");
        const response = await API.apiAuthGet(URL.logoutURL, token);
        
        if (response.status === 200) {
            storage.removeSessionStorage("token");
            storage.removeSessionStorage("user_id");
            storage.removeSessionStorage("member");
            home.goToHome();
        } else {
            alert("로그아웃 실패");
        }
    } catch (err) {
        console.log(err);
    }
}

export { logout }