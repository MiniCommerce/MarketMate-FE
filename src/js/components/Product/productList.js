import { API } from "../../utils/index.js";
import { storage } from "../../utils/index.js";
import { URL } from "../../data/index.js";

const $productListContainer = document.querySelector(".product-list");
const $searchBtn = document.querySelector("#search-btn");

function create_card(data) {
  const $cardContainer = document.createElement("div");
  const $thumbnailImage = document.createElement("img");
  const $productName = document.createElement("p");
  const $productPrice = document.createElement("p");
  const $productScore = document.createElement("p");

  $cardContainer.setAttribute("class", "product-item");
  $thumbnailImage.setAttribute("src", data.thumbnail_image);
  $productName.innerText = data.product_name;
  $productPrice.innerText = data.price;
  $productScore.innerText = data.score;

  $cardContainer.append($thumbnailImage, $productName, $productPrice, $productScore)

  return $cardContainer
}

async function search(event) {
  event.preventDefault();

  $productListContainer.innerHTML = "";
  const search_text = document.querySelector("#search-text").value;

  try {
    const res = await API.apiGet(`${URL.productListURL}?search_text=${search_text}`);

    // 상품 목록 출력
    for (let i = 0; i < res.length; i++) {
      const data = res[i];
      const $aTag = document.createElement("a");
      const $productItem = create_card(data);
      
      $aTag.setAttribute("id", data.id);
      $aTag.setAttribute("href", "product_detail.html");
      $aTag.classList.add("product-link");
      $aTag.append($productItem);

      $productListContainer.append($aTag);
    }
    
    // 상품명 클릭시 이벤트 등록
    const $anchors = document.querySelectorAll(".product-link");
    $anchors.forEach((anchor) => {
      anchor.addEventListener("click", async (event) => {
        storage.setSessionStorage("product_id", anchor.id);
      })
    });
  } catch (err) {
    alert(err);
  }
}

// HTML 문서 전체가 로드 되었들 때의 이벤트
async function productOnload() {
  $productListContainer.innerHTML = "";

  try {
    const res = await API.apiGet(URL.productListURL);

    // 상품 목록 출력
    for (let i = 0; i < res.length; i++) {
      const data = res[i];
      const $aTag = document.createElement("a");
      const $productItem = create_card(data);
      
      $aTag.setAttribute("id", data.id);
      $aTag.setAttribute("href", "product_detail.html");
      $aTag.classList.add("product-link");
      $aTag.append($productItem);

      $productListContainer.append($aTag);
    }
    
    // 상품명 클릭시 이벤트 등록
    const $anchors = document.querySelectorAll(".product-link");
    $anchors.forEach((anchor) => {
      anchor.addEventListener("click", async (event) => {
        storage.setSessionStorage("product_id", anchor.id);
      })
    });
  } catch (err) {
    alert(err);
  }
}
// HTML 문서 전체가 로드 되었을 때 이벤트 등록
document.addEventListener("DOMContentLoaded", productOnload);
$searchBtn.addEventListener("click", search);