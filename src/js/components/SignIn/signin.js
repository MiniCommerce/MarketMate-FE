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
    const number = document.getElementById("number").value;
    const address = document.getElementById("address").value;
    const name = document.getElementById("name").value;
    const password = document.getElementById("password1").value;
    const password2 = document.getElementById("password2").value;
    
    try {
        let data;
        let passwordMismatch = false;

        if (selectedValue === "buyer") {
            data = {
                email: email,
                password: password,
                number: number,
                nickname: name,
                shipping_address: address,
            };
        } else if (selectedValue === "seller") {
            data = {
                email: email,
                password: password,
                number: number,
                store_name: name,
                shipping_place: address,
            };
        }

        if (password !== password2) {
            passwordMismatch = true;
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        let url = URL.buyerSignInURL;

        if (selectedValue === "seller") {
            url = URL.sellerSignInURL;
        }

        if (!passwordMismatch) {
            const ans = await API.apiPost(url, data);
            const message = ans["message"];

            if (message) {
                home.goToLogin();
            } else {
                alert("회원가입 실패");
            }
        }
    } catch (err) {
        console.log(err);
    }
}

$signinBtn.addEventListener("click", signin);


$signinBtn.addEventListener("click", signin)