import { storage } from "../../utils/index.js"
import { logout } from "../Logout/index.js";

const $loginPage = document.querySelector(".login-page");
const $logoutBtn = document.querySelector(".logout-btn");
const $profilePage = document.querySelector(".profile-page");
const $signinPage = document.querySelector(".signin-page");
const $cartPage = document.querySelector(".cart-page");

function goToHome() {
    location.href = "../../../index.html"
}

function goToLogin() {
    location.href = "../../src/html/login.html"
}

// index.html page인지 체크
if ($profilePage) {
    // 로그인 한 상태
    if (storage.getSessionStorage("token")) {
        // 비활성화
        $loginPage.classList.add("disabled");
        $signinPage.classList.add("disabled");

        // 활성화
        $logoutBtn.classList.remove("disabled");
        $profilePage.classList.remove("disabled");
        $cartPage.classList.remove("disabled");
    }
    else {
        // 비활성화
        $logoutBtn.classList.add("disabled");
        $profilePage.classList.add("disabled");
        $cartPage.classList.add("disabled");

        // 활성화
        $loginPage.classList.remove("disabled");
        $signinPage.classList.remove("disabled");
    }

    $logoutBtn.addEventListener("click", logout.logout)
}

export { goToHome, goToLogin }