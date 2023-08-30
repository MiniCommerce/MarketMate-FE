import { API } from "../../utils/index.js";
import { storage } from "../../utils/index.js";
import { URL } from "../../data/index.js";

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const productList = await API.apiGet(URL.productListURL);

        if (productList) {
            const list = document.getElementById("list");
            productList.forEach(product => {
                const listItem = document.createElement("li");
                const link = document.createElement("a");
                link.href = "product_detail.html";
                link.id = product.id;
                link.textContent = product.product_name;
                listItem.appendChild(link);
                list.appendChild(listItem);
            });
        }

    }
    catch (err) {
        alert(err);
        console.error(err);
    }
})
