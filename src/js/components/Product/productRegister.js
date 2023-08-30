import { API } from "../../utils/index.js";
import { storage } from "../../utils/index.js";
import { URL } from "../../data/index.js";


const token = storage.getSessionStorage("token");
const submitBtn = document.querySelector("#submit-btn");
const imageInput = document.querySelector("#image-input");
const thumbnailImageInput = document.querySelector("#thumbnail-image-input");

async function create_product(event) {
    event.preventDefault();

    const category = document.getElementById("category").value;
    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const amount = document.getElementById("amount").value;
    const desc = document.getElementById("desc").value;
    const status = document.getElementById("status").value;
    const thumbnail_image = thumbnailImageInput.files[0];
    const uploadedImages = imageInput.files;

    const formData = new FormData();

    formData.append("category", category);
    formData.append("product_name", name);
    formData.append("price", price);
    formData.append("amount", amount);
    formData.append("desc", desc);
    formData.append("status", status);
    formData.append("thumbnail_image", thumbnail_image);

    // 이미지 파일들 추가
    for (let i = 0; i < uploadedImages.length; i++) {
        formData.append("uploaded_images", uploadedImages[i]);
    }
    
    try {
        const productRegister = await API.apiAuthFormDataPost(URL.productRegisterURL, formData, token);

        if (productRegister) {
            alert("상품을 등록했습니다")
        } else {
            alert("에러")
        }
    }
    catch (err) {
        alert(err);
    }
}

function check_image_count(event) {
    // 최대 등록 가능한 개수
    const maxFiles = 10; 
    const selectedFiles = event.target.files;
    
    if (selectedFiles.length > maxFiles) {
        // 파일 선택 취소
        event.preventDefault();
        event.target.value = "";
        alert("최대 등록 가능 개수는 10개 입니다.");
    } 
}

submitBtn.addEventListener("click", create_product);
imageInput.addEventListener("change", check_image_count);