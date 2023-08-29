import { API } from "../../utils/index.js";
import { storage } from "../../utils/index.js";
import { URL } from "../../data/index.js";


const $intro = document.querySelector("#intro");
const $tbody = document.querySelector("tbody");
const $order = document.querySelector(".order");
const $orderPrice = document.querySelector(".order-price");

const token = storage.getSessionStorage("token");
const chked = [];

// HTML 문서 전체가 로드 되었을 때의 이벤트
async function cartOnload(event) {
  try {
    // 장바구니 목록 출력
    const res = await API.apiAuthGet(URL.cartListURL, token);
    if (res) {
      $intro.innerText = `${res[0].user} 님의 장바구니`;

      var htmls = [];
      for (var i = 0; i < res.length; i++) {
        htmls.push(`
          <tr id="${res[i].id}">
            <td class="chk"><input type="checkbox"></td>
            <td class="product-name">${res[i].product}</td>
            <td><input class="amount" type="number" min="1" value="${res[i].amount}"></td>
            <td class="price">${res[i].price}</td>
            <td class="total">${res[i].amount * res[i].price}</td>
            <td><button class="delete-btn">삭제</button></td>
          </tr>`);
      }

      $tbody.innerHTML = htmls.join("");
    }

    // 수량 변경 기능
    const $amounts = document.querySelectorAll("input[type=number]");
    for (var i = 0; i < $amounts.length; i++) {
      $amounts[i].addEventListener("change", async (event) => {
        var event_cart_id = event.target.parentElement.parentElement.id;
        var event_price = event.target.parentElement.parentElement.querySelector(".price");
        var event_total = event.target.parentElement.parentElement.querySelector(".total");

        try {
          const updateData = {
            cart_id: event_cart_id,
            amount: event.target.value
          }

          const cartUpdate = await API.apiAuthPatch(URL.cartUpdateURL, updateData, token);

          if (cartUpdate) {
            event_total.innerText = event_price.innerText * cartUpdate.amount;
          }
        } catch (err) {
          alert(err);
        }
      });
    }

    // 체크박스 선택 기능
    const $chks = document.querySelectorAll("input[type='checkbox']");
    var priceTotal = 0;
    for (var i = 0; i < $chks.length; i++) {
      $chks[i].addEventListener("change", async (event) => {
        var event_cart_id = event.target.parentElement.parentElement.id;
        var eventCartPrice = parseInt(event.target.parentElement.parentElement.querySelector(".total").innerText);

        if (event.target.checked) {
          chked.push({ cart_id: event_cart_id });
          priceTotal += eventCartPrice;
          $orderPrice.innerText = `총액: ${priceTotal}원`;
        } else if (event.target.checked === false) {
          chked.pop(event_cart_id);
          priceTotal -= eventCartPrice;
          $orderPrice.innerText = `총액: ${priceTotal}원`;
        }
      });
    }

    // 삭제 버튼 기능
    const $deletes = document.querySelectorAll(".delete-btn");
    for (var i = 0; i < $deletes.length; i++) {
      $deletes[i].addEventListener("click", async (event) => {
        var event_cart_id = event.target.parentElement.parentElement.id;

        if (confirm("삭제하시겠습니까?") === true) {
          try {
            const deleteData = {
              cart_id: event_cart_id
            }

            const cartDelete = await API.apiAuthDelete(URL.cartDeleteURL, deleteData, token);

            if (cartDelete.status == 200) {
              location.reload();
            }
          } catch (err) {
            alert(err);
          }
        }
      });
    }
  } catch (err) {
    alert(err);
  }
}

// 구매 버튼 클릭 시의 이벤트
async function cartOrderStart(event) {
  try {
    if (chked.length !== 0) {
      const res = await API.apiAuthPost(URL.cartOrderURL, chked, token);
      storage.setSessionStorage("order_id", res.order.id);
      location.href = "../../src/html/order.html";
    } else {
      alert("구매할 상품을 선택해주세요.");
    }
  } catch (err) {
    alert(err);
  }
}

// HTML 문서 전체가 로드 되었을 때 이벤트 등록
document.addEventListener("DOMContentLoaded", cartOnload);
// 구매 버튼 클릭 시 이벤트 등록
$order.addEventListener("click", cartOrderStart);