import { apiAuthGet } from "../../utils/fetchAPI.js";
import { URL } from "../../data/index.js";
import { getSessionStorage, setSessionStorage } from '../../utils/storage.js';
import { storage } from "../../utils/index.js";

const $updateBtn = document.querySelector("#update-btn");
const $pwdUpdateBtn = document.querySelector("#pwd-update-btn");
const $deleteBtn = document.querySelector("#delete-btn");

const member = storage.getSessionStorage("member");

async function fetchUserRole(event) {
    event.preventDefault();

    try {
        const token = getSessionStorage("token");

        if (member === "buyer") {
            const data = await apiAuthGet(URL.buyerUpdateURL, token);
            const nicknameField = document.getElementById("nickname");
            const numberField = document.getElementById("number");
            const shippingAddressField = document.getElementById("shipping_address");

            nicknameField.value = data.nickname;
            numberField.value = data.number;
            shippingAddressField.value = data.shipping_address;

        }
        else {
            const data = await apiAuthGet(URL.sellerUpdateURL, token);
            const storenameField = document.getElementById("nickname");
            const numberField = document.getElementById("number");
            const shippingPlaceField = document.getElementById("shipping_address");

            storenameField.value = data.store_name;
            numberField.value = data.number;
            shippingPlaceField.value = data.shipping_place;
        }
    
    } catch (err) {
        console.log(err);
    }
}

window.addEventListener("load", fetchUserRole);
$updateBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (member === "buyer") {
        location.href = "profile_update.html";
    } else {
        location.href = "seller_profile_update.html";
    }
});
$pwdUpdateBtn.addEventListener("click", (e) => {
    e.preventDefault();

    location.href = "change_pw.html";
});
$deleteBtn.addEventListener("click", (e) => {
    e.preventDefault();

    location.href = "user_delete.html";
})