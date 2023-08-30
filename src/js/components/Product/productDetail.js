import { API } from "../../utils/index.js";
import { storage } from "../../utils/index.js";
import { URL } from "../../data/index.js";


const $id = document.querySelector("#id");
const $name = document.querySelector("#name");
const $category = document.querySelector("#category");
const $price = document.querySelector("#price");
const $amount = document.querySelector("#amount");
const $desc = document.querySelector("#desc");
const $seller = document.querySelector("#seller");
const $quantity = document.querySelector("#quantity");

const $cartBtn = document.querySelector("#cart");
const $orderBtn = document.querySelector("#order");

const token = storage.getSessionStorage("token");

// HTML 문서 전체가 로드 되었을 때의 이벤트
async function productOnload() {
    try {
        // 상품 상세 내용 출력
        const res = await API.apiGet(`${URL.productDetailURL}?product_id=${storage.getSessionStorage("product_id")}`);

        if (res) {
            $id.innerText = res.id;
            $name.innerText = `품명: ${res.product_name}`;
            $category.innerText = `카테고리: ${res.category}`;
            $price.innerText = `가격: ${res.price}`;
            $amount.innerText = `재고: ${res.amount}`;
            $desc.innerText = `상품 설명: ${res.desc}`;
            $seller.innerText = `판매자: ${res.seller}`;
        }
    } catch (err) {
        alert(err);
    }
}

// 장바구니 추가
async function cartAdd() {
    try {
        const data = {
            product_id: parseInt($id.innerText),
            amount: parseInt($quantity.value)
        };

        const res = await API.apiAuthPost(URL.cartAddURL, data, token);
        if (res !== undefined) {
            alert("장바구니에 담았습니다!");
            location.href = "../../src/html/cart.html";
        } else {
            alert("에러가 발생했습니다.");
        }
    } catch (err) {
        alert(err);
    }
}

// 구매 버튼 클릭 시 이벤트
async function orderStart(event) {
    try {
        const data = {
            product_id: parseInt($id.innerText),
            quantity: parseInt($quantity.value)
        }

        if (data !== undefined) {
            const res = await API.apiAuthPost(URL.orderURL, data, token);
            console.log(res)
            storage.setSessionStorage("order_id", res.order.id);
            location.href = "../../src/html/order.html";
        } else {
            alert("에러가 발생했습니다. 다시 시도해 주세요.");
        }
    } catch (err) {
        alert(err);
    }
}

// 수정하기 버튼 클릭 시 이벤트
const $updateBtn = document.querySelector("#update");
async function goUpdate() {
    try {
        const data = {
            product_id: parseInt($id.innerText),
            quantity: parseInt($quantity.value)
        }

        if (data !== undefined) {
            const res = await API.apiAuthGet(URL.productUpdateURL, token);
            console.log(res)
            // storage.setSessionStorage("order_id", res.order.id);
            location.href = "../../src/html/product_update.html";
        } else {
            alert("에러가 발생했습니다. 다시 시도해 주세요.");
        }
    } catch (err) {
        alert(err);
    }
}

// HTML 문서 전체가 로드 되었을 때 이벤트 등록
document.addEventListener("DOMContentLoaded", productOnload);
// 장바구니 버튼 이벤트 등록
$cartBtn.addEventListener("click", cartAdd);
// 결제 버튼 이벤트 등록
$orderBtn.addEventListener("click", orderStart);
// 수정하기 버튼 이벤트 등록
$updateBtn.addEventListener("click", goUpdate);