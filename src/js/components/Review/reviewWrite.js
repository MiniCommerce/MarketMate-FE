import { apiAuthPost } from '../../utils/fetchAPI.js';
import { URL } from '../../data/index.js';
import { getSessionStorage } from '../../utils/storage.js';

const $writeBtn = document.querySelector("#review-write-btn");

$writeBtn.addEventListener("click", reviewWrite)

async function reviewWrite(event) {
    event.preventDefault();
    
    const token = getSessionStorage("token");
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