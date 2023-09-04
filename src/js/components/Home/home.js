import { storage } from "../../utils/index.js"
import { logout } from "../Logout/index.js";

const $loginPage = document.querySelector(".login-page");
const $logoutBtn = document.querySelector(".logout-btn");
const $profilePage = document.querySelector(".profile-page");
const $signinPage = document.querySelector(".signin-page");
const $cartPage = document.querySelector(".cart-page");
const $productListPage = document.querySelector(".product-list-page");
const $homePage = document.querySelector(".home-page");
const $orderListPage = document.querySelector(".order-list-page");
const $productRegisterListPage = document.querySelector(".product-register-list-page");

function goToHome() {
    location.href = "../../../index.html"
}

function goToLogin() {
    location.href = "../../src/html/login.html"
}

function goToProductList() {
    location.href = "../../src/html/product_list.html"
}

function goToMypage() {
    location.href = "../../src/html/profile.html"
}

function goToSignIn() {
    location.href = "../../src/html/signin.html"
}

function goToCart() {
    location.href = "../../src/html/cart.html"
}

function goToMyOrder() {
    location.href = "../../src/html/order_state.html"
}

function goToMyProductRegister() {
    location.href = "../../src/html/sale_product.html"
}

// index.html page인지 체크
if ($profilePage) {
    $orderListPage.parentElement.classList.add("disabled");
    $productRegisterListPage.parentElement.classList.add("disabled");

    // 로그인 한 상태
    if (storage.getSessionStorage("token")) {
        const member = storage.getSessionStorage("member");
        // 비활성화
        $loginPage.parentElement.classList.add("disabled");
        $signinPage.parentElement.classList.add("disabled");

        // 활성화
        $logoutBtn.parentElement.classList.remove("disabled");
        $profilePage.parentElement.classList.remove("disabled");
        if (member === "buyer") {
            $cartPage.classList.remove("disabled");
            $orderListPage.parentElement.classList.remove("disabled");
        }
        else {
            $cartPage.classList.add("disabled");
            $productRegisterListPage.parentElement.classList.remove("disabled");
        }
    }
    else {
        // 비활성화
        $logoutBtn.parentElement.classList.add("disabled");
        $profilePage.parentElement.classList.add("disabled");
        $cartPage.classList.add("disabled");

        // 활성화
        $loginPage.parentElement.classList.remove("disabled");
        $signinPage.parentElement.classList.remove("disabled");
    }

    $productListPage.addEventListener("click", goToProductList);
    $loginPage.addEventListener("click", goToLogin);
    $signinPage.addEventListener("click", goToSignIn);
    $logoutBtn.addEventListener("click", logout.logout);
    $profilePage.addEventListener("click", goToMypage);
    $cartPage.addEventListener("click", goToCart);
    $homePage.addEventListener("click", goToHome);
    $orderListPage.addEventListener("click", goToMyOrder);
    $productRegisterListPage.addEventListener("click", goToMyProductRegister);
}

export { goToHome, goToLogin }