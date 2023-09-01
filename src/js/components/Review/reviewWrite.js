import { apiAuthPost, apiAuthGet } from '../../utils/fetchAPI.js';
import { URL } from '../../data/index.js';
import { getSessionStorage } from '../../utils/storage.js';

const $writeBtn = document.querySelector("#review-write-btn");
const $reviewForm = document.querySelector("#review-write-form")
const token = getSessionStorage("token");

$writeBtn.addEventListener("click", reviewWrite)
if(!token){
    $reviewForm.style.display = "none";
}else{
    const userrole = await apiAuthGet(URL.userDiscriminationURL, token); 
    if(userrole.message === "판매자"){
        $reviewForm.style.display = "none";
    }
}

async function reviewWrite(event) {
    event.preventDefault();
    
    const product_id = getSessionStorage("product_id")
    const score = document.querySelector("#score").value;
    const reviewText = document.querySelector("#review-write").value;

    const requestData = {
        score: score,
        desc: reviewText,
        product_id: product_id
    };

    try {
        await apiAuthPost(URL.reviewWriteURL, requestData, token);
        alert("리뷰가 작성되었습니다.");
        location.reload();
    } catch (error) {
        console.error("Error submitting review:", error);
        alert("리뷰 작성에 실패했습니다.");
    }
}

