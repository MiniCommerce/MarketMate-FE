import { apiAuthGet, apiAuthPut } from '../../utils/fetchAPI.js';
import { URL } from '../../data/index.js';
import { getSessionStorage } from '../../utils/storage.js';

const $updatebtn = document.querySelector("#update-btn");


async function fetchData() {
    try {
        const token = getSessionStorage("token");

        const data = await apiAuthGet(URL.buyerUpdateURL, token);
        const nicknameField = document.getElementById("nickname");
        const numberField = document.getElementById("number");
        const shippingAddressField = document.getElementById("shipping_address");

        nicknameField.value = data.nickname;
        numberField.value = data.number;
        shippingAddressField.value = data.shipping_address;

    } catch (err) {
        console.log(err);
    }
}


async function update(event) {
    event.preventDefault();

    try {
        const token = getSessionStorage("token");
        const nicknameField = document.getElementById("nickname");
        const numberField = document.getElementById("number");
        const shippingAddressField = document.getElementById("shipping_address");

        await apiAuthPut(URL.buyerUpdateURL, {
            nickname: nicknameField.value,
            number: numberField.value,
            shipping_address: shippingAddressField.value
        }, token);

    } catch (err) {
        console.log(err);
    }
}


window.addEventListener("load", fetchData);


$updatebtn.addEventListener("click", update);