import { API, storage } from "../../utils/index.js";
import { URL } from "../../data/index.js";
import { home } from "../Home/index.js";

const $loginBtn = document.querySelector("#submit-btn");

async function login(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const data = {
        email: email,
        password: password
    };
    
    try {
        const ans = await API.apiPost(URL.loginURL, data);
        const token = ans["token"];

        if (token) {
            storage.setSessionStorage("token", token);
            storage.setSessionStorage("user_id", ans["user_id"]);
            storage.setSessionStorage("member", ans["member"]);
            home.goToHome();
        }
        else {
            alert("로그인 실패");
        }
    } catch (err) {
      console.log(err);
    }
}

$loginBtn.addEventListener("click", login)