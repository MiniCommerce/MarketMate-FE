import { API, storage } from "../../utils/index.js"
import { URL } from "../../data/index.js";
import { home } from "../Home/index.js";

async function logout(event) {
    event.preventDefault();

    try {
        const token = storage.getSessionStorage("token");
        const ans = await API.apiAuthGet(URL.logoutURL, token);
        const status = ans["status"];
        
        if (status === 200) {
            storage.removeSessionStorage("token");
            home.goToHome();
        }
        else {
            alert("로그아웃 실패");
        }
    } catch (err) {
      console.log(err);
    }
}

export { logout }