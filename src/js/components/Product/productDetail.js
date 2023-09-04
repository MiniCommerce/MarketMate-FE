import { API } from "../../utils/index.js";
import { storage } from "../../utils/index.js";
import { URL } from "../../data/index.js";
import { question } from "../Question/index.js";
import { review} from "../Review/index.js";
import { goToLogin } from "../Home/home.js";

const $id = document.querySelector("#id");
const $name = document.querySelector("#name");
const $category = document.querySelector("#category");
const $price = document.querySelector("#price");
const $amount = document.querySelector("#amount");
const $desc = document.querySelector("#desc");
const $seller = document.querySelector("#seller");
const $quantity = document.querySelector("#quantity");
const $score = document.querySelector("#score")

const $cartBtn = document.querySelector("#cart");
const $orderBtn = document.querySelector("#order");
const $questionBtn = document.querySelector("#question-btn");
const $questionWriteBtn = document.querySelector("#question-write-btn");
const $imageList = document.querySelector(".image-list");
const $questionTextArea = document.querySelector(".write-quetion");

const $reviewbtn = document.querySelector("#review-btn")
const $writeBtn = document.querySelector("#review-write-btn")

const token = storage.getSessionStorage("token");
const product_id = storage.getSessionStorage("product_id");
const user_id = storage.getSessionStorage("user_id");
const member = storage.getSessionStorage("member");

// HTML 문서 전체가 로드 되었을 때의 이벤트
async function productOnload() {
    try {
        // 상품 상세 내용 출력

        const url = `${URL.productDetailURL}?product_id=${product_id}`;
        const res = await API.apiGet(url);

        if (res) {
            const images = res["images"];

            for (let i = 0; i < images.length; i++) {
                const $li = document.createElement("li"); // li 요소 생성
                const $img = document.createElement("img");
                $img.setAttribute("src", images[i].image);

                $li.appendChild($img); // img를 li의 자식으로 추가
                $imageList.append($li);
            }

            $id.innerText = res.id;
            $name.innerText = `${res.product_name}`;
            $category.innerText = `카테고리: ${res.category}`;
            $price.innerText = `${res.price}won`;
            $score.innerText = `평점: ${res.score}`;
            $amount.innerText = `재고: ${res.amount}`;
            $desc.innerText = `${res.desc}`;
            $seller.innerText = `판매자: ${res.store_name}`;
            question.set_seller_id(res.seller);
        }
    } catch (err) {
        alert(err);
    }
}

// 장바구니 추가
async function cartAdd() {
    // 비로그인 유저
    if (!(user_id)) {
        goToLogin();
        return;
    }

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
    // 비로그인 유저
    if (!(user_id)) {
        goToLogin();
        return;
    }

    try {
        const data = {
            product_id: parseInt($id.innerText),
            quantity: parseInt($quantity.value)
        }

        if (data !== undefined) {
            const res = await API.apiAuthPost(URL.orderURL, data, token);
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
// 문의조회
$questionBtn.addEventListener("click", function () {
    question.get_question_list(product_id);
    document.querySelector(".card-body").style.display = "none"; 
    document.querySelector(".review-container").style.display = "none";
    document.querySelector(".question").style.display = "block";
});

if (member === "seller") {
    $cartBtn.classList.add("disabled");
    $cartBtn.parentElement.classList.add("disabled");

    $orderBtn.classList.add("disabled");
    $orderBtn.parentElement.classList.add("disabled");

    $questionWriteBtn.classList.add("disabled");
    $questionWriteBtn.parentElement.classList.add("disabled");
}
else {
    // 장바구니 버튼 이벤트 등록
    $cartBtn.addEventListener("click", cartAdd);
    // 결제 버튼 이벤트 등록
    $orderBtn.addEventListener("click", orderStart);
    // 문의등록
    $questionWriteBtn.addEventListener("click", function () {
        question.write_question(product_id);
    });
}
document.addEventListener("DOMContentLoaded", function () {
    review.reviewlist();
});

$reviewbtn.addEventListener("click", function () {
    review.reviewlist();
    document.querySelector(".card-body").style.display = "block"; 
    document.querySelector(".review-container").style.display = "block";
    document.querySelector(".question").style.display = "none";
});


$writeBtn.addEventListener("click", function (event){
    review.reviewWrite();
    event.preventDefault();
});