import { apiAuthGet } from "../../utils/fetchAPI.js";
import { URL } from "../../data/index.js";
import { getSessionStorage, setSessionStorage } from '../../utils/storage.js';

const $updateBtn = document.querySelector("#update-btn");
const $pwdUpdateBtn = document.querySelector("#pwd-update-btn");
const $deleteBtn = document.querySelector("#delete-btn");

const $buyerprofile = document.querySelector(".buyer-profile");
const $sellerprofile = document.querySelector(".seller-profile");

async function fetchUserRole(event) {
    event.preventDefault();

    try {
        const token = getSessionStorage("token"); 
        const response = await apiAuthGet(URL.userDiscriminationURL, token); 

        if (response.message === '판매자') {
            $buyerprofile.style.display = "none";
            $sellerprofile.style.display = "block";
            setSessionStorage("type", "판매자");
        } else if (response.message === '구매자') {
            $buyerprofile.style.display = "block";
            $sellerprofile.style.display = "none";
            setSessionStorage("type", "구매자");
        }
    } catch (err) {
        console.log(err);
    }
}

window.addEventListener("load", fetchUserRole);
$updateBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (getSessionStorage("type") === "구매자") {
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