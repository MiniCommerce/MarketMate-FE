import { API } from "../../utils/index.js";
import { storage } from "../../utils/index.js";
import { URL } from "../../data/index.js";


const $intro = document.querySelector("#intro");
const $tbody = document.querySelector("tbody");

const token = storage.getSessionStorage("token");

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const cartList = await API.apiAuthGet(URL.cartListURL, token);
    if (cartList) {
      $intro.innerText = `${cartList[0].user} 님의 장바구니`;

      var htmls = [];
      for (var i = 0; i < cartList.length; i++) {
        htmls.push(`
        <tr id="${cartList[i].id}">
          <td class="chk"><input type="checkbox"></td>
          <td class="product-name">${cartList[i].product}</td>
          <td><input class="amount" type="number" min="1" value="${cartList[i].amount}"></td>
          <td class="price">${cartList[i].price}</td>
          <td class="total">${cartList[i].amount * cartList[i].price}</td>
          <td><button class="delete-btn">삭제</button></td>
        </tr>`);
      }

      $tbody.innerHTML = htmls.join("");
    }

    const $amounts = document.querySelectorAll("input[type='number']");
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

    const $chks = document.querySelectorAll("input[type='checkbox']");
    var chk_cart = [];
    for (var i = 0; i < $chks.length; i++) {
      $chks[i].addEventListener("change", async (event) => {
        var event_cart_id = event.target.parentElement.parentElement.id;

        if (event.target.checked) {
          chk_cart.push(event_cart_id);
          console.log(chk_cart);
        }
      });
    }
  } catch (err) {
    alert(err);
  }

  const $deletes = document.querySelectorAll("button");
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
});