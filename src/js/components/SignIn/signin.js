import { API } from "../../utils/index.js";
import { URL } from "../../data/index.js";
import { home } from "../Home/index.js";

const $signinForm = document.querySelector(".signin-form")
const $signinBtn = document.querySelector("#signin-btn");

async function signin(event) {
    event.preventDefault();

    const selectedRole = $signinForm.querySelector("input[name='role']:checked");
    const selectedValue = selectedRole.value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password1").value;
    const password2 = document.getElementById("password2").value;
    const data = {
        email: email,
        password: password
    };
    
    try {
        let url = URL.buyerSignInURL;
        
        if (selectedValue === "seller") {
            url = URL.sellerSignInURL;
        }

        const ans = await API.apiPost(url, data);
        const message = ans["message"];

        if (message) {
            home.goToLogin();
        }
        else {
            alert("회원가입 실패");
        }
    } catch (err) {
      console.log(err);
    }
}

$signinBtn.addEventListener("click", signin)