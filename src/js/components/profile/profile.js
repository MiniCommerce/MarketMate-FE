import { apiAuthGet } from "../../utils/fetchAPI.js";
import { URL } from "../../data/index.js";
import { getSessionStorage } from '../../utils/storage.js';

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
        } else if (response.message === '구매자') {
            $buyerprofile.style.display = "block";
            $sellerprofile.style.display = "none";
        }
    } catch (err) {
        console.log(err);
    }
}

window.addEventListener("load", fetchUserRole);