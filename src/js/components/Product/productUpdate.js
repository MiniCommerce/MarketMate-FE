import { apiAuthGet, apiAuthPatch } from '../../utils/fetchAPI.js';
import { URL } from '../../data/index.js';
import { getSessionStorage } from '../../utils/storage.js';


const $updatebtn = document.querySelector("#update-btn");

async function fetchData() {
    try {
        const token = getSessionStorage("token");

        const data = await apiAuthGet(URL.productUpdateURL, token);
        const category = document.getElementById("category");
        const name = document.getElementById("name");
        const price = document.getElementById("price");
        const amount = document.getElementById("amount");
        const desc = document.getElementById("desc");
        const status = document.getElementById("status");

        category.value = data.category;
        name.value = data.product_name;
        price.value = data.price;
        amount.value = data.amount;
        desc.value = data.desc;
        status.value = data.status;

    } catch (err) {
        console.log(err);
    }
}


async function update(event) {
    event.preventDefault();

    try {
        const token = getSessionStorage("token");
        const category = document.getElementById("category");
        const name = document.getElementById("name");
        const price = document.getElementById("price");
        const amount = document.getElementById("amount");
        const desc = document.getElementById("desc");
        const status = document.getElementById("status");

        const response = await apiAuthPatch(URL.productUpdateURL, {
            category: category.value,
            product_name: name.value,
            price: price.value,
            amount: amount.value,
            desc: desc.value,
            status: status.value,
            product_id: product_id
        }, token);

        if (response.status == 200) {
            alert("수정 완료")
        }

    } catch (err) {
        console.log(err);
    }
}

window.addEventListener("load", fetchData);

$updatebtn.addEventListener("click", update);
