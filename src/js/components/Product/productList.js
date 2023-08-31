import { API } from "../../utils/index.js";
import { storage } from "../../utils/index.js";
import { URL } from "../../data/index.js";


const $tbody = document.querySelector("tbody");

// HTML 문서 전체가 로드 되었들 때의 이벤트
async function productOnload() {
  try {
    const res = await API.apiGet(URL.productListURL);

    // 상품 목록 출력
    var htmls = [];
    for (var i = 0; i < res.length; i++) {
      htmls.push(`
      <tr id=${res[i].id}>
        <td class="name"><a href="product_detail.html">${res[i].product_name}</a></td>
        <td class="category">${res[i].category}</td>
        <td class="price">${res[i].price}</td>
        <td class="product_status">${res[i].product_status}</td>
        <td class="seller">${res[i].seller}</td>
      </tr>`);
    }
    $tbody.innerHTML = htmls.join("");

    // 상품명 클릭시 이벤트 등록
    const $anchors = document.querySelectorAll("a");
    $anchors.forEach((anchor) => {
      anchor.addEventListener("click", async (event) => {
        storage.setSessionStorage("product_id", event.target.parentElement.parentElement.id);
      })
    });
  } catch (err) {
    alert(err);
  }
}
// HTML 문서 전체가 로드 되었을 때 이벤트 등록
document.addEventListener("DOMContentLoaded", productOnload);