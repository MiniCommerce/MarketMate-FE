import { apiAuthGet, apiAuthPut } from '../../utils/fetchAPI.js';
import { URL } from '../../data/index.js';
import { getSessionStorage, setSessionStorage } from '../../utils/storage.js';

const $sellerupdatebtn = document.querySelector("#seller-update-btn");

async function fetchData() {
    try {
        const token = getSessionStorage("token");

        const data = await apiAuthGet(URL.sellerUpdateURL, token);
        const storenameField = document.getElementById("store_name");
        const numberField = document.getElementById("number");
        const shippingPlaceField = document.getElementById("shipping_place");

        storenameField.value = data.store_name;
        numberField.value = data.number;
        shippingPlaceField.value = data.shipping_place;

    } catch (err) {
        console.log(err);
    }
}

async function sellerupdate(event) {
    event.preventDefault();

    try {
        const token = getSessionStorage("token");
        const storenameField = document.getElementById("store_name");
        const numberField = document.getElementById("number");
        const shippingPlaceField = document.getElementById("shipping_place");

        const response = await apiAuthPut(URL.sellerUpdateURL, {
            store_name: storenameField.value,
            number: numberField.value,
            shipping_place: shippingPlaceField.value
        }, token);

        if (response.token) {
            setSessionStorage("token", response.token);
        }
        alert("회원정보 수정에 성공했습니다.")
        location.reload();

    } catch (err) {
        console.log(err);
    }
}

window.addEventListener("load", fetchData);

$sellerupdatebtn.addEventListener("click", sellerupdate);