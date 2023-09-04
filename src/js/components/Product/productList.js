import { API } from "../../utils/index.js";
import { storage } from "../../utils/index.js";
import { URL, category } from "../../data/index.js";

const $productListContainer = document.querySelector(".product-list");
const $searchBtn = document.querySelector("#search-btn");
const $categoryContainer = document.querySelector("#category");

function create_card(data) {
  const $cardContainer = document.createElement("div");
  const $cardItem = document.createElement("div");
  const $cardBody = document.createElement("div");
  const $textCenter = document.createElement("div");
  const $thumbnailImage = document.createElement("img");
  const $productName = document.createElement("h5");
  const $productPrice = document.createElement("p");
  const $productScore = document.createElement("p");

  $cardContainer.classList.add("col");
  $cardContainer.classList.add("mb-5");
  // 카드 아이템
  $cardItem.classList.add("product-item");
  $cardItem.classList.add("card");
  $cardItem.classList.add("h-100");
  // 썸네일 이미지
  $thumbnailImage.setAttribute("src", data.thumbnail_image);
  $thumbnailImage.classList.add("card-img-top");
  // 카드 body
  $cardBody.classList.add("card-body");
  $cardBody.classList.add("p-4");
  // 텍스트
  $textCenter.classList.add("text-center");

  $productName.innerText = data.product_name;
  $productName.classList.add("fw-bolder");
  $productPrice.innerText = data.price;
  $productScore.innerText = data.score;

  $textCenter.append($productName, $productPrice, $productScore);
  $cardBody.append($textCenter);
  $cardItem.append($thumbnailImage, $cardBody);
  $cardContainer.append($cardItem)

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

async function select_category (event, category_name) {
  event.preventDefault();

  $productListContainer.innerHTML = "";
  
  try {
    const res = await API.apiGet(`${URL.productListURL}?category=${category_name}`);

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

// 카테고리 버튼들 생성
for (let i = 0; i < category.category_list.length; i++) {
  const $option = document.createElement("option");
  $option.value = category.category_list[i];
  $option.text = category.category_list[i];

  $categoryContainer.appendChild($option);
}
// HTML 문서 전체가 로드 되었을 때 이벤트 등록
document.addEventListener("DOMContentLoaded", productOnload);
$searchBtn.addEventListener("click", search);
$categoryContainer.addEventListener("change", function(event) {
  const category_name = $categoryContainer.value;
  if (category_name === "전체") {
    productOnload();
  }
  else {
    select_category(event, category_name);
  }
});